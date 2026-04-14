package com.theatelier.backend.service;

import com.theatelier.backend.dto.response.ProductResponse;
import com.theatelier.backend.entity.Product;
import com.theatelier.backend.exception.ResourceNotFoundException;
import com.theatelier.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    // ── Get All (with optional filters) ──────────────────────────────────

    public List<ProductResponse> getAllProducts(String category,
                                                BigDecimal minPrice,
                                                BigDecimal maxPrice,
                                                String sort) {
        List<Product> products;

        BigDecimal min = (minPrice != null) ? minPrice : BigDecimal.ZERO;
        BigDecimal max = (maxPrice != null) ? maxPrice : new BigDecimal("99999");

        boolean hasCategory = category != null && !category.isBlank() && !category.equalsIgnoreCase("all");

        if (hasCategory) {
            products = productRepository.findByCategoryIgnoreCaseAndPriceBetween(category, min, max);
        } else {
            products = productRepository.findByPriceBetween(min, max);
        }

        // Sorting
        if ("price_asc".equalsIgnoreCase(sort)) {
            products.sort((a, b) -> a.getPrice().compareTo(b.getPrice()));
        } else if ("price_desc".equalsIgnoreCase(sort)) {
            products.sort((a, b) -> b.getPrice().compareTo(a.getPrice()));
        }

        return products.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    // ── Get Single Product ────────────────────────────────────────────────

    public ProductResponse getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product", id));
        return toResponse(product);
    }

    // ── Get All Categories ────────────────────────────────────────────────

    public List<String> getAllCategories() {
        return productRepository.findAllCategories();
    }

    // ── Mapper: Entity → DTO ──────────────────────────────────────────────

    public ProductResponse toResponse(Product product) {
        List<String> imageUrls = product.getImages().stream()
                .sorted((a, b) -> Integer.compare(a.getDisplayOrder(), b.getDisplayOrder()))
                .map(img -> img.getImageUrl())
                .collect(Collectors.toList());

        List<String> sizes = product.getSizes().stream()
                .map(s -> s.getSize())
                .collect(Collectors.toList());

        List<ProductResponse.ColorDto> colors = product.getColors().stream()
                .map(c -> ProductResponse.ColorDto.builder()
                        .name(c.getColorName())
                        .hex(c.getHexCode())
                        .build())
                .collect(Collectors.toList());

        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .variant(product.getVariant())
                .price(product.getPrice())
                .description(product.getDescription())
                .category(product.getCategory())
                .collection(product.getCollection())
                .badge(product.getBadge())
                .imageUrl(product.getImageUrl())
                .images(imageUrls)
                .sizes(sizes)
                .colors(colors)
                .build();
    }
}
