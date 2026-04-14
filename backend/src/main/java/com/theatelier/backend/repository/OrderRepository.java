package com.theatelier.backend.repository;

import com.theatelier.backend.entity.Order;
import com.theatelier.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    // All orders for a specific user, newest first
    List<Order> findByUserOrderByCreatedAtDesc(User user);

    // Find order by Razorpay order ID (for payment verification)
    Optional<Order> findByRazorpayOrderId(String razorpayOrderId);
}
