import axios from "axios";

// Base URL reads from Vite env variable (set VITE_API_URL in .env)
const BASE_URL = import.meta.env.VITE_API_URL || "https://task-tracker-ilwc.onrender.com/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// ─── Request Interceptor — attach JWT token ───────────────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("taskflow_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Task API Calls ───────────────────────────────────────────────────────────

/** Fetch all tasks from the server */
export const fetchTasks = () => api.get("/tasks");

/** Create a new task */
export const createTask = (taskData) => api.post("/tasks", taskData);

/** Update a task by ID */
export const updateTask = (id, taskData) => api.put(`/tasks/${id}`, taskData);

/** Delete a task by ID */
export const deleteTask = (id) => api.delete(`/tasks/${id}`);

// ─── Auth API Calls ───────────────────────────────────────────────────────────

/** Register a new user */
export const registerUser = (userData) => api.post("/auth/register", userData);

/** Login a user */
export const loginUser = (credentials) => api.post("/auth/login", credentials);

/** Get current logged-in user */
export const getMe = () => api.get("/auth/me");

export default api;
