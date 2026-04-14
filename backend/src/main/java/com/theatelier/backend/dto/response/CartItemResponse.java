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
public class CartItemResponse {

    private Long cartItemId;
    private Long productId;
    private String name;
    private String variant;
    private BigDecimal price;
    private String imageUrl;
    private Integer quantity;
    private String selectedSize;
    private String selectedColor;
    private BigDecimal lineTotal;   // price × quantity
}
