import React, { Component } from "react";

import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";

import { connect } from "react-redux";
import { Creators as LocationCreators } from "../../store/ducks/location";
import ReactLoading from "react-loading";

import { StyledMap } from "./styles";

class Maps extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  componentDidUpdate() {
    const { data } = this.props.location;

    const options = {
      view: new View({
        center: fromLonLat([
          data?.data ? data.data.lng : -30,
          data?.data ? data.data.lat : -8,
        ]),
        zoom: 17,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: this.mapRef.current,
    };

    this.mapElement = new Map(options);
  }

  render() {
    const { loading } = this.props.location;

    return (
      <>
        {!loading ? (
          <StyledMap ref={this.mapRef} />
        ) : (
          <ReactLoading
            type={"spin"}
            style={{
              position: "absolute",
              width: "15vw",
              top: "40%",
              left: "0",
              right: "0",
              margin: "auto",
            }}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = ({ location }) => ({ location });

export default connect(mapStateToProps, { ...LocationCreators })(Maps);
