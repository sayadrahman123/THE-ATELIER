package com.theatelier.backend.controller;

import com.theatelier.backend.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final ProductService productService;

    /**
     * GET /api/categories
     * Returns all distinct product categories from the database
     */
    @GetMapping
    public ResponseEntity<List<String>> getCategories() {
        return ResponseEntity.ok(productService.getAllCategories());
    }
}
