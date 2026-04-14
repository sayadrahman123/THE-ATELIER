package com.theatelier.backend.config;

import com.theatelier.backend.entity.*;
import com.theatelier.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

/**
 * DataSeeder — Runs on startup and inserts all 8 products into MySQL
 * if the database is empty. Safe to re-run: uses existsByName guard.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final ProductRepository productRepository;

    @Override
    public void run(String... args) {
        if (productRepository.count() > 0) {
            log.info("DataSeeder: Products already exist — skipping seed.");
            return;
        }

        log.info("DataSeeder: Seeding 8 products into database...");

        List<Product> products = List.of(
            buildProduct(
                "Structured Wool Overcoat", "Signature Charcoal", new BigDecimal("1250.00"),
                "Crafted from premium Merino wool, this architectural overcoat defines understated luxury. Clean lines and a structured silhouette that holds its form effortlessly.",
                "Outerwear", "Autumn / Winter '24", "New",
                "https://lh3.googleusercontent.com/aida-public/AB6AXuBdFAd7XS-koYhtWN05dTqNAhJdTWh6n3HZy_oZ3zi81qyP5xulerjmpvn7EwRLW5_u9oMcaHHWtVJEce1BolVwqhdCbaOwEtnOgQcgzC3xC_jsWFUpAOiKiL_ga9BLYWhdImxGvIsUYV1L2ci6R9LGk9Ftx_qhXCkH_YepKSSPV5jSrXpKAIgCwSLpow_Tkw8KeG6k5yt7S3u_y-GAGNuR_vUGL8MJNcIj7ii29mlDbivex-vtfHjv3gR5LNmW5yEFcdvd9z5Ynp2w",
                List.of("https://lh3.googleusercontent.com/aida-public/AB6AXuBdFAd7XS-koYhtWN05dTqNAhJdTWh6n3HZy_oZ3zi81qyP5xulerjmpvn7EwRLW5_u9oMcaHHWtVJEce1BolVwqhdCbaOwEtnOgQcgzC3xC_jsWFUpAOiKiL_ga9BLYWhdImxGvIsUYV1L2ci6R9LGk9Ftx_qhXCkH_YepKSSPV5jSrXpKAIgCwSLpow_Tkw8KeG6k5yt7S3u_y-GAGNuR_vUGL8MJNcIj7ii29mlDbivex-vtfHjv3gR5LNmW5yEFcdvd9z5Ynp2w"),
                List.of("XS", "S", "M", "L"),
                List.of(new String[]{"Charcoal", "#1A1C1C"}, new String[]{"Beige", "#F5F1E9"})
            ),
            buildProduct(
                "The Archival Tote", "Grained Calfskin", new BigDecimal("890.00"),
                "Handcrafted from full-grain calfskin with subtle metallic hardware. A modern heirloom designed to deepen with character over time.",
                "Accessories", "Essential Collection", null,
                "https://lh3.googleusercontent.com/aida-public/AB6AXuB-Bp0jN93WotAEs5EIGsXVz08F8H3h0O11ZV7Lg4xwJkTzq9U_OW02XhEsw6Z9YfvOjWHhT4YcL-It0SFWjpYbIc-9t6vK9jEJfbTkaxUN1lbtVkRdJzdIQb-3yifqfVwEYQyfYPeHgaZY7hJULQcsLqzNpt5jXlXc0ZScGvDrpK2wUqG0Z-gBcsqRZOc8Ky8N3RmDxO1fzksDeL7jrItJBfVnBf5iw_9vc7yzKh9mE7LzODcAu-_-BMfpzRp6PDKnFxXJjv4fY6uM",
                List.of("https://lh3.googleusercontent.com/aida-public/AB6AXuB-Bp0jN93WotAEs5EIGsXVz08F8H3h0O11ZV7Lg4xwJkTzq9U_OW02XhEsw6Z9YfvOjWHhT4YcL-It0SFWjpYbIc-9t6vK9jEJfbTkaxUN1lbtVkRdJzdIQb-3yifqfVwEYQyfYPeHgaZY7hJULQcsLqzNpt5jXlXc0ZScGvDrpK2wUqG0Z-gBcsqRZOc8Ky8N3RmDxO1fzksDeL7jrItJBfVnBf5iw_9vc7yzKh9mE7LzODcAu-_-BMfpzRp6PDKnFxXJjv4fY6uM"),
                List.of("One Size"),
                List.of(new String[]{"Brown", "#6B4226"}, new String[]{"Black", "#1A1C1C"})
            ),
            buildProduct(
                "Ethereal Silk Square", "Hand-rolled Edges", new BigDecimal("240.00"),
                "Woven from 22mm silk charmeuse and finished by hand with rolled hems. Each square is a wearable art piece.",
                "Accessories", "Essential Collection", null,
                "https://lh3.googleusercontent.com/aida-public/AB6AXuDYfwHj6-rmeQur7vmuGJ9j1qarDKed9oi88JM2xM6Yy2v1hgiZ_Pugy-MhvQW1WQtffL8PVv5De8Rt2rV8ecAcdpn-OXF0zprI3SzC4HowSPtw0A7njqVU-5bCqXlIhuGqY4y4f65eh323mvelzQXo3PLtxudj4DRKEGTYfJEj3kMs8_XbZgnbRyCYX68U_YdKPU9wze3RCcvk-aQ9Apb3sC14ArZ-Wb8xl78lybqmqKLL17JWy9qOpo9jW-UKzisYEeD7MoYB-zGl",
                List.of("https://lh3.googleusercontent.com/aida-public/AB6AXuDYfwHj6-rmeQur7vmuGJ9j1qarDKed9oi88JM2xM6Yy2v1hgiZ_Pugy-MhvQW1WQtffL8PVv5De8Rt2rV8ecAcdpn-OXF0zprI3SzC4HowSPtw0A7njqVU-5bCqXlIhuGqY4y4f65eh323mvelzQXo3PLtxudj4DRKEGTYfJEj3kMs8_XbZgnbRyCYX68U_YdKPU9wze3RCcvk-aQ9Apb3sC14ArZ-Wb8xl78lybqmqKLL17JWy9qOpo9jW-UKzisYEeD7MoYB-zGl"),
                List.of("90x90cm"),
                List.of(new String[]{"Ivory", "#F5F0E8"}, new String[]{"Sand", "#D4B896"})
            ),
            buildProduct(
                "Atelier Low Top", "Porcelain / Raw", new BigDecimal("420.00"),
                "Minimal leather sneakers built on a gum sole. Handcrafted in a small-batch run from full-grain leather with a clean, unembellished silhouette.",
                "Footwear", "Essential Collection", null,
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCxU-D_k5eVcWYQTNyE4e3opC3bTVWogUkvbNhkIkVLkIFpKQI3bBGHh4cYumLO0hQUCgLcXx34jsi7tlXKZWSRvbQ_fDWXO1FNRGnZrNFMoZj1dIGrn6VEtG13FsWrOFCKT37Um-3wpe9QZ1cQ9SgNFe_uaJTOPsAklnhNhAx2dXicNronDtOodV0DOSkS0EP5uv-suqSN6SJHRU3381HfvmjHYVkk3PDjV6S2DLLn_zgAuVrIXNPqXV1TANc5AUThDpCZJlnjqn0t",
                List.of("https://lh3.googleusercontent.com/aida-public/AB6AXuCxU-D_k5eVcWYQTNyE4e3opC3bTVWogUkvbNhkIkVLkIFpKQI3bBGHh4cYumLO0hQUCgLcXx34jsi7tlXKZWSRvbQ_fDWXO1FNRGnZrNFMoZj1dIGrn6VEtG13FsWrOFCKT37Um-3wpe9QZ1cQ9SgNFe_uaJTOPsAklnhNhAx2dXicNronDtOodV0DOSkS0EP5uv-suqSN6SJHRU3381HfvmjHYVkk3PDjV6S2DLLn_zgAuVrIXNPqXV1TANc5AUThDpCZJlnjqn0t"),
                List.of("EU 38", "EU 39", "EU 40", "EU 41", "EU 42", "EU 43", "EU 44"),
                List.of(new String[]{"Porcelain", "#F5F5F0"}, new String[]{"Black", "#1A1C1C"})
            ),
            buildProduct(
                "The Sculpted Silk Blouse", "Champagne Mulberry Silk", new BigDecimal("480.00"),
                "Crafted from 30mm heavy-weight mulberry silk, this architectural piece redefines minimalist luxury. Featuring hand-rolled hems and a unique draped sleeve silhouette.",
                "Tops", "Essential Collection", null,
                "https://lh3.googleusercontent.com/aida-public/AB6AXuAEGrKwEEoQu59jWQGDM-HflVH76JWDjBOgbQKHmp51Gdzhe_0O4EYj0dm0nttXS77mCLLOlmWoVpZ8iBqDVo2CZ9lOtsLEL3zhFGIasbb5YCv_M7JucXyahdbiuHZw6QloKn0M4RKvaxm2DilDjATmRGehXVlfXOM3Mx_xTXczTWzovYAs_AfvqZeuG5w30i49P2t57pq8m04RnI54g3muwLQ_OQ3f4SFXySuTTxnbCihVXF9RbEaxJnQkIDfXae5hpH1gGYvRGO6Y",
                List.of(
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuAD-K6sOpdUDjaVL0Ae9KW888v1F_8pG2PDhwnahyH9fa39W9fkocqtPMORdhASv18JMA4cbzH04JtLr82vbr-NYz2mbrPf3R-Hcy4ywE5KKHYbEJslbxWEL_9tNUswRqXAFDTxogRb5Eclt68UZpIYUzGsd1mIS9YnADGbeheXKQAzVQnXzy9dooWZGbkG1U8kEYFGRkMIvfV0CBE5T4pcWTuudPcaIda9fv9nijkvfEwX6NqGxHBemN0ZutbPMYHQf3oj4EzHclCe",
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuBKC1Otb8vc3-iH96iwv0H52eNWLb6kVf28JPHGIc6iP-s28vwFWjLW3-8SCnrn_RaQCgPiAWAlp1RRtq2FAhRtXkZa1jdhpasGALsxis6YCzBOgz9TmjkekAI5jbDBTT1DF__ZniCoBKQd7KKk13Q6HBh0fvvUOI6arolhkm1MXGTkobTxjEkyUAU-AVwFyscVguCUde_9-AW1jbGewaw8SbW5Utsi0tH649QVlVTJp6uIE1zu264159KOEBXzjTX_7EzpPftCsOpI",
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuAEGrKwEEoQu59jWQGDM-HflVH76JWDjBOgbQKHmp51Gdzhe_0O4EYj0dm0nttXS77mCLLOlmWoVpZ8iBqDVo2CZ9lOtsLEL3zhFGIasbb5YCv_M7JucXyahdbiuHZw6QloKn0M4RKvaxm2DilDjATmRGehXVlfXOM3Mx_xTXczTWzovYAs_AfvqZeuG5w30i49P2t57pq8m04RnI54g3muwLQ_OQ3f4SFXySuTTxnbCihVXF9RbEaxJnQkIDfXae5hpH1gGYvRGO6Y"
                ),
                List.of("XS", "S", "M", "L"),
                List.of(new String[]{"Champagne", "#F5F1E9"}, new String[]{"Noir", "#1A1C1C"}, new String[]{"Storm", "#4A4A4A"})
            ),
            buildProduct(
                "Tailored Wool Trousers", "Charcoal Grey", new BigDecimal("620.00"),
                "High-waisted tailored trousers in a heavyweight wool blend. Impeccably constructed with a clean break and invisible side pockets.",
                "Trousers", "Autumn / Winter '24", "New",
                "https://lh3.googleusercontent.com/aida-public/AB6AXuA9PSfSylMqNjdkTv6WA_HW2W67Fky5MDHTConP0VxQErn7y5E7Gu8wDa7Z3nvk8Sy3r4nlBueYGBVkdevU5YtNAFZdZorQ9DYYIxFpyF63fFzVzmJTVz0FGieltCXZzLF5f29xgo8WsjRssjgr1gODu14T3BJ3IreuhVP56xp102KyoAc7sVGs-19UA0TbQyUbEGt8vE0uGTlXfwzJIQbOHWk3w6KFA_1tHCL1vj2z3ilyhyfzM3a1fvgC8-muWUmDHqGNOdpZXuUi",
                List.of("https://lh3.googleusercontent.com/aida-public/AB6AXuA9PSfSylMqNjdkTv6WA_HW2W67Fky5MDHTConP0VxQErn7y5E7Gu8wDa7Z3nvk8Sy3r4nlBueYGBVkdevU5YtNAFZdZorQ9DYYIxFpyF63fFzVzmJTVz0FGieltCXZzLF5f29xgo8WsjRssjgr1gODu14T3BJ3IreuhVP56xp102KyoAc7sVGs-19UA0TbQyUbEGt8vE0uGTlXfwzJIQbOHWk3w6KFA_1tHCL1vj2z3ilyhyfzM3a1fvgC8-muWUmDHqGNOdpZXuUi"),
                List.of("XS", "S", "M", "L", "XL"),
                List.of(new String[]{"Charcoal", "#4A4A4A"}, new String[]{"Ivory", "#F5F1E9"})
            ),
            buildProduct(
                "Sculptural Gold Cuff", "Hammered 18k Gold-Plate", new BigDecimal("350.00"),
                "A sculptural open cuff cast in architectural form. Finished in 18k gold-plate with a hand-hammered texture that catches the light beautifully.",
                "Accessories", "Essential Collection", null,
                "https://lh3.googleusercontent.com/aida-public/AB6AXuD00DJ4FFq6tD55b4QKwsGfsSr77BYwd08Yuj-RrEyjUsb00GNTW1JXkFxbkbl1gZdJ-38o8550FdIirjXY-Wr6fiH2HqhVlMwfV9lGS8hqIAzpvwlLb-9Jtpl9TWzCYFL3nOlyfXnRskX-AQkV_3kddO5XlNgd13Wwg6sJtaXNGmkvPDX9wwgoKDPgp69lJAkH69gZyA3iC4Mr84BnSkzSE1OoiyF2MD83OuABAEd2eTf-GxUK1wJADaNRx-8CL48szPBUVPJ3Zltm",
                List.of("https://lh3.googleusercontent.com/aida-public/AB6AXuD00DJ4FFq6tD55b4QKwsGfsSr77BYwd08Yuj-RrEyjUsb00GNTW1JXkFxbkbl1gZdJ-38o8550FdIirjXY-Wr6fiH2HqhVlMwfV9lGS8hqIAzpvwlLb-9Jtpl9TWzCYFL3nOlyfXnRskX-AQkV_3kddO5XlNgd13Wwg6sJtaXNGmkvPDX9wwgoKDPgp69lJAkH69gZyA3iC4Mr84BnSkzSE1OoiyF2MD83OuABAEd2eTf-GxUK1wJADaNRx-8CL48szPBUVPJ3Zltm"),
                List.of("One Size"),
                List.of(new String[]{"Gold", "#C5A028"}, new String[]{"Silver", "#C0C0C0"})
            ),
            buildProduct(
                "Pointed Leather Mules", "Chocolate Brown", new BigDecimal("540.00"),
                "A sleek, pointed-toe silhouette in rich chocolate leather. The ultimate in refined minimalism — versatile enough for day or evening.",
                "Footwear", "Essential Collection", null,
                "https://lh3.googleusercontent.com/aida-public/AB6AXuBYtQpHLp0lKOz5AM_V6-gzGxqEEPBfChhr5zfZtohwfcZitZznUfSfvcy6z0C0tQiu82sw7EXjIhFYiKZil1UXTxYqYzk2TgrJScifTCJbks2_9xQxp_8zx_XEYeobuS3ejRvlgHRjmJk8JJ5OI4QHk1lVEGS4H4zs8E2NtoYYq0MeqBGhTneAjPvdwhAWKPlukZjzvN-wS2XfboGJOaVk2iwGvFE7JDv8sSdJSYA0nHA9D53TETmWQwuBcA27MthwabjeoXVL0QpmI",
                List.of("https://lh3.googleusercontent.com/aida-public/AB6AXuBYtQpHLp0lKOz5AM_V6-gzGxqEEPBfChhr5zfZtohwfcZitZznUfSfvcy6z0C0tQiu82sw7EXjIhFYiKZil1UXTxYqYzk2TgrJScifTCJbks2_9xQxp_8zx_XEYeobuS3ejRvlgHRjmJk8JJ5OI4QHk1lVEGS4H4zs8E2NtoYYq0MeqBGhTneAjPvdwhAWKPlukZjzvN-wS2XfboGJOaVk2iwGvFE7JDv8sSdJSYA0nHA9D53TETmWQwuBcA27MthwabjeoXVL0QpmI"),
                List.of("EU 36", "EU 37", "EU 38", "EU 39", "EU 40", "EU 41"),
                List.of(new String[]{"Chocolate", "#6B4226"}, new String[]{"Ivory", "#F5F1E9"})
            )
        );

        productRepository.saveAll(products);
        log.info("DataSeeder: Successfully seeded {} products.", products.size());
    }

    // ── Builder helper ────────────────────────────────────────────────────

    private Product buildProduct(String name, String variant, BigDecimal price,
                                  String description, String category,
                                  String collection, String badge,
                                  String mainImage, List<String> imageUrls,
                                  List<String> sizes, List<String[]> colors) {
        Product product = Product.builder()
                .name(name)
                .variant(variant)
                .price(price)
                .description(description)
                .category(category)
                .collection(collection)
                .badge(badge)
                .imageUrl(mainImage)
                .build();

        // Add gallery images
        for (int i = 0; i < imageUrls.size(); i++) {
            product.addImage(ProductImage.builder()
                    .imageUrl(imageUrls.get(i))
                    .displayOrder(i)
                    .build());
        }

        // Add sizes
        for (String size : sizes) {
            product.addSize(ProductSize.builder().size(size).build());
        }

        // Add colors
        for (String[] color : colors) {
            product.addColor(ProductColor.builder()
                    .colorName(color[0])
                    .hexCode(color[1])
                    .build());
        }

        return product;
    }
}
