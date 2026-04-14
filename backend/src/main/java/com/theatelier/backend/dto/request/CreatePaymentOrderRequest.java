package com.theatelier.backend.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreatePaymentOrderRequest {

    /**
     * The internal Order ID in our database.
     * Backend looks up the order total → creates Razorpay order for that amount.
     */
    @NotNull(message = "Order ID is required")
    private Long orderId;
}
