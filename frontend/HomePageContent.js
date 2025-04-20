import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default class HomePageContent extends Component {
  static contextType = AuthContext;

  render() {
    const { isAuthenticated, logout, user } = this.context;
    {user?.role === "enseignant" && (
      <>
          <Link to="/create">
              <button className="homepage-button">Créer une salle</button>
          </Link>
          <Link to="/users">
              <button className="homepage-button">Gérer les utilisateurs</button>
          </Link>
      </>
  )}
  
  {user?.role === "élève" && (
      <Link to="/join">
          <button className="homepage-button">Rejoindre une salle</button>
      </Link>
  )}
  
    return (
      <div className="homepage-container">
        <h2 className="homepage-title">Bienvenue sur SchoolExercice</h2>
        <p className="homepage-subtitle">Choisissez une action :</p>

        <div className="button-group">
          {!isAuthenticated ? (
            <>
              <Link to="/register">
                <button className="homepage-button">S'inscrire</button>
              </Link>
              <Link to="/login">
                <button className="homepage-button">Se connecter</button>
              </Link>
            </>
          ) : (
            <>
              <p>Connecté en tant que <strong>{user?.username}</strong> ({user?.role})</p>
              <Link to="/join">
                <button className="homepage-button">Rejoindre une salle</button>
              </Link>
              <Link to="/create">
                <button className="homepage-button">Créer une salle</button>
              </Link>
              <Link to="/question">
                <button className="homepage-button">Questions à choix multiples</button>
              </Link>
              <button onClick={logout} className="homepage-button red">
                Se déconnecter
              </button>
            </>
          )}
        </div>
      </div>
    );
  }
}
