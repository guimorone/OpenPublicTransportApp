import React, { Component } from "react";
import { StyledHeader } from "./styles";

import { connect } from "react-redux";
import { Creators as LocationCreators } from "../../store/ducks/location";
import ReactLoading from "react-loading";

class Header extends Component {
  componentDidMount() {
    this.props.getLocation({ lat: 10, lng: 11 });
  }

  render() {
    return (
      <StyledHeader>
        <h2>Open Public Transport App</h2>
      </StyledHeader>
    );
  }
}

const mapStateToProps = ({ location }) => ({ location });

export default connect(mapStateToProps, { ...LocationCreators })(Header);
