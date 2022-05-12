import React, { Component } from "react";

// OpenLayers imports
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";

import { connect } from "react-redux";
import { Creators as LocationCreators } from "../../store/ducks/location";
import ReactLoading from "react-loading";

import { StyledMap } from "./styles";
import Button from "react-bootstrap/Button";

const RECENTER_DURATION = 1500;
const DEFAULT_ZOOM = 17;

class Maps extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  componentDidUpdate() {
    const { data } = this.props.location;

    if (data?.data) {
      const options = {
        view: new View({
          center: fromLonLat([data.data.lng, data.data.lat]),
          zoom: DEFAULT_ZOOM,
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
  }

  recenterMap() {
    const { data } = this.props.location;

    this.mapElement.getView().animate({
      center: fromLonLat([data.data.lng, data.data.lat]),
      duration: RECENTER_DURATION,
    });
  }

  render() {
    const { loading, data } = this.props.location;

    return (
      <StyledMap ref={this.mapRef} id="map" className="map">
        {!loading ? (
          <Button
            onClick={() => (data?.data ? this.recenterMap() : null)}
            className="m-3 w-25"
            style={{ height: "4vh" }}
          >
            Recentralizar posição
          </Button>
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
      </StyledMap>
    );
  }
}

const mapStateToProps = ({ location }) => ({ location });

export default connect(mapStateToProps, { ...LocationCreators })(Maps);
