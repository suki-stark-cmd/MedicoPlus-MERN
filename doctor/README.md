# MedicoPlus Doctor Portal

A dedicated Vite + React portal for doctors to manage appointments, patient records, prescriptions, schedules, earnings, and profile.

## Tech Stack

- **React 19** — UI library
- **Vite 6** — Build tool & dev server
- **Tailwind CSS v4** — Styling with glassmorphism design system
- **React Router 7** — Routing with protected routes
- **Lucide React** — Icons
- **React Toastify** — Toast notifications
- **Axios** — HTTP client

## Development

```bash
npm run dev    # Start dev server on http://localhost:5176
npm run build  # Production build
npm run lint   # ESLint check
```

## Environment Variables

Create a `.env` file in the root with:

```
VITE_BACKEND_URL=http://localhost:4000
```

## Routes

| Route | Page | Auth Required |
|-------|------|---------------|
| `/login` | Login | No |
| `/dashboard` | Dashboard | Yes |
| `/appointments` | Appointments | Yes |
| `/patient/:id` | Patient Record | Yes |
| `/prescription/:apptId` | Write Prescription | Yes |
| `/schedule` | Schedule | Yes |
| `/earnings` | Earnings | Yes |
| `/profile` | Profile | Yes |
| `*` | 404 Not Found | No |

## API Endpoints

All endpoints are prefixed with `/api/doctor` and use the `dToken` header for authentication.

- `POST /login` — Doctor login
- `GET /dashboard` — Dashboard stats
- `GET /appointments` — All appointments for this doctor
- `GET /patient/:id` — Patient record by appointment ID
- `POST /prescription/:apptId` — Add/update prescription
- `PUT /schedule` — Update availability schedule
- `GET /earnings` — Earnings summary
- `GET /profile` & `PUT /profile` — Profile CRUD
