import React, { Component } from "react";

import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { transform } from "ol/proj";

import { connect } from "react-redux";
import { Creators as LocationCreators } from "../../store/ducks/location";
import ReactLoading from "react-loading";

class Maps extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    const { data } = this.props.location;

    if (data?.data) {
      const options = {
        view: new View({
          center: transform(
            [data.data.lng, data.data.lat],
            "EPSG:4326",
            "EPSG:3857"
          ),
          zoom: 17,
        }),
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        controls: [],
        overlays: [],
        target: this.mapRef.current,
      };

      this.mapElement = new Map(options);
      this.mapElement.updateSize(900);
    }
  }

  render() {
    const { loading } = this.props.location;

    return (
      <>
        {!loading ? (
          <div ref={this.mapRef} style={{ width: 900, height: 900 }} />
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
