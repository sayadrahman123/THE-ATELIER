package com.theatelier.backend.controller;

import com.theatelier.backend.dto.response.ProductResponse;
import com.theatelier.backend.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    /**
     * GET /api/products
     * Optional query params:
     *   ?category=Outerwear
     *   ?minPrice=0&maxPrice=1000
     *   ?sort=price_asc | price_desc
     *
     * Examples:
     *   GET /api/products
     *   GET /api/products?category=Accessories
     *   GET /api/products?minPrice=200&maxPrice=600&sort=price_asc
     */
    @GetMapping
    public ResponseEntity<List<ProductResponse>> getAllProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) String sort
    ) {
        return ResponseEntity.ok(
                productService.getAllProducts(category, minPrice, maxPrice, sort)
        );
    }

    /**
     * GET /api/products/{id}
     * Returns full product detail including images, sizes, colors
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }
}
