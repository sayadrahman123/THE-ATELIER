package com.theatelier.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {

    private Long id;
    private String status;
    private BigDecimal totalAmount;
    private String deliveryMethod;

    // Shipping
    private String shippingName;
    private String shippingEmail;
    private String shippingAddress;
    private String shippingCity;
    private String shippingPostalCode;
    private String shippingCountry;

    // Razorpay
    private String razorpayOrderId;

    private LocalDateTime createdAt;
    private List<OrderItemResponse> items;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderItemResponse {
        private Long productId;
        private String productName;
        private String productImageUrl;
        private Integer quantity;
        private String selectedSize;
        private String selectedColor;
        private BigDecimal priceAtOrder;
        private BigDecimal lineTotal;    // priceAtOrder × quantity
    }
}
