package com.theatelier.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {

    private Long id;
    private String name;
    private String variant;
    private BigDecimal price;
    private String description;
    private String category;
    private String collection;
    private String badge;
    private String imageUrl;        // main thumbnail

    // Nested lists matching frontend data model exactly
    private List<String> images;   // gallery URLs
    private List<String> sizes;
    private List<ColorDto> colors;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ColorDto {
        private String name;
        private String hex;
    }
}
