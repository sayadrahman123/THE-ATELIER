package com.theatelier.backend.controller;

import com.theatelier.backend.dto.request.CartItemRequest;
import com.theatelier.backend.dto.response.CartItemResponse;
import com.theatelier.backend.entity.User;
import com.theatelier.backend.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    /**
     * GET /api/cart
     * Returns the current user's DB cart.
     */
    @GetMapping
    public ResponseEntity<List<CartItemResponse>> getCart(
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(cartService.getCart(user));
    }

    /**
     * POST /api/cart
     * Add an item (or increment quantity if same product+size+color exists).
     * Body: { "productId": 1, "quantity": 1, "selectedSize": "M", "selectedColor": "Charcoal" }
     */
    @PostMapping
    public ResponseEntity<CartItemResponse> addItem(
            @Valid @RequestBody CartItemRequest request,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(cartService.addOrUpdate(request, user));
    }

    /**
     * PUT /api/cart/{cartItemId}
     * Set exact quantity for a cart line. quantity=0 → removes the item.
     * Body: { "quantity": 2 }
     */
    @PutMapping("/{cartItemId}")
    public ResponseEntity<?> updateQuantity(
            @PathVariable Long cartItemId,
            @RequestBody Map<String, Integer> body,
            @AuthenticationPrincipal User user) {
        int qty = body.getOrDefault("quantity", 1);
        CartItemResponse updated = cartService.setQuantity(cartItemId, qty, user);
        if (updated == null) {
            return ResponseEntity.noContent().build(); // item removed
        }
        return ResponseEntity.ok(updated);
    }

    /**
     * DELETE /api/cart/{cartItemId}
     * Remove a single cart line.
     */
    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<Void> removeItem(
            @PathVariable Long cartItemId,
            @AuthenticationPrincipal User user) {
        cartService.removeItem(cartItemId, user);
        return ResponseEntity.noContent().build();
    }

    /**
     * DELETE /api/cart
     * Clear the entire cart (called after order placed or manual clear).
     */
    @DeleteMapping
    public ResponseEntity<Void> clearCart(
            @AuthenticationPrincipal User user) {
        cartService.clearCart(user);
        return ResponseEntity.noContent().build();
    }

    /**
     * POST /api/cart/merge
     * Merge the guest (localStorage) cart into the DB cart after login.
     * Body: [ { "productId": 1, "quantity": 1, "selectedSize": "M", "selectedColor": "Charcoal" }, ... ]
     */
    @PostMapping("/merge")
    public ResponseEntity<List<CartItemResponse>> mergeCart(
            @RequestBody List<@Valid CartItemRequest> localItems,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(cartService.mergeCart(localItems, user));
    }
}
