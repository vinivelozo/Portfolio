import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login: React.FC<{ language: string; setToken: (token: string | null) => void }> = ({ language, setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }), // 🔹 Using "username" key to match backend
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
        localStorage.setItem("token", data.token);
        navigate("/"); // 🔹 Redirect to home page after login
      } else {
        setError(language === "en" ? "Invalid email or password" : "Email ou mot de passe invalide");
      }
    } catch (err) {
      console.error("Login error:", err); // 🔹 Log the error for debugging
      setError(language === "en" ? "Something went wrong. Try again." : "Une erreur s'est produite. Réessayez.");
    }
  };

  return (
    <div className="page login-page">
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">{language === "en" ? "Welcome Back" : "Bienvenue"}</h2>
          <p className="login-subtitle">
            {language === "en" ? "Please enter your credentials to log in" : "Veuillez entrer vos informations pour vous connecter"}
          </p>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">{language === "en" ? "Email" : "Email"}</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">{language === "en" ? "Password" : "Mot de passe"}</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-field"
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="login-button">
              {language === "en" ? "Log In" : "Se connecter"}
            </button>
            <p className="forgot-password">
              {language === "en" ? "Forgot your password?" : "Mot de passe oublié?"}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
