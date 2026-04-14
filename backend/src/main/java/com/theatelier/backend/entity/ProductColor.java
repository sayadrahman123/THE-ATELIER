package com.theatelier.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "product_colors")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductColor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Product product;

    @Column(name = "color_name", nullable = false)
    private String colorName;

    @Column(name = "hex_code", nullable = false)
    private String hexCode;
}
