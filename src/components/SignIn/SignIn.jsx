import "./signIn.css";
import { IoMdClose, IoMdEye, IoMdEyeOff } from "react-icons/io";
import React, { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

export const SignIn = ({ sigInSidebar, setSignInSidebar, setUser }) => {
  // const API_URL = "https://fooddelivery-lzym.onrender.com";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [role, setRole] = useState(""); // seller / consumer
  const [mode, setMode] = useState("login"); // login / register
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  // 🔹 Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      setUser(data.user);
      setSignInSidebar(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Handle Register
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Register failed");

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      setUser(data.user);
      setSignInSidebar(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="sighn_sidebar"
      style={{ width: sigInSidebar ? "100%" : "0" }}
    >
      <div className="signIn_page">
        <h3>Authentication</h3>
        <div className="to_close" onClick={() => setSignInSidebar(false)}>
          <IoMdClose />
        </div>

        {/* Step 1 → Choose Role */}
        {!role ? (
          <div className="role-select">
            <h4>Are you a Seller or Consumer?</h4>
            <button className="role-btn" onClick={() => setRole("seller")}>
              I am a Seller
            </button>
            <button className="role-btn" onClick={() => setRole("consumer")}>
              I am a Consumer
            </button>
          </div>
        ) : (
          <>
            {/* Step 2 → Choose Mode */}
            <div className="auth-tabs">
              <button
                className={`tab-btn ${mode === "login" ? "active" : ""}`}
                onClick={() => setMode("login")}
              >
                Sign In
              </button>
              <button
                className={`tab-btn ${mode === "register" ? "active" : ""}`}
                onClick={() => setMode("register")}
              >
                Register
              </button>
            </div>

            {/* Step 3 → Show Form */}
            {mode === "login" ? (
              <form onSubmit={handleLogin}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="password-field">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                  <span className="toggle-password" onClick={togglePassword}>
                    {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                  </span>
                </div>

                <p className="role-display">Role: {role}</p>

                <button className="submit-btn" type="submit" disabled={loading}>
                  {loading ? "Processing..." : "Sign In"}
                </button>
                {error && <p className="error">{error}</p>}
              </form>
            ) : (
              <form onSubmit={handleRegister}>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
                <p className="role-display">Role: {role}</p>

                <button className="submit-btn" type="submit" disabled={loading}>
                  {loading ? "Processing..." : "Register"}
                </button>
                {error && <p className="error">{error}</p>}
              </form>
            )}

            <p
              className="back-link"
              onClick={() => {
                setRole("");
                setMode("login");
                setName("");
                setEmail("");
                setPassword("");
              }}
            >
              ⬅ Go Back
            </p>
          </>
        )}
      </div>
    </div>
  );
};
