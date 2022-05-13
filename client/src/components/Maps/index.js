import React, { Component } from "react";

// OpenLayers imports
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { Circle as CircleStyle, Style, Fill, Stroke } from "ol/style";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import { fromLonLat, transform } from "ol/proj";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";

import { connect } from "react-redux";
import { Creators as LocationCreators } from "../../store/ducks/location";
import ReactLoading from "react-loading";

import { StyledMap } from "./styles";
import Button from "react-bootstrap/Button";

const RECENTER_DURATION = 1500;
const DEFAULT_ZOOM = 17;
const CIRCLE_RADIUS = 10;

class Maps extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  generateIsHerePoint(coords) {
    const feat = new Feature({
      geometry: new Point(fromLonLat(coords)),
    });

    const styledPoint = new Style({
      image: new CircleStyle({
        radius: CIRCLE_RADIUS,
        fill: new Fill({ color: "#FF5F00" }),
        stroke: new Stroke({ color: "#B20600", width: CIRCLE_RADIUS / 1.5 }),
      }),
    });

    feat.setStyle(styledPoint);
    return feat;
  }

  componentDidUpdate() {
    const { data } = this.props.location;

    if (data?.data) {
      const feat = this.generateIsHerePoint([data.data.lng, data.data.lat]);
      const options = {
        view: new View({
          center: fromLonLat([data.data.lng, data.data.lat]),
          zoom: DEFAULT_ZOOM,
        }),
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          new VectorLayer({
            source: new VectorSource({
              features: [feat],
            }),
          }),
        ],
        target: this.mapRef.current,
      };

      this.mapElement = new Map(options);
      this.mapElement.on("click", (event) => {
        const [lng, lat] = transform(
          event.coordinate,
          "EPSG:3857",
          "EPSG:4326"
        );
      });
    }
  }

  recenterMap() {
    const { data } = this.props.location;

    this.mapElement.getView().animate({
      center: fromLonLat([data.data.lng, data.data.lat]),
      zoom: DEFAULT_ZOOM,
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
