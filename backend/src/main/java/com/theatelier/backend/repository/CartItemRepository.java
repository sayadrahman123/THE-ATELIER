package com.theatelier.backend.repository;

import com.theatelier.backend.entity.CartItem;
import com.theatelier.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    // All cart items for a user
    List<CartItem> findByUser(User user);

    // Find specific cart line (for upsert)
    Optional<CartItem> findByUserAndProductIdAndSelectedSizeAndSelectedColor(
            User user, Long productId, String selectedSize, String selectedColor);

    // Delete all cart items for a user (after order placed)
    void deleteByUser(User user);
}
