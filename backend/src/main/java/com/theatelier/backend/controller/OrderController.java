package com.theatelier.backend.controller;

import com.theatelier.backend.dto.request.PlaceOrderRequest;
import com.theatelier.backend.dto.response.OrderResponse;
import com.theatelier.backend.entity.User;
import com.theatelier.backend.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    /**
     * POST /api/orders
     * JWT Required — Place a new order
     *
     * Body: {
     *   "shippingName": "Alex",
     *   "shippingEmail": "alex@atelier.com",
     *   "shippingAddress": "1 Mayfair Row",
     *   "shippingCity": "London",
     *   "shippingPostalCode": "W1K 1AA",
     *   "shippingCountry": "United Kingdom",
     *   "deliveryMethod": "standard",
     *   "items": [
     *     { "productId": 1, "quantity": 1, "selectedSize": "M", "selectedColor": "Charcoal" }
     *   ]
     * }
     */
    @PostMapping
    public ResponseEntity<OrderResponse> placeOrder(
            @Valid @RequestBody PlaceOrderRequest request,
            @AuthenticationPrincipal User currentUser
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(orderService.placeOrder(request, currentUser));
    }

    /**
     * GET /api/orders/my
     * JWT Required — Get all orders for the currently logged-in user
     */
    @GetMapping("/my")
    public ResponseEntity<List<OrderResponse>> getMyOrders(
            @AuthenticationPrincipal User currentUser
    ) {
        return ResponseEntity.ok(orderService.getMyOrders(currentUser));
    }

    /**
     * GET /api/orders/{id}
     * JWT Required — Get a single order (only if it belongs to the current user)
     */
    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse> getOrderById(
            @PathVariable Long id,
            @AuthenticationPrincipal User currentUser
    ) {
        return ResponseEntity.ok(orderService.getOrderById(id, currentUser));
    }
}
