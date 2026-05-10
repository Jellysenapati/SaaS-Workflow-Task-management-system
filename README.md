## Productivity SaaS (Full Stack)

Modern full-stack productivity web app with:
- JWT authentication (signup/login)
- Task management (create, edit, update status, delete)
- Dashboard analytics (task metrics + charts)
- Search/filter/sort + Kanban board
- Reminders and notifications panel
- User profile/settings page
- MongoDB data persistence
- Trendy, professional UI/UX

### Tech Stack
- Frontend: React + Vite + React Router + Recharts
- Backend: Node.js + Express + Mongoose + JWT
- Database: MongoDB

### Project Structure
- `backend` - API server
- `frontend` - React client

### Run Backend
1. `cd backend`
2. `npm install`
3.  update values
4. `npm run dev`

### Run Frontend
1. `cd frontend`
2. `npm install`
3. Create `.env` 
4. `npm run dev`



### Deployment
- **Backend (Render):**
  - Use `render.yaml` at project root.
  - Set `MONGO_URI` and `JWT_SECRET` in Render dashboard.
- **Frontend (Vercel):**
  - Set root directory as `frontend`.
  - Add env var `VITE_API_URL` with your deployed backend URL + `/api`.
  - `vercel.json` is included for SPA routing.
