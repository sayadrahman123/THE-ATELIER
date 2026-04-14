# THE ATELIER

> *Quiet Luxury, Vocal Craft.*

A production-ready, full-stack luxury e-commerce platform built with **React + Vite** on the frontend and **Spring Boot + MySQL** on the backend.

---

## ✨ Overview

THE ATELIER is an editorial-grade luxury fashion e-commerce website featuring a curated design system, smooth micro-animations, and a fully interactive shopping flow — from product discovery to payment.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, TailwindCSS v3, React Router v6 |
| State Management | React Context API (Cart, Auth) |
| Backend *(planned)* | Spring Boot 3, Java 17, Maven |
| Database *(planned)* | MySQL 8, Spring Data JPA |
| Authentication *(planned)* | JWT (JSON Web Tokens) |

---

## 📂 Project Structure

```
THE ATELIER/
├── frontend/                  # React + Vite application
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/        # Navbar, Footer
│   │   │   └── ui/            # ProductCard
│   │   ├── context/           # CartContext, AuthContext
│   │   ├── data/              # products.js (placeholder data)
│   │   └── pages/             # All 10 page components
│   ├── tailwind.config.js
│   └── index.html
├── backend/                   # Spring Boot application (upcoming)
├── ui-design/                 # Original HTML/PNG design files
└── README.md
```

---

## 📄 Pages

| Route | Page |
|---|---|
| `/` | Home — Hero, bento grid, product grid, brand story |
| `/shop` | Shop — Product listing with filters & sort |
| `/product/:id` | Product Detail — Gallery, selectors, Add to Bag |
| `/cart` | Cart — Items, qty controls, order summary |
| `/checkout` | Checkout — Shipping form, delivery method |
| `/payment` | Payment — Card form, Apple/Google Pay |
| `/auth` | Login / Register — Split-screen layout |
| `/about` | Our Story — Editorial brand narrative |
| `/contact` | Contact — Form, info cards |
| `/privacy` | Privacy Policy — Structured legal document |

---

## 🚀 Getting Started

### Frontend

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**

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
  - [x] All 10 pages
  - [x] Cart & Auth context
  - [x] Responsive design
  - [x] Interactive features (filters, form validation, cart flow)
- [ ] **Phase 2** — Backend (Spring Boot + MySQL)
  - [ ] Product API (`GET /api/products`)
  - [ ] Auth API with JWT (`POST /api/auth/login`, `/register`)
  - [ ] Cart & Orders API
  - [ ] Payment integration
- [ ] **Phase 3** — Integration & Deployment
  - [ ] Connect React ↔ Spring Boot via Axios
  - [ ] Docker Compose setup
  - [ ] Production deployment

---

## 📸 Preview

> Run `npm run dev` inside `/frontend` to view the full design.

---

## 📜 License

This project is for personal/portfolio use. All product imagery is sourced from Google CDN for development purposes and should be replaced before commercial use.
