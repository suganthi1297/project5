import { useState, useEffect } from "react";
import Inventory from "./Inventory";
import "./styles.css";

function App() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    if (savedRole) setRole(savedRole);
  }, []);

  const handleLogin = (selectedRole) => {
    localStorage.setItem("role", selectedRole);
    setRole(selectedRole);
  };

  const handleLogout = () => {
    localStorage.removeItem("role");
    setRole(null);
  };

  if (!role) {
    return (
      <div className="login-container">
        <div className="login-card">
          <h2>Inventory System 🔐</h2>
          <button onClick={() => handleLogin("admin")}>Login as Admin</button>
          <button onClick={() => handleLogin("user")}>Login as User</button>
        </div>
      </div>
    );
  }

  return (
    <Inventory role={role} onLogout={handleLogout} />
  );
}

export default App;
