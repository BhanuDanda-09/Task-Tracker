/**
 * Filter Component
 * Dropdown to filter tasks by status.
 * Props:
 *  - filter: "All" | "Pending" | "Completed"
 *  - onFilterChange(value): callback
 */
const Filter = ({ filter, onFilterChange }) => {
  const options = [
    { value: "All", label: "All Tasks", icon: "bi-collection-fill" },
    { value: "Pending", label: "Pending", icon: "bi-clock-fill" },
    { value: "Completed", label: "Completed", icon: "bi-check-circle-fill" },
  ];

  return (
    <div className="filter-wrap">
      <label className="filter-label" htmlFor="filter-select">
        <i className="bi bi-funnel-fill me-1"></i>Filter
      </label>
      <select
        id="filter-select"
        className="form-select filter-select"
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
