package com.theatelier.backend.service;

import com.theatelier.backend.dto.request.PlaceOrderRequest;
import com.theatelier.backend.dto.response.OrderResponse;
import com.theatelier.backend.entity.Order;
import com.theatelier.backend.entity.OrderItem;
import com.theatelier.backend.entity.Product;
import com.theatelier.backend.entity.User;
import com.theatelier.backend.exception.ResourceNotFoundException;
import com.theatelier.backend.repository.OrderRepository;
import com.theatelier.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    // ── Place Order ───────────────────────────────────────────────────────

    @Transactional
    public OrderResponse placeOrder(PlaceOrderRequest request, User currentUser) {
        // Build order shell
        Order order = Order.builder()
                .user(currentUser)
                .shippingName(request.getShippingName())
                .shippingEmail(request.getShippingEmail())
                .shippingAddress(request.getShippingAddress())
                .shippingCity(request.getShippingCity())
                .shippingPostalCode(request.getShippingPostalCode())
                .shippingCountry(request.getShippingCountry())
                .deliveryMethod(request.getDeliveryMethod())
                .status(Order.OrderStatus.PENDING)
                .totalAmount(BigDecimal.ZERO) // calculated below
                .build();

        // Build line items + calculate total
        BigDecimal total = BigDecimal.ZERO;

        for (PlaceOrderRequest.OrderItemRequest itemReq : request.getItems()) {
            Product product = productRepository.findById(itemReq.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product", itemReq.getProductId()));

            BigDecimal lineTotal = product.getPrice()
                    .multiply(BigDecimal.valueOf(itemReq.getQuantity()));

            OrderItem item = OrderItem.builder()
                    .product(product)
                    .quantity(itemReq.getQuantity())
                    .selectedSize(itemReq.getSelectedSize())
                    .selectedColor(itemReq.getSelectedColor())
                    .priceAtOrder(product.getPrice())  // snapshot price
                    .build();

            item.setOrder(order);
            order.getItems().add(item);
            total = total.add(lineTotal);
        }

        // Add delivery charge
        BigDecimal deliveryCharge = switch (request.getDeliveryMethod()) {
            case "express"  -> new BigDecimal("25.00");
            case "same_day" -> new BigDecimal("50.00");
            default         -> BigDecimal.ZERO;  // standard is free
        };
        total = total.add(deliveryCharge);

        order.setTotalAmount(total);
        Order saved = orderRepository.save(order);

        log.info("Order #{} placed by {} — total: ${}", saved.getId(), currentUser.getEmail(), total);
        return toResponse(saved);
    }

    // ── Get Current User's Orders ─────────────────────────────────────────

    @Transactional(readOnly = true)
    public List<OrderResponse> getMyOrders(User currentUser) {
        return orderRepository.findByUserOrderByCreatedAtDesc(currentUser)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    // ── Get Single Order (with ownership check) ───────────────────────────

    @Transactional(readOnly = true)
    public OrderResponse getOrderById(Long orderId, User currentUser) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order", orderId));

        // Security: users can only see their own orders
        if (!order.getUser().getId().equals(currentUser.getId())) {
            throw new ResourceNotFoundException("Order", orderId);
        }

        return toResponse(order);
    }

    // ── Update Razorpay IDs (called after payment verification) ──────────

    @Transactional
    public void updateRazorpayIds(Long orderId, String razorpayOrderId, String razorpayPaymentId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order", orderId));
        order.setRazorpayOrderId(razorpayOrderId);
        order.setRazorpayPaymentId(razorpayPaymentId);
        order.setStatus(Order.OrderStatus.PAID);
        orderRepository.save(order);
        log.info("Order #{} marked PAID — Razorpay payment: {}", orderId, razorpayPaymentId);
    }

    // ── Mapper: Entity → DTO ──────────────────────────────────────────────

    private OrderResponse toResponse(Order order) {
        List<OrderResponse.OrderItemResponse> itemResponses = order.getItems().stream()
                .map(item -> OrderResponse.OrderItemResponse.builder()
                        .productId(item.getProduct().getId())
                        .productName(item.getProduct().getName())
                        .productImageUrl(item.getProduct().getImageUrl())
                        .quantity(item.getQuantity())
                        .selectedSize(item.getSelectedSize())
                        .selectedColor(item.getSelectedColor())
                        .priceAtOrder(item.getPriceAtOrder())
                        .lineTotal(item.getPriceAtOrder()
                                .multiply(BigDecimal.valueOf(item.getQuantity())))
                        .build())
                .collect(Collectors.toList());

        return OrderResponse.builder()
                .id(order.getId())
                .status(order.getStatus().name())
                .totalAmount(order.getTotalAmount())
                .deliveryMethod(order.getDeliveryMethod())
                .shippingName(order.getShippingName())
                .shippingEmail(order.getShippingEmail())
                .shippingAddress(order.getShippingAddress())
                .shippingCity(order.getShippingCity())
                .shippingPostalCode(order.getShippingPostalCode())
                .shippingCountry(order.getShippingCountry())
                .razorpayOrderId(order.getRazorpayOrderId())
                .createdAt(order.getCreatedAt())
                .items(itemResponses)
                .build();
    }
}
