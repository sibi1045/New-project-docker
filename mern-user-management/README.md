# MERN User Management

A simple MERN application to create, view, and delete users.

## Stack
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB + Mongoose

## Requirements
- Node.js and npm
- MongoDB running locally, or a MongoDB Atlas connection string

## Run locally

### 1. Start the backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Edit `backend/.env` if your MongoDB connection string differs from the default.

### 2. Start the frontend in a second terminal
```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173.

## API
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/users` | List users |
| POST | `/api/users` | Create a user |
| DELETE | `/api/users/:id` | Delete a user |
| GET | `/health` | Backend health check |

## Notes
- Never commit your real `.env` file or database credentials.
- This is a learning project. Add authentication and authorization before public production use.
