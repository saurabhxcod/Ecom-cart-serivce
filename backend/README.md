# Backend (Node + Express + MongoDB)

## Setup
1. Copy `.env.example` → `.env` and fill MONGO_URI.
2. npm install
3. npm run seed   # seeds products
4. npm run dev

API endpoints:
- GET /api/products
- POST /api/products  (admin helper)
- GET /api/cart?userId=guest
- POST /api/cart { productId, qty, userId? }
- PATCH /api/cart/:id { qty }
- DELETE /api/cart/:id
- POST /api/checkout { cartItems, name, email, userId? }
