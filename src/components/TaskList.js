import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, fetchTasks } from "../redux/taskSlice";

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, status, error } = useSelector((state) => state.tasks);

  // Fetch tasks when the component mounts
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (status === "loading") return <p>Loading tasks...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  // 🔹 Sorting tasks based on priority order (High > Medium > Low)
  const priorityOrder = { High: 1, Medium: 2, Low: 3 };
  const sortedTasks = [...tasks].sort((a, b) => {
    return (priorityOrder[a.priority] || 4) - (priorityOrder[b.priority] || 4);
  });

  return (
    <div className="task-list">
      <h2>Task List</h2>
      {sortedTasks.map((task) => (
        <div key={task.id} className={`task-card ${task.priority?.toLowerCase()}`}>
          <p><strong>User:</strong> {task.username || "Unknown"}</p> {/* ✅ Fixed */}
          <p><strong>Task:</strong> {task.title}</p>
          <p><strong>Priority:</strong> {task.priority || "Not Set"}</p> {/* ✅ Handle missing priority */}
          <button className="delete-btn" onClick={() => dispatch(deleteTask(task.id))}>
            ❌ Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
