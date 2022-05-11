import React, { Component } from "react";
import { StyledHeader } from "./styles";

import { connect } from "react-redux";
import { Creators as LocationCreators } from "../../store/ducks/location";
import ReactLoading from "react-loading";

import { getCurrentCoords } from "../../utils/misc";

class Header extends Component {
  componentDidMount() {
    getCurrentCoords((pos) =>
      this.props.getLocation({
        lat: pos.coords.latitude.toString(),
        lng: pos.coords.longitude.toString(),
      })
    );
  }

  render() {
    const { loading, data } = this.props.location;

    return (
      <StyledHeader>
        <h2>Open Public Transport App</h2>
        {!loading ? (
          data?.data ? (
            <h3>
              Localização atual:&nbsp;{data.data.city + " - " + data.data.state}
            </h3>
          ) : null
        ) : (
          <ReactLoading type={"spin"} style={{ width: "6.5%" }} />
        )}
      </StyledHeader>
    );
  }
}

const mapStateToProps = ({ location }) => ({ location });

export default connect(mapStateToProps, { ...LocationCreators })(Header);
