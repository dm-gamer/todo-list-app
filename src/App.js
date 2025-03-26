import React, { useState } from "react";
import { Provider, useSelector } from "react-redux";
import store from "./redux/store";
import Register from "./components/Register";
import Login from "./components/Login";
import TaskManager from "./components/TaskManager";
import "./styles.css";

const AppContent = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [view, setView] = useState("register");

  if (isAuthenticated) {
    return <TaskManager />;
  }

  return view === "register" ? <Register setView={setView} /> : <Login setView={setView} />;
};

const App = () => {
  return (
    <Provider store={store}>
      <div className="app">
        
        <AppContent />
      </div>
    </Provider>
  );
};

export default App;
