import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // ✅ Import du hook d'authentification

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("eleve");
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ Récupération de la fonction login du contexte

  const handleRegister = async () => {
    try {
      const res = await fetch("/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.message);
        return;
      }

      const user = await res.json();

      // ✅ Met à jour le contexte d'authentification
      login({ username: user.username, role: user.role });

      // ✅ Redirige selon le rôle
      navigate(role === "enseignant" ? "/create" : "/join");
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'inscription.");
    }
  };

  return (
    <div>
      <h2>Inscription</h2>
      <input
        placeholder="Nom"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="eleve">Élève</option>
        <option value="enseignant">Enseignant</option>
      </select>
      <button onClick={handleRegister}>S'inscrire</button>

      <div style={{ marginTop: "1rem" }}>
        <p>
          Déjà un compte ? <a href="/login">Se connecter</a>
        </p>
      </div>
    </div>
  );
}
