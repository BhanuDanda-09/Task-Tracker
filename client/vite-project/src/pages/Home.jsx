import { useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import { fetchTasks, createTask, updateTask, deleteTask } from "../services/api";

/**
 * Home Page
 * Manages all task state, API calls, search, filter, and sort logic.
 */
const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");

  // ─── Fetch tasks on mount ────────────────────────────────────────────────────
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const { data } = await fetchTasks();
      setTasks(data.data);
    } catch {
      toast.error("Failed to load tasks. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  // ─── Create Task ─────────────────────────────────────────────────────────────
  const handleCreateTask = async (formData) => {
    setIsSubmitting(true);
    try {
      const { data } = await createTask(formData);
      setTasks((prev) => [data.data, ...prev]);
      toast.success("Task created successfully! 🎉");
      return true; // signal success to TaskForm to reset
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create task.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Update Task ─────────────────────────────────────────────────────────────
  const handleUpdateTask = async (id, taskData) => {
    try {
      const { data } = await updateTask(id, taskData);
      setTasks((prev) => prev.map((t) => (t._id === id ? data.data : t)));
      toast.success("Task updated successfully! ✅");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update task.");
    }
  };

  // ─── Delete Task ─────────────────────────────────────────────────────────────
  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      toast.success("Task deleted. 🗑️");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete task.");
    }
  };

  // ─── Derived: filtered + searched + sorted tasks ─────────────────────────────
  const processedTasks = useMemo(() => {
    let result = [...tasks];

    // Filter by status
    if (filter !== "All") result = result.filter((t) => t.status === filter);

    // Search by title
    if (searchTerm.trim()) {
      const lower = searchTerm.toLowerCase();
      result = result.filter((t) => t.title.toLowerCase().includes(lower));
    }

    // Sort
    result.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [tasks, filter, searchTerm, sortOrder]);

  // ─── Stats ───────────────────────────────────────────────────────────────────
  const stats = useMemo(() => ({
    total: tasks.length,
    pending: tasks.filter((t) => t.status === "Pending").length,
    completed: tasks.filter((t) => t.status === "Completed").length,
  }), [tasks]);

  return (
    <main className="home-page">
      {/* ── Hero Section ─────────────────────────────────────────────────────── */}
      <section className="hero-section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h1 className="hero-heading">
              Manage Your Tasks <span className="heading-accent">Effortlessly</span>
            </h1>
            <p className="hero-subtext text-muted">
              Organise, track, and complete your daily tasks with ease.
            </p>
          </div>

          {/* Stats Row */}
          <div className="row g-3 mb-5 justify-content-center">
            <div className="col-6 col-md-4 col-lg-3">
              <div className="stat-card stat-total text-center p-3">
                <div className="stat-number">{stats.total}</div>
                <div className="stat-label">Total Tasks</div>
              </div>
            </div>
            <div className="col-6 col-md-4 col-lg-3">
              <div className="stat-card stat-pending text-center p-3">
                <div className="stat-number">{stats.pending}</div>
                <div className="stat-label">Pending</div>
              </div>
            </div>
            <div className="col-6 col-md-4 col-lg-3">
              <div className="stat-card stat-completed text-center p-3">
                <div className="stat-number">{stats.completed}</div>
                <div className="stat-label">Completed</div>
              </div>
            </div>
          </div>

          {/* Task Form */}
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8">
              <TaskForm onSubmit={handleCreateTask} isSubmitting={isSubmitting} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Tasks Section ─────────────────────────────────────────────────────── */}
      <section className="tasks-section py-4">
        <div className="container">
          {/* Controls Row */}
          <div className="controls-row row g-3 align-items-end mb-4">
            <div className="col-12 col-md-5">
              <SearchBar value={searchTerm} onChange={setSearchTerm} />
            </div>
            <div className="col-6 col-md-3">
              <Filter filter={filter} onFilterChange={setFilter} />
            </div>
            <div className="col-6 col-md-3">
              {/* Sort Dropdown */}
              <div className="filter-wrap">
                <label className="filter-label" htmlFor="sort-select">
                  <i className="bi bi-sort-down me-1"></i>Sort
                </label>
                <select
                  id="sort-select"
                  className="form-select filter-select"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>
            <div className="col-12 col-md-1 text-end">
              <span className="task-count-badge">
                {processedTasks.length} task{processedTasks.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {/* Task List */}
          <TaskList
            tasks={processedTasks}
            loading={loading}
            onDelete={handleDeleteTask}
            onUpdate={handleUpdateTask}
            totalCount={tasks.length}
          />
        </div>
      </section>
    </main>
  );
};

export default Home;
