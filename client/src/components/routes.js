import React, { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Home from "./Home";
import Header from "./Header";
import NotFound from "./NotFound";
import Footer from "./Footer";

class RouteOptions extends Component {
  render() {
    return (
      <>
        <Header />
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </>
    );
  }
}

export default RouteOptions;
