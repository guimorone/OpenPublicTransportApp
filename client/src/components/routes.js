import React, { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Home from "./Home";

class RouteOptions extends Component {
  render() {
    return (
      <>
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route path="/" element={<Navigate replace to="/home" />} />
        </Routes>
      </>
    );
  }
}

export default RouteOptions;
