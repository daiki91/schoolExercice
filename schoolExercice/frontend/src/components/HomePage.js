<<<<<<< HEAD
// HomePage.js
import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import QuestionPage from "./QuestionPage";
import HomePageContent from "./HomePageContent";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage"; // ✅ NOUVEAU
import ProtectedRoute from "./ProtectedRoute"; // Import du composant de route protégée

export default class HomePage extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePageContent />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* Ces routes sont protégées : l'utilisateur doit être connecté */}
          <Route
            path="/join"
            element={
              <ProtectedRoute>
                <RoomJoinPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateRoomPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/question"
            element={
              <ProtectedRoute>
                <QuestionPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    );
  }
=======
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes, Switch,Link,redirect  } from "react-router-dom";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<p>This is the home page</p>} />
                    <Route path="/join" element={<RoomJoinPage />} />
                    <Route path="/create" element={<CreateRoomPage />} />
                </Routes>
            </Router>
        );
    }
>>>>>>> ccf2c0db (Premier commit)
}
