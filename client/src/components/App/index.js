import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import RouteOptions from "../routes";
import ReduxToastr from "react-redux-toastr";

import { StyledApp } from "./styles";

import "react-redux-toastr/lib/css/react-redux-toastr.min.css";

class App extends Component {
  render() {
    return (
      <StyledApp>
        <BrowserRouter>
          <RouteOptions />
        </BrowserRouter>
        <ReduxToastr
          timeOut={4000}
          preventDuplicates
          position="top-right"
          getState={(state) => state.toastr} // This is the default
          progressBar
          closeOnToastrClick
        />
      </StyledApp>
    );
  }
}

export default App;
