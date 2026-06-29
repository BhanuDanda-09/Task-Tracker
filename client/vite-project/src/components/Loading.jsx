/**
 * Loading Component
 * Animated loading spinner shown while fetching tasks.
 */
const Loading = () => {
  return (
    <div className="loading-container d-flex flex-column align-items-center justify-content-center py-5">
      {/* Spinner */}
      <div className="loading-spinner-wrap mb-4">
        <div className="spinner-ring"></div>
        <div className="spinner-ring-inner"></div>
      </div>
      <p className="loading-text">Loading your tasks...</p>
      <small className="loading-sub text-muted">Fetching from the server</small>
    </div>
  );
};

export default Loading;
