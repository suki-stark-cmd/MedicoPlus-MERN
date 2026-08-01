# MedicoPlus MERN

A multi-portal medical management system built with the MERN stack (MongoDB, Express, React, Node.js).

## Project Structure
```
MedicoPlus-MERN/
+-- backend/          # Node.js + Express API server (port 4000)
+-- frontend/         # Patient-facing React app (Vite, port 5173)
+-- doctor/           # Doctor portal React app (Vite, port 5176)
+-- admin/            # Admin panel React app (Vite, port 5174)
+-- package.json      # Root monorepo orchestration (concurrently)
```

## Quick Start
```bash
npm run dev    # Start all 4 servers simultaneously
```

## Individual Server Commands
```bash
npm run dev:backend   # Backend API only (port 4000)
npm run dev:frontend  # Patient app only (port 5173)
npm run dev:doctor    # Doctor portal only (port 5176)
npm run dev:admin     # Admin panel only (port 5174)
```

## Login Credentials

| Portal  | Email                          | Password    |
|---------|--------------------------------|-------------|
| Admin   | admin@gmail.com              | admin123    |
| Doctor  | rajesh.kumar@medicoplus.com  | doctor123   |
| Patient | Register at localhost:5173   | Self-chosen |

## Database Seeding

Seeding is NOT automatic. To populate sample doctors:
```bash
cd backend
npm run seed
```

## API Endpoints

All API routes are under `http://localhost:4000/api/`

- **Admin**: /api/admin/* (login, add-doctor, list doctors, appointments, dashboard)
- **Doctor**: /api/doctor/* (login, profile, dashboard, appointments, prescriptions)
- **User**: /api/user/* (register, login, doctors, book-appointment, profile)

## Request Logging

The backend logs all HTTP requests/responses with timestamps, IPs, status codes, and response times. Auth endpoints log request/response bodies with passwords and tokens redacted.
