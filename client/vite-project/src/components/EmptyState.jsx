/**
 * EmptyState Component
 * Shown when there are no tasks at all, or no tasks match the current filters.
 * Props:
 *  - type: "empty" | "noResults"
 */
const EmptyState = ({ type }) => {
  const isNoResults = type === "noResults";

  return (
    <div className="empty-state-container d-flex flex-column align-items-center justify-content-center py-5 text-center">
      {/* Illustration */}
      <div className="empty-illustration mb-4">
        {isNoResults ? (
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="56" fill="#EEF2FF" />
            <circle cx="52" cy="48" r="20" stroke="#6366F1" strokeWidth="4" fill="none" />
            <line x1="67" y1="63" x2="85" y2="81" stroke="#6366F1" strokeWidth="4" strokeLinecap="round" />
            <line x1="44" y1="44" x2="60" y2="52" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
          </svg>
        ) : (
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="56" fill="#EEF2FF" />
            <rect x="32" y="36" width="56" height="48" rx="8" fill="#C7D2FE" />
            <rect x="40" y="48" width="40" height="4" rx="2" fill="#6366F1" />
            <rect x="40" y="58" width="28" height="4" rx="2" fill="#A5B4FC" />
            <rect x="40" y="68" width="34" height="4" rx="2" fill="#A5B4FC" />
            <circle cx="82" cy="36" r="12" fill="#6366F1" />
            <line x1="82" y1="30" x2="82" y2="42" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="76" y1="36" x2="88" y2="36" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        )}
      </div>

      <h4 className="empty-title mb-2">
        {isNoResults ? "No Matching Tasks" : "No Tasks Yet"}
      </h4>
      <p className="empty-subtitle text-muted">
        {isNoResults
          ? "Try adjusting your search or filter to find what you're looking for."
          : "You haven't added any tasks yet. Create your first task above to get started!"}
      </p>
    </div>
  );
};

export default EmptyState;
