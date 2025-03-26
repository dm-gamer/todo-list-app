import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ API URLs
const TASKS_API_URL = "https://jsonplaceholder.typicode.com/todos?_limit=5";
const USERS_API_URL = "https://jsonplaceholder.typicode.com/users";

// ✅ Fetch Tasks with Real Usernames
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  // Fetch tasks
  const tasksResponse = await fetch(TASKS_API_URL);
  if (!tasksResponse.ok) {
    throw new Error("Failed to fetch tasks");
  }
  const tasks = await tasksResponse.json();

  // Fetch users
  const usersResponse = await fetch(USERS_API_URL);
  if (!usersResponse.ok) {
    throw new Error("Failed to fetch users");
  }
  const users = await usersResponse.json();

  // ✅ Assign random usernames from fetched users
  return tasks.map((task) => ({
    ...task,
    username: users[Math.floor(Math.random() * users.length)].username, // Random username
    priority: ["High", "Medium", "Low"][Math.floor(Math.random() * 3)], // Random priority
  }));
});

const taskSlice = createSlice({
  name: "tasks",
  initialState: { tasks: [], status: "idle", error: null },
  reducers: {
    addTask: (state, action) => {
      const { id, title, username, priority } = action.payload;
      state.tasks.push({ id, title, username, priority });
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// ✅ Export Actions and Reducer
export const { addTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
