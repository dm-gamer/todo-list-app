import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import "./TaskManager.css";

const TaskManager = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="task-manager-container">
      <div className="task-manager-content">
        <h2 className="task-title">Welcome, {user.username}!</h2>
        <TaskInput />
        <TaskList />
        <button className="logout-btn" onClick={() => dispatch(logout())}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default TaskManager;