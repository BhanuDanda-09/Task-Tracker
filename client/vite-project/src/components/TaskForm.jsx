import { useState } from "react";
import toast from "react-hot-toast";

/**
 * TaskForm Component
 * Handles creating a new task with client-side validation.
 * Props:
 *  - onTaskCreated(task): callback after successful creation
 *  - isSubmitting: boolean to disable button during API call
 *  - onSubmit(formData): submit handler from parent
 */
const TaskForm = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending",
  });
  const [errors, setErrors] = useState({});

  // ─── Validation ─────────────────────────────────────────────────────────────
  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is required.";
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters.";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const success = await onSubmit(formData);
    if (success) {
      setFormData({ title: "", description: "", status: "Pending" });
      setErrors({});
    }
  };

  return (
    <div className="card task-form-card shadow-sm mb-4">
      <div className="card-body p-4">
        <h5 className="card-title mb-4">
          <i className="bi bi-plus-circle-fill me-2 text-primary"></i>
          Add New Task
        </h5>
        <form onSubmit={handleSubmit} noValidate>
          {/* Title */}
          <div className="mb-3">
            <label htmlFor="title" className="form-label fw-semibold">
              Task Title <span className="text-danger">*</span>
            </label>
            <input
              id="title"
              type="text"
              name="title"
              className={`form-control ${errors.title ? "is-invalid" : ""}`}
              placeholder="e.g. Design landing page"
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && <div className="invalid-feedback">{errors.title}</div>}
          </div>

          {/* Description */}
          <div className="mb-3">
            <label htmlFor="description" className="form-label fw-semibold">
              Description <span className="text-danger">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className={`form-control ${errors.description ? "is-invalid" : ""}`}
              placeholder="Describe what needs to be done..."
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && (
              <div className="invalid-feedback">{errors.description}</div>
            )}
          </div>

          {/* Status */}
          <div className="mb-4">
            <label htmlFor="status" className="form-label fw-semibold">
              Status
            </label>
            <select
              id="status"
              name="status"
              className="form-select"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Pending">⏳ Pending</option>
              <option value="Completed">✅ Completed</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" />
                Adding Task...
              </>
            ) : (
              <>
                <i className="bi bi-plus-lg me-2"></i>
                Add Task
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
