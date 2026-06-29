# TaskFlow – MERN Task Tracker

A **production-ready**, full-stack task management application built with the **MERN** stack. Organise, track, and complete your daily tasks with a beautiful dark-themed dashboard.

---

## ✨ Features

| Feature | Details |
|---|---|
| **Create Tasks** | Title, description, and status (Pending / Completed) |
| **Read Tasks** | Responsive card grid — live-updated without page refresh |
| **Update Tasks** | Edit via an animated modal with validation |
| **Delete Tasks** | Confirmation dialog before irreversible delete |
| **Search** | Instant client-side title search with clear button |
| **Filter** | All / Pending / Completed |
| **Sort** | Newest First / Oldest First |
| **Toast Notifications** | Success and error toasts via react-hot-toast |
| **Loading Spinner** | Dual-ring animated spinner while fetching |
| **Empty States** | Inline SVG illustrations for empty DB and no-results |
| **Stats Dashboard** | Live Total / Pending / Completed counters |
| **Responsive** | Mobile-first Bootstrap 5 grid |
| **Dark Mode** | Premium dark colour palette with glassmorphism navbar |

---

## 🛠 Tech Stack

### Backend
- **Node.js** + **Express.js** (ESM modules)
- **MongoDB Atlas** + **Mongoose**
- **dotenv**, **cors**
- **nodemon** (dev)

### Frontend
- **React 19** (Vite)
- **Bootstrap 5** + **Bootstrap Icons**
- **Axios**
- **react-hot-toast**

---

## 📁 Folder Structure

```
TaskFlow/
├── client/
│   └── vite-project/
│       ├── public/
│       ├── src/
│       │   ├── assets/
│       │   ├── components/
│       │   │   ├── Navbar.jsx
│       │   │   ├── TaskForm.jsx
│       │   │   ├── TaskCard.jsx
│       │   │   ├── TaskList.jsx
│       │   │   ├── SearchBar.jsx
│       │   │   ├── Filter.jsx
│       │   │   ├── Loading.jsx
│       │   │   └── EmptyState.jsx
│       │   ├── pages/
│       │   │   └── Home.jsx
│       │   ├── services/
│       │   │   └── api.js
│       │   ├── App.jsx
│       │   ├── main.jsx
│       │   └── index.css
│       ├── .env
│       ├── index.html
│       └── package.json
│
└── server/
    ├── config/
    │   └── db.js
    ├── controllers/
    │   └── taskController.js
    ├── middleware/
    │   └── errorMiddleware.js
    ├── models/
    │   └── Task.js
    ├── routes/
    │   └── taskRoutes.js
    ├── .env
    ├── .env.example
    ├── package.json
    └── server.js
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js ≥ 18
- A free [MongoDB Atlas](https://cloud.mongodb.com) cluster

---

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/TaskFlow.git
cd TaskFlow
```

---

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside `server/`:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/taskflow?retryWrites=true&w=majority
PORT=5000
CLIENT_URL=http://localhost:5173
```

Start the dev server:

```bash
npm run dev
```

The API will be available at `http://localhost:5000`.

---

### 3. Frontend Setup

```bash
cd client/vite-project
npm install
```

The `.env` file is already pre-configured for local development:

```env
VITE_API_URL=http://localhost:5000/api
```

Start Vite dev server:

```bash
npm run dev
```

The app will run at `http://localhost:5173`.

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tasks` | Get all tasks |
| `POST` | `/api/tasks` | Create a new task |
| `PUT` | `/api/tasks/:id` | Update a task by ID |
| `DELETE` | `/api/tasks/:id` | Delete a task by ID |

### Sample Task Object

```json
{
  "_id": "665f4c...",
  "title": "Build the landing page",
  "description": "Design and implement the hero section using Figma specs.",
  "status": "Pending",
  "createdAt": "2025-01-01T10:00:00.000Z",
  "updatedAt": "2025-01-01T11:30:00.000Z"
}
```

---

## 🌐 Deployment

### Backend → Render

1. Push code to GitHub.
2. Create a new **Web Service** on [Render](https://render.com).
3. Set root directory: `server`.
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables: `MONGO_URI`, `PORT`, `CLIENT_URL` (your Vercel URL).

### Frontend → Vercel

1. Create a new project on [Vercel](https://vercel.com).
2. Set root directory: `client/vite-project`.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variable: `VITE_API_URL=https://your-render-app.onrender.com/api`

---

## 🔮 Future Improvements

- [ ] JWT Authentication (user accounts)
- [ ] Task due dates and priority levels
- [ ] Drag-and-drop reordering (react-beautiful-dnd)
- [ ] Dark/Light mode toggle
- [ ] Email reminders for overdue tasks
- [ ] Task categories / tags
- [ ] Pagination / infinite scroll for large datasets
- [ ] Unit & integration tests (Jest + React Testing Library)

---

## 📄 License

MIT © 2025 TaskFlow
