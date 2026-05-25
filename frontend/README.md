# Auth Dashboard

A full stack authentication system built with React and Node.js. Features secure user registration, login, and protected routes using JWT authentication.

Live Demo: [auth-dashboard-iota.vercel.app](https://auth-dashboard-iota.vercel.app)

---

## Features

- User Registration with input validation
- Secure Login with JWT tokens
- Password hashing with bcrypt (salt rounds: 10)
- Protected Dashboard — unauthorized users redirected to login
- Persistent sessions using localStorage
- CORS configured for cross-origin requests
- RESTful API architecture

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Vite, Tailwind CSS, React Router v6 |
| Backend | Node.js, Express.js |
| Database | PostgreSQL |
| Authentication | JWT, bcryptjs |
| Deployment | Vercel (frontend), Render (backend + DB) |

---

## What It Does

A complete user authentication flow:

1. **Register** — validates input, hashes password with bcrypt, stores in PostgreSQL
2. **Login** — verifies credentials, returns signed JWT token
3. **Dashboard** — protected route, only accessible with valid token
4. **Logout** — clears token from localStorage

---

## Folder Structure

```
auth-dashboard/
├── frontend/
│   └── src/
│       ├── components/
│       │   └── ProtectedRoute.jsx    # Route guard component
│       └── pages/
│           ├── Login.jsx
│           ├── Register.jsx
│           └── Dashboard.jsx
└── backend/
    ├── controllers/
    │   └── authController.js         # Register & Login logic
    ├── middleware/
    │   └── authMiddleware.js         # JWT verification
    ├── routes/
    │   └── authRoutes.js             # API endpoints
    ├── db.js                          # PostgreSQL connection pool
    └── server.js                      # Express server entry point
```

---

## Local Setup

### Backend

```bash
cd backend
npm install
node server.js
```

Add a `.env` file in `/backend`:

```env
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=auth_db
DB_PORT=5432
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Add a `.env` file in `/frontend`:

```env
VITE_API_URL=http://localhost:5000
```

---

## Deployment

| Service | Platform |
|---------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | Render PostgreSQL |

> Backend is on Render free tier — first request may take ~30 seconds to wake up.
