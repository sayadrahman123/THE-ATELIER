package com.theatelier.backend.service;

import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.theatelier.backend.dto.request.CreatePaymentOrderRequest;
import com.theatelier.backend.dto.request.VerifyPaymentRequest;
import com.theatelier.backend.dto.response.PaymentOrderResponse;
import com.theatelier.backend.dto.response.PaymentVerifyResponse;
import com.theatelier.backend.entity.Order;
import com.theatelier.backend.entity.User;
import com.theatelier.backend.exception.ResourceNotFoundException;
import com.theatelier.backend.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentService {

    private final RazorpayClient razorpayClient;
    private final OrderRepository orderRepository;

    @Value("${razorpay.key.id}")
    private String razorpayKeyId;

    @Value("${razorpay.key.secret}")
    private String razorpayKeySecret;

    // Currency — change to "USD" etc. if needed
    private static final String CURRENCY = "INR";

    // ── Step 1: Create Razorpay Order ─────────────────────────────────────

    @Transactional
    public PaymentOrderResponse createRazorpayOrder(
            CreatePaymentOrderRequest request, User currentUser) {

        // Fetch our internal order
        Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(() -> new ResourceNotFoundException("Order", request.getOrderId()));

        // Ownership check
        if (!order.getUser().getId().equals(currentUser.getId())) {
            throw new ResourceNotFoundException("Order", request.getOrderId());
        }

        // Convert total to paise (Razorpay uses smallest currency unit)
        // 1 INR = 100 paise
        long amountInPaise = order.getTotalAmount()
                .multiply(BigDecimal.valueOf(100))
                .longValue();

        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amountInPaise);
        orderRequest.put("currency", CURRENCY);
        orderRequest.put("receipt", "atelier_order_" + order.getId());

        try {
            com.razorpay.Order razorpayOrder = razorpayClient.orders.create(orderRequest);
            String razorpayOrderId = razorpayOrder.get("id");

            // Store Razorpay order ID in our DB
            order.setRazorpayOrderId(razorpayOrderId);
            orderRepository.save(order);

            log.info("Razorpay order created: {} for internal order #{}", razorpayOrderId, order.getId());

            return PaymentOrderResponse.builder()
                    .razorpayOrderId(razorpayOrderId)
                    .amount(amountInPaise)
                    .currency(CURRENCY)
                    .keyId(razorpayKeyId)
                    .internalOrderId(order.getId())
                    .orderTotal(order.getTotalAmount())
                    .build();

        } catch (RazorpayException e) {
            log.error("Failed to create Razorpay order: {}", e.getMessage());
            throw new RuntimeException("Payment gateway error: " + e.getMessage());
        }
    }

    // ── Step 2: Verify Payment Signature ──────────────────────────────────

    @Transactional
    public PaymentVerifyResponse verifyPayment(VerifyPaymentRequest request, User currentUser) {

        // Fetch order
        Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(() -> new ResourceNotFoundException("Order", request.getOrderId()));

        // Ownership check
        if (!order.getUser().getId().equals(currentUser.getId())) {
            throw new ResourceNotFoundException("Order", request.getOrderId());
        }

        // Verify HMAC-SHA256 signature
        // Razorpay generates:  HMAC_SHA256(razorpay_order_id + "|" + razorpay_payment_id, key_secret)
        boolean isValid = verifySignature(
                request.getRazorpayOrderId(),
                request.getRazorpayPaymentId(),
                request.getRazorpaySignature()
        );

        if (!isValid) {
            log.warn("Payment signature verification FAILED for order #{}", order.getId());
            return PaymentVerifyResponse.builder()
                    .success(false)
                    .message("Payment verification failed. Signature mismatch.")
                    .orderId(order.getId())
                    .status("FAILED")
                    .build();
        }

        // Mark order as PAID
        order.setRazorpayOrderId(request.getRazorpayOrderId());
        order.setRazorpayPaymentId(request.getRazorpayPaymentId());
        order.setStatus(Order.OrderStatus.PAID);
        orderRepository.save(order);

        log.info("Payment verified for order #{} — Razorpay payment: {}",
                order.getId(), request.getRazorpayPaymentId());

        return PaymentVerifyResponse.builder()
                .success(true)
                .message("Payment verified successfully. Your order is confirmed.")
                .orderId(order.getId())
                .status("PAID")
                .build();
    }

    // ── HMAC-SHA256 Signature Verification ───────────────────────────────

    private boolean verifySignature(String razorpayOrderId,
                                     String razorpayPaymentId,
                                     String razorpaySignature) {
        try {
            // Data to sign: "razorpay_order_id|razorpay_payment_id"
            String data = razorpayOrderId + "|" + razorpayPaymentId;

            Mac mac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKey = new SecretKeySpec(
                    razorpayKeySecret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            mac.init(secretKey);

            byte[] hash = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));

            // Convert to lowercase hex string
            StringBuilder hexSignature = new StringBuilder();
            for (byte b : hash) {
                hexSignature.append(String.format("%02x", b));
            }

            return hexSignature.toString().equals(razorpaySignature);

        } catch (NoSuchAlgorithmException | InvalidKeyException e) {
            log.error("Signature verification error: {}", e.getMessage());
            return false;
        }
    }
}
