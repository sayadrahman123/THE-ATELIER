package com.theatelier.backend.repository;

import com.theatelier.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // Filter by category (case-insensitive)
    List<Product> findByCategoryIgnoreCase(String category);

    // Filter by price range
    List<Product> findByPriceBetween(BigDecimal minPrice, BigDecimal maxPrice);

    // Filter by category AND price range
    List<Product> findByCategoryIgnoreCaseAndPriceBetween(
            String category, BigDecimal minPrice, BigDecimal maxPrice);

    // Fetch all distinct categories
    @Query("SELECT DISTINCT p.category FROM Product p ORDER BY p.category")
    List<String> findAllCategories();

    // Badge filter (e.g. "New")
    List<Product> findByBadge(String badge);

    // Collection filter
    List<Product> findByCollectionIgnoreCase(String collection);

    // Check if product exists by name (for seeder guard)
    boolean existsByName(String name);
}
