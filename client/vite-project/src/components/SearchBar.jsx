/**
 * SearchBar Component
 * Controlled input for searching tasks by title.
 * Props:
 *  - value: string – current search term
 *  - onChange(value): callback
 */
const SearchBar = ({ value, onChange }) => {
  return (
    <div className="search-bar-wrap">
      <div className="input-group search-input-group">
        <span className="input-group-text search-icon-wrap">
          <i className="bi bi-search search-icon"></i>
        </span>
        <input
          id="search-tasks"
          type="text"
          className="form-control search-input"
          placeholder="Search tasks by title..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Search tasks"
        />
        {value && (
          <button
            className="btn search-clear-btn"
            type="button"
            onClick={() => onChange("")}
            title="Clear search"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
