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
import { AuthProvider } from "./AuthContext"; 

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/join" element={<RoomJoinPage />} />
          <Route path="/create" element={<CreateRoomPage />} />
          <Route path="/users" element={<UserListPage />} />
          <Route path="/room/:roomCode/questions" element={<RoomQuestionsPage />} />
          <Route path="/room/:roomCode/question/add" element={<QuestionPage />} />
          <Route path="/create" element={user?.role === "enseignant" ? <CreateRoomPage /> : <Navigate to="/" />} />
          <Route path="/create" element={user?.role === "enseignant" ? <CreateRoomPage /> : <Navigate to="/" />} />
        <Route path="/join" element={user?.role === "élève" ? <RoomJoinPage /> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
