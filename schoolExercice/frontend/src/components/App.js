<<<<<<< HEAD
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
import { AuthProvider } from "./AuthContext"; // Auth context

const App = () => {
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
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
=======
import React, {Component} from "react";
import {render} from "react-dom";
import HomePage from "./HomePage";
// import RoomJoinPage from "./RoomJoinPage";
// import CreateRoomPage from "./CreateRoomPage";


export default class App extends Component {
    constructor(props){
        super(props);
    }
    render(){
        // return <h1>Testing React Code/ website </h1>;
        return (
            <div>
                <HomePage/>
        </div>
        );
    }
}

const  appDiv = document.getElementById("app");
render(<App/>, appDiv);
>>>>>>> ccf2c0db (Premier commit)
