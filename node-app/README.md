# Welcome App — Node.js + React.js

A basic static web application built with **React.js** (frontend) and **Node.js/Express** (backend). This project is created for learning purposes.

## Project Structure

```
node-app/
├── backend/            # Node.js Express server
│   ├── package.json
│   └── server.js
└── frontend/           # React.js application
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── index.jsx
        ├── index.css
        ├── App.jsx
        ├── App.css
        └── components/
            ├── WelcomeForm.jsx
            └── WelcomeForm.css
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm v9 or later

---

### 1. Install & Run the Backend

```bash
cd node-app/backend
npm install
npm start
```

The backend server starts on **http://localhost:5000**.

---

### 2. Install & Run the Frontend (development)

```bash
cd node-app/frontend
npm install
npm run dev
```

The React dev server starts on **http://localhost:3000** and automatically proxies `/api` requests to the backend.

---

### 3. Build the Frontend for Production

```bash
cd node-app/frontend
npm run build
```

The build output goes to `node-app/frontend/dist/`. The backend is already configured to serve these static files, so after building you only need to run the backend server to serve the full app.

---

## API Endpoints

| Method | Path          | Description                       |
|--------|---------------|-----------------------------------|
| GET    | `/api/health` | Health check                      |
| POST   | `/api/welcome`| Handle welcome form submission    |

### POST `/api/welcome`

**Request body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello!"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Welcome, John Doe! We have received your message and will be in touch at john@example.com."
}
```
