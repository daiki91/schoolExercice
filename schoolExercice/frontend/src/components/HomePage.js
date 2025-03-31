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
}
