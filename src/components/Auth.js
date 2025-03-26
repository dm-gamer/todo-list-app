import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, login, logout } from "../redux/authSlice";
// 🔹 Import CSS for styling

const AuthForm = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login"); // 🔹 Toggle between login & register

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "register") {
      dispatch(register({ username, password }));
      alert("Registration successful! Please log in.");
    } else {
      dispatch(login({ username, password }));
    }
    setUsername("");
    setPassword("");
  };
  return (
    <div className="auth-container">
      {isAuthenticated ? (
        <div className="welcome-box">
          <h2>Welcome, {user.username}! 🎉</h2>
          <button className="logout-btn" onClick={() => dispatch(logout())}>
            Logout
          </button>
        </div>
      ) : (
        <div className="auth-box">
          <h2>{mode === "login" ? "Login" : "Register"}</h2>
          <form onSubmit={handleSubmit}>
            {mode === "register" && (
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            )}
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="auth-btn">
              {mode === "login" ? "Login" : "Register"}
            </button>
          </form>
          <p onClick={() => setMode(mode === "login" ? "register" : "login")} className="toggle-text">
            {mode === "login" ? "New user? Register here!" : "Already registered? Login here!"}
          </p>
        </div>
      )}
    </div>
  );
  
};

export default AuthForm;
