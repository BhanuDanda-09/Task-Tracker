import TaskCard from "./TaskCard";
import Loading from "./Loading";
import EmptyState from "./EmptyState";

/**
 * TaskList Component
 * Renders the grid of TaskCards or appropriate empty/loading states.
 * Props:
 *  - tasks: filtered/sorted array of task objects
 *  - loading: boolean
 *  - onDelete(id): callback
 *  - onUpdate(id, data): callback
 *  - totalCount: total task count (unfiltered) to distinguish empty DB vs no matches
 */
const TaskList = ({ tasks, loading, onDelete, onUpdate, totalCount }) => {
  if (loading) return <Loading />;

  if (tasks.length === 0 && totalCount === 0) {
    return <EmptyState type="empty" />;
  }

  if (tasks.length === 0) {
    return <EmptyState type="noResults" />;
  }

  return (
    <div className="row g-4">
      {tasks.map((task) => (
        <div key={task._id} className="col-12 col-sm-6 col-lg-4">
          <TaskCard task={task} onDelete={onDelete} onUpdate={onUpdate} />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
