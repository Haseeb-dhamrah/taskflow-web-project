# TaskFlow — Task Management App

A full-stack task management application built with React, Express, and MongoDB.

## Group Members
| Name | Roll No | Role |
|------|---------|------|
| Misbah Ali | 2312122 | Frontend Developer |
| Haseeb Dhamrah | 2312114 | Backend Developer |

## Section
BSCS 6A — Group 15

## Technologies Used

### Frontend (Misbah)
- React + TypeScript
- Vite
- React Router DOM
- CSS

### Backend (Haseeb)
- Node.js
- Express.js
- MongoDB + Mongoose
- dotenv

## How to Run

### 1. Clone the Repository
```bash
git clone https://github.com/Haseeb-dhamrah/taskflow-web-project.git
cd taskflow-web-project
```

### 2. Backend Setup (Haseeb)
```bash
cd backend
node index.js
npm install
```

Create `.env` file in backend folder:

Run backend:
```bash
node index.js
```

### 3. Frontend Setup (Misbah)
```bash
cd frontend
npm install
npm run dev
```

Open: http://localhost:5173

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | /api/tasks | Get all tasks |
| GET | /api/tasks?status=Done | Filter by status |
| POST | /api/tasks | Create new task |
| DELETE | /api/tasks/:id | Delete a task |

## Implemented Features

### Product Feature — Filter by Status (Group 15)
- Status dropdown with All, Todo, In Progress, Done options
- Frontend filter triggers backend query
- Backend accepts and validates status query parameter
- MongoDB returns only matching records

### Engineering Feature — Frontend + Backend Validation
- Frontend: Required field checks, invalid status/priority messages
- Backend: Request body validation with proper error messages
- Returns HTTP 400 for invalid input

## MongoDB Setup
1. Create free account at mongodb.com/atlas
2. Create a free M0 cluster
3. Create database user
4. Copy connection string to .env file
5. Replace `<password>` with your actual password