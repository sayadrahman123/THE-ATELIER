package com.theatelier.backend.service;

import com.theatelier.backend.dto.request.CartItemRequest;
import com.theatelier.backend.dto.response.CartItemResponse;
import com.theatelier.backend.entity.CartItem;
import com.theatelier.backend.entity.Product;
import com.theatelier.backend.entity.User;
import com.theatelier.backend.exception.ResourceNotFoundException;
import com.theatelier.backend.repository.CartItemRepository;
import com.theatelier.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CartService {

    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;

    // ── Get full cart ─────────────────────────────────────────────────────

    @Transactional(readOnly = true)
    public List<CartItemResponse> getCart(User user) {
        return cartItemRepository.findByUser(user)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    // ── Add or increment item ─────────────────────────────────────────────
    // If the same (product + size + color) already exists → increment qty.
    // Otherwise → create new cart line.

    @Transactional
    public CartItemResponse addOrUpdate(CartItemRequest request, User user) {
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product", request.getProductId()));

        String size  = request.getSelectedSize()  != null ? request.getSelectedSize()  : "";
        String color = request.getSelectedColor() != null ? request.getSelectedColor() : "";

        Optional<CartItem> existing = cartItemRepository
                .findByUserAndProductIdAndSelectedSizeAndSelectedColor(user, product.getId(), size, color);

        CartItem item;
        if (existing.isPresent()) {
            item = existing.get();
            item.setQuantity(item.getQuantity() + request.getQuantity());
        } else {
            item = CartItem.builder()
                    .user(user)
                    .product(product)
                    .quantity(request.getQuantity())
                    .selectedSize(size)
                    .selectedColor(color)
                    .build();
        }

        return toResponse(cartItemRepository.save(item));
    }

    // ── Update quantity of a specific cart line ───────────────────────────

    @Transactional
    public CartItemResponse setQuantity(Long cartItemId, int quantity, User user) {
        CartItem item = getOwnedCartItem(cartItemId, user);
        if (quantity <= 0) {
            cartItemRepository.delete(item);
            return null; // removed
        }
        item.setQuantity(quantity);
        return toResponse(cartItemRepository.save(item));
    }

    // ── Remove a single cart line ─────────────────────────────────────────

    @Transactional
    public void removeItem(Long cartItemId, User user) {
        CartItem item = getOwnedCartItem(cartItemId, user);
        cartItemRepository.delete(item);
    }

    // ── Bulk merge (called on login: push localStorage cart → DB) ────────

    @Transactional
    public List<CartItemResponse> mergeCart(List<CartItemRequest> localItems, User user) {
        for (CartItemRequest req : localItems) {
            try {
                addOrUpdate(req, user);
            } catch (ResourceNotFoundException ignored) {
                // Skip if product no longer exists
            }
        }
        return getCart(user);
    }

    // ── Clear entire cart (called after order placed) ─────────────────────

    @Transactional
    public void clearCart(User user) {
        cartItemRepository.deleteByUser(user);
        log.info("Cart cleared for user {}", user.getEmail());
    }

    // ── Helpers ───────────────────────────────────────────────────────────

    private CartItem getOwnedCartItem(Long cartItemId, User user) {
        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException("CartItem", cartItemId));
        if (!item.getUser().getId().equals(user.getId())) {
            throw new ResourceNotFoundException("CartItem", cartItemId);
        }
        return item;
    }

    private CartItemResponse toResponse(CartItem item) {
        Product p = item.getProduct();
        BigDecimal lineTotal = p.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
        return CartItemResponse.builder()
                .cartItemId(item.getId())
                .productId(p.getId())
                .name(p.getName())
                .price(p.getPrice())
                .imageUrl(p.getImageUrl())
                .quantity(item.getQuantity())
                .selectedSize(item.getSelectedSize())
                .selectedColor(item.getSelectedColor())
                .lineTotal(lineTotal)
                .build();
    }
}
