package com.theatelier.backend.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.util.List;

@Data
public class PlaceOrderRequest {

    @NotBlank(message = "Full name is required")
    private String shippingName;

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    private String shippingEmail;

    @NotBlank(message = "Address is required")
    private String shippingAddress;

    @NotBlank(message = "City is required")
    private String shippingCity;

    @NotBlank(message = "Postal code is required")
    private String shippingPostalCode;

    @NotBlank(message = "Country is required")
    private String shippingCountry;

    // "standard", "express", "same_day"
    @NotBlank(message = "Delivery method is required")
    private String deliveryMethod;

    @NotEmpty(message = "Order must contain at least one item")
    @Valid
    private List<OrderItemRequest> items;

    @Data
    public static class OrderItemRequest {

        @NotNull(message = "Product ID is required")
        private Long productId;

        @NotNull(message = "Quantity is required")
        @Min(value = 1, message = "Quantity must be at least 1")
        private Integer quantity;

        private String selectedSize;
        private String selectedColor;
    }
}
