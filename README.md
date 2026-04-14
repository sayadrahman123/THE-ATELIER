# THE ATELIER

> *Quiet Luxury, Vocal Craft.*

A production-ready, full-stack luxury e-commerce platform built with **React + Vite** on the frontend and **Spring Boot + MySQL** on the backend.

---

## ✨ Overview

THE ATELIER is an editorial-grade luxury fashion e-commerce website featuring a curated design system, smooth micro-animations, and a fully interactive shopping flow — from product discovery to Razorpay-powered payment.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite 5, TailwindCSS v3, React Router v6 |
| State Management | React Context API (Cart, Auth) |
| Backend | Spring Boot 3.2, Java 17, Maven |
| Database | MySQL 8, Spring Data JPA / Hibernate |
| Authentication | Spring Security + JWT (JJWT 0.12) |
| Payments | Razorpay |
| Validation | Jakarta Bean Validation |

---

## 📂 Project Structure

```
THE ATELIER/
├── frontend/                        # React + Vite application
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/              # Navbar, Footer
│   │   │   └── ui/                  # ProductCard
│   │   ├── context/                 # CartContext, AuthContext
│   │   ├── data/                    # products.js (temporary — replaced by API)
│   │   └── pages/                   # 10 page components
│   ├── tailwind.config.js
│   └── index.html
│
├── backend/                         # Spring Boot REST API
│   └── src/main/java/com/theatelier/backend/
│       ├── config/                  # Security, CORS, JWT beans, DataSeeder
│       ├── controller/              # Auth, Product, Category, Order controllers
│       ├── dto/                     # Request & Response DTOs
│       │   ├── request/             # LoginRequest, RegisterRequest, PlaceOrderRequest
│       │   └── response/            # AuthResponse, ProductResponse, OrderResponse
│       ├── entity/                  # JPA Entities (User, Product, Order, etc.)
│       ├── exception/               # Global exception handler + custom exceptions
│       ├── repository/              # Spring Data JPA Repositories
│       ├── security/                # JwtAuthenticationFilter
│       └── service/                 # AuthService, JwtService, ProductService, OrderService
│
├── ui-design/                       # Original HTML/PNG design mockups
├── .gitignore
├── .gitattributes
└── README.md
```

---

## 📄 Frontend Pages

| Route | Page |
|---|---|
| `/` | Home — Hero, bento grid, product grid, brand story |
| `/shop` | Shop — Product listing with category/price filters & sort |
| `/product/:id` | Product Detail — Gallery, size/colour selectors, Add to Bag |
| `/cart` | Cart — Items, qty controls, order summary |
| `/checkout` | Checkout — Shipping form, delivery method |
| `/payment` | Payment — Razorpay, card form |
| `/auth` | Login / Register — Split-screen layout |
| `/about` | Our Story — Editorial brand narrative |
| `/contact` | Contact — Form, info cards |
| `/privacy` | Privacy Policy — Structured legal document |

---

## 🔌 REST API Reference

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register new account → JWT |
| `POST` | `/api/auth/login` | Public | Login → JWT + refresh token |
| `POST` | `/api/auth/refresh` | Public | Get new access token |
| `GET` | `/api/products` | Public | List products (`?category=`, `?minPrice=`, `?maxPrice=`, `?sort=`) |
| `GET` | `/api/products/{id}` | Public | Single product with images, sizes, colours |
| `GET` | `/api/categories` | Public | All distinct product categories |
| `POST` | `/api/orders` | 🔒 JWT | Place a new order |
| `GET` | `/api/orders/my` | 🔒 JWT | Current user's order history |
| `GET` | `/api/orders/{id}` | 🔒 JWT | Single order detail |
| `POST` | `/api/payment/create-order` | 🔒 JWT | Create Razorpay order |
| `POST` | `/api/payment/verify` | 🔒 JWT | Verify payment & mark order PAID |

---

## 🚀 Getting Started

### Prerequisites

- Java 17+
- Maven 3.9+
- MySQL 8.0+
- Node.js 18+

### 1. Database Setup

```sql
CREATE DATABASE theatelier_db;
```

### 2. Backend

```bash
cd backend

# Copy the example config and fill in your credentials
cp src/main/resources/application-example.properties src/main/resources/application.properties
# Edit application.properties with your MySQL password, JWT secret, Razorpay keys

# Run the application (auto-seeds 8 products on first launch)
mvn spring-boot:run
```

Backend runs at **http://localhost:8080**

> **First startup:** The `DataSeeder` automatically inserts all 8 products into the database.

### 3. Frontend

```bash
cd frontend

npm install
npm run dev
```

Frontend runs at **http://localhost:5173**

---

## 🔐 Authentication Flow

```
Register/Login → Spring Boot returns { accessToken, refreshToken, user }
         ↓
Frontend stores tokens → sends Authorization: Bearer <accessToken>
         ↓
JWT filter validates token → sets Spring SecurityContext
         ↓
Protected endpoints (@AuthenticationPrincipal User) work automatically
```

Access token TTL: **15 minutes** | Refresh token TTL: **7 days**

---

## 💳 Payment Flow (Razorpay)

```
1. POST /api/payment/create-order  → creates Razorpay order, returns orderId + key
2. Frontend opens Razorpay checkout modal
3. User pays → Razorpay returns { razorpay_payment_id, razorpay_signature }
4. POST /api/payment/verify        → backend verifies HMAC signature
5. Order status updated to PAID in MySQL
```

---

## 🎨 Design System

| Token | Value |
|---|---|
| Primary | `#000000` |
| Gold Accent | `#775a19` → `#e9c176` (gradient) |
| Background | `#f9f9f9` |
| Headline Font | Noto Serif |
| Body Font | Inter |

---

## 🗺️ Roadmap

- [x] **Phase 1** — Frontend (React + Vite + TailwindCSS)
  - [x] All 10 pages (Home, Shop, Product Detail, Cart, Checkout, Payment, Auth, Story, Contact, Privacy)
  - [x] Cart & Auth context (placeholder stubs)
  - [x] Responsive design & micro-animations
  - [x] App routing (React Router v6)
- [x] **Phase 2** — Backend (Spring Boot + MySQL)
  - [x] Maven project scaffold + `pom.xml`
  - [x] JWT security config (Spring Security + JJWT 0.12)
  - [x] JPA Entities: `User`, `Product`, `ProductImage`, `ProductSize`, `ProductColor`, `Order`, `OrderItem`
  - [x] Auth API — `/register`, `/login`, `/refresh`
  - [x] Product API — `/api/products`, `/api/products/{id}`, `/api/categories`
  - [x] Data Seeder — auto-populates 8 products on startup
  - [x] Order API — place order, view orders
  - [x] Razorpay payment integration (create order, HMAC-SHA256 verify, mark PAID)
- [ ] **Phase 3** — Integration & Deployment
  - [x] Connect React ↔ Spring Boot via Axios (`services/api.js` with JWT interceptor + auto-refresh)
  - [x] Wire AuthContext & product pages to live API (Shop, Home, ProductDetail, Checkout, Payment)
  - [ ] Docker Compose setup
  - [ ] Production deployment

---

## 📜 License

This project is for personal/portfolio use. All product imagery is sourced from Google CDN for development purposes and should be replaced before commercial use.
