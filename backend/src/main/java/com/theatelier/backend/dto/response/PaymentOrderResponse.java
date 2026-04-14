package com.theatelier.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentOrderResponse {

    /** Razorpay order ID — passed to the frontend checkout modal */
    private String razorpayOrderId;

    /** Amount in smallest currency unit (paise for INR) */
    private long amount;

    /** Currency code e.g. "INR" */
    private String currency;

    /** Razorpay Key ID — used by frontend to identify the merchant */
    private String keyId;

    /** Our internal order ID — returned so frontend can include it in verify call */
    private Long internalOrderId;

    /** Order total in rupees (for display purposes) */
    private BigDecimal orderTotal;
}
