import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import HomePageContent from "./HomePageContent";
import { AuthContext } from "./AuthContext";

export default class HomePage extends Component {
  static contextType = AuthContext;

  render() {
    const { isAuthenticated } = this.context;

    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    return <HomePageContent />;
  }
}
