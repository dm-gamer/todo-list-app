import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/taskSlice";
import { v4 as uuidv4 } from "uuid";

const TaskInput = () => {
  const [username, setUsername] = useState(""); // 🔹 New input for username
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium"); // 🔹 Default priority

  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (task.trim() !== "" && username.trim() !== "") {
      dispatch(addTask({ id: uuidv4(), username, title: task, priority }));
      setUsername(""); // ✅ Clear input fields
      setTask("");
      setPriority("Medium");
    }
  };

  return (
    <div className="task-input">
      <input
        type="text"
        placeholder="Enter your name..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default TaskInput;
