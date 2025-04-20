import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./HomePage";
import CreateRoomPage from "./CreateRoomPage";
import RoomJoinPage from "./RoomJoinPage";
import RoomQuestionsPage from "./RoomQuestionsPage";
import QuestionPage from "./QuestionPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import UserListPage from "./UserListPage";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "./AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
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
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <UserListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/room/:roomCode/questions"
            element={
              <ProtectedRoute>
                <RoomQuestionsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/room/:roomCode/question/add"
            element={
              <ProtectedRoute>
                <QuestionPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
