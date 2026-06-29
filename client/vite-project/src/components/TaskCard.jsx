import { useState } from "react";

/**
 * TaskCard Component
 * Displays a single task with edit (modal) and delete (confirmation) functionality.
 * Props:
 *  - task: task object { _id, title, description, status, createdAt }
 *  - onDelete(id): callback to delete task
 *  - onUpdate(id, data): callback to update task
 */
const TaskCard = ({ task, onDelete, onUpdate }) => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
    status: task.status,
  });
  const [editErrors, setEditErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  // ─── Edit Handlers ───────────────────────────────────────────────────────────
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
    if (editErrors[name]) setEditErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateEdit = () => {
    const newErrors = {};
    if (!editData.title.trim()) newErrors.title = "Title is required.";
    else if (editData.title.trim().length < 3)
      newErrors.title = "Title must be at least 3 characters.";
    if (!editData.description.trim()) newErrors.description = "Description is required.";
    return newErrors;
  };

  const handleSave = async () => {
    const errs = validateEdit();
    if (Object.keys(errs).length > 0) {
      setEditErrors(errs);
      return;
    }
    setIsSaving(true);
    await onUpdate(task._id, editData);
    setIsSaving(false);
    setShowModal(false);
  };

  const handleDelete = async () => {
    await onDelete(task._id);
    setShowDeleteConfirm(false);
  };

  return (
    <>
      {/* ── Task Card ─────────────────────────────────────────────────────────── */}
      <div className={`card task-card shadow-sm h-100 ${task.status === "Completed" ? "task-completed" : ""}`}>
        <div className="card-body d-flex flex-column p-4">
          {/* Status Badge */}
          <div className="d-flex justify-content-between align-items-start mb-3">
            <span className={`badge status-badge ${task.status === "Completed" ? "badge-completed" : "badge-pending"}`}>
              <i className={`bi ${task.status === "Completed" ? "bi-check-circle-fill" : "bi-clock-fill"} me-1`}></i>
              {task.status}
            </span>
            <small className="text-muted task-date">
              <i className="bi bi-calendar3 me-1"></i>
              {formatDate(task.createdAt)}
            </small>
          </div>

          {/* Title */}
          <h5 className={`card-title task-title mb-2 ${task.status === "Completed" ? "text-decoration-line-through text-muted" : ""}`}>
            {task.title}
          </h5>

          {/* Description */}
          <p className="card-text task-description text-muted flex-grow-1">
            {task.description}
          </p>

          {/* Action Buttons */}
          <div className="d-flex gap-2 mt-3">
            <button
              className="btn btn-outline-primary btn-sm flex-fill"
              onClick={() => setShowModal(true)}
              title="Edit Task"
            >
              <i className="bi bi-pencil-fill me-1"></i>
              Edit
            </button>
            <button
              className="btn btn-outline-danger btn-sm flex-fill"
              onClick={() => setShowDeleteConfirm(true)}
              title="Delete Task"
            >
              <i className="bi bi-trash-fill me-1"></i>
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* ── Edit Modal ────────────────────────────────────────────────────────── */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-dialog-custom" onClick={(e) => e.stopPropagation()}>
            <div className="card shadow-lg border-0">
              <div className="card-header modal-header-custom d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <i className="bi bi-pencil-square me-2"></i>Edit Task
                </h5>
                <button className="btn-close btn-close-white" onClick={() => setShowModal(false)} />
              </div>
              <div className="card-body p-4">
                {/* Title */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Title <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    name="title"
                    className={`form-control ${editErrors.title ? "is-invalid" : ""}`}
                    value={editData.title}
                    onChange={handleEditChange}
                  />
                  {editErrors.title && <div className="invalid-feedback">{editErrors.title}</div>}
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Description <span className="text-danger">*</span></label>
                  <textarea
                    name="description"
                    rows={3}
                    className={`form-control ${editErrors.description ? "is-invalid" : ""}`}
                    value={editData.description}
                    onChange={handleEditChange}
                  />
                  {editErrors.description && <div className="invalid-feedback">{editErrors.description}</div>}
                </div>

                {/* Status */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Status</label>
                  <select
                    name="status"
                    className="form-select"
                    value={editData.status}
                    onChange={handleEditChange}
                  >
                    <option value="Pending">⏳ Pending</option>
                    <option value="Completed">✅ Completed</option>
                  </select>
                </div>

                {/* Buttons */}
                <div className="d-flex gap-2">
                  <button className="btn btn-secondary flex-fill" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button className="btn btn-primary flex-fill" onClick={handleSave} disabled={isSaving}>
                    {isSaving ? (
                      <><span className="spinner-border spinner-border-sm me-2" />Saving...</>
                    ) : (
                      <><i className="bi bi-check-lg me-1" />Save Changes</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirmation ────────────────────────────────────────────────── */}
      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="modal-dialog-custom modal-sm-custom" onClick={(e) => e.stopPropagation()}>
            <div className="card shadow-lg border-0">
              <div className="card-body text-center p-4">
                <div className="delete-icon-wrap mb-3">
                  <i className="bi bi-exclamation-triangle-fill text-warning fs-1"></i>
                </div>
                <h5 className="mb-2">Delete Task?</h5>
                <p className="text-muted mb-4">
                  Are you sure you want to delete <strong>"{task.title}"</strong>? This action cannot be undone.
                </p>
                <div className="d-flex gap-2 justify-content-center">
                  <button className="btn btn-secondary px-4" onClick={() => setShowDeleteConfirm(false)}>
                    Cancel
                  </button>
                  <button className="btn btn-danger px-4" onClick={handleDelete}>
                    <i className="bi bi-trash-fill me-1"></i>Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskCard;
