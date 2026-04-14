package com.theatelier.backend.controller;

import com.theatelier.backend.dto.request.CreatePaymentOrderRequest;
import com.theatelier.backend.dto.request.VerifyPaymentRequest;
import com.theatelier.backend.dto.response.PaymentOrderResponse;
import com.theatelier.backend.dto.response.PaymentVerifyResponse;
import com.theatelier.backend.entity.User;
import com.theatelier.backend.service.PaymentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    /**
     * POST /api/payment/create-order
     * JWT Required — Creates a Razorpay order for a given internal order ID.
     *
     * Body: { "orderId": 5 }
     *
     * Response: {
     *   "razorpayOrderId": "order_XXXXXXXX",
     *   "amount": 125000,        ← in paise
     *   "currency": "INR",
     *   "keyId": "rzp_test_XXX",
     *   "internalOrderId": 5,
     *   "orderTotal": 1250.00
     * }
     *
     * Frontend uses this to open the Razorpay checkout modal.
     */
    @PostMapping("/create-order")
    public ResponseEntity<PaymentOrderResponse> createOrder(
            @Valid @RequestBody CreatePaymentOrderRequest request,
            @AuthenticationPrincipal User currentUser
    ) {
        return ResponseEntity.ok(
                paymentService.createRazorpayOrder(request, currentUser)
        );
    }

    /**
     * POST /api/payment/verify
     * JWT Required — Verifies the HMAC-SHA256 signature from Razorpay
     * and marks the order as PAID in our database.
     *
     * Body: {
     *   "orderId": 5,
     *   "razorpayOrderId": "order_XXXXXXXX",
     *   "razorpayPaymentId": "pay_XXXXXXXX",
     *   "razorpaySignature": "abc123..."
     * }
     *
     * Response: {
     *   "success": true,
     *   "message": "Payment verified successfully.",
     *   "orderId": 5,
     *   "status": "PAID"
     * }
     */
    @PostMapping("/verify")
    public ResponseEntity<PaymentVerifyResponse> verifyPayment(
            @Valid @RequestBody VerifyPaymentRequest request,
            @AuthenticationPrincipal User currentUser
    ) {
        return ResponseEntity.ok(
                paymentService.verifyPayment(request, currentUser)
        );
    }
}
