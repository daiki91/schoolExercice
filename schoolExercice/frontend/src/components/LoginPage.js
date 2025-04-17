// frontend/src/LoginPage.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.message);
        return;
      }

      const user = await res.json();
      login(user);
      navigate(user.role === "enseignant" ? "/create" : "/join");
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la connexion.");
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      <input placeholder="Nom" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Se connecter</button>
    </div>
  );
}
