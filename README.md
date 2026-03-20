# EduZone LMS (MERN)

Production-oriented LMS monorepo with:

- `client/` (React + Vite + Redux Toolkit + Tailwind)
- `server/` (Node.js + Express + MongoDB + JWT access/refresh auth)

## Architecture

### Backend (`server/src`)

- `config/` database + env config
- `controllers/` request handlers
- `models/` mongoose schemas
- `routes/` API route modules
- `middlewares/` auth, validation, security, error handling
- `utils/` token helpers, API response helpers, mailer, misc
- `validators/` request validators

### Frontend (`client/src`)

- `components/` shared/admin/lms UI
- `features/` Redux slices by domain
- `hooks/` reusable hooks
- `pages/` route-level views
- `routes/` route guards + app routing
- `services/` axios API client layer
- `app/` Redux store

## Key Implemented Upgrades

- Access + refresh JWT auth flow (`/api/auth/login`, `/api/auth/refresh`, `/api/auth/logout`)
- Role-based guards (`admin`, `instructor`, `student`)
- Request validation middleware + validators
- Security middleware:
  - in-memory rate limiting
  - request sanitization against Mongo operator injection keys
  - secure default headers
- Centralized success/error response utilities
- Public browse APIs for courses/blogs
- Course search/filter + pagination metadata
- Enrollment ownership checks + student progress update endpoint
- Analytics APIs with real data:
  - `GET /api/analytics/admin`
  - `GET /api/analytics/instructor`
  - `GET /api/analytics/student`
- Frontend axios interceptor with token refresh retry
- Dashboard pages wired to real analytics API data
- Student learning room wired to backend lessons + enrollment progress persistence

## Run Locally

## 1) Backend

```bash
cd server
npm install
cp .env.example .env
# update .env values
npm run dev
```

## 2) Frontend

```bash
cd client
npm install
cp .env.example .env
# update .env values
npm run dev
```

## 3) URLs

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## Environment Variables

### Backend (`server/.env`)

Use `server/.env.example` as reference.

Required:

- `DB_CONFIGURATION`
- `ACCESS_TOKEN_SECRET`
- `REFRESH_TOKEN_SECRET`
- `CLIENT_URL`
- `BASE_URL`

### Frontend (`client/.env`)

Use `client/.env.example` as reference.

Required:

- `VITE_BASE_URL`
