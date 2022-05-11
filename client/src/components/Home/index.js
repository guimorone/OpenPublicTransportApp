import React, { Component } from "react";
import Maps from "../Maps";

import { connect } from "react-redux";
import { Creators as TransportCreators } from "../../store/ducks/transport";
import ReactLoading from "react-loading";

import { StyledHome } from "./styles";
import { Form, Button } from "react-bootstrap";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLineId: -1,
    };
  }

  render() {
    const { currentLineId } = this.state;
    const { transport, getTransport } = this.props;
    const { loading, data } = transport;

    return (
      <StyledHome className="mb-5">
        <Maps />
        <Form className="w-50 m-2">
          <Form.Group className="mb-1" controlId="transport_line">
            <Form.Label style={{ fontSize: "1.5em" }}>
              Buscar por linha
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="Linha do transporte"
              onChange={(element) =>
                this.setState({ currentLineId: element.target.value })
              }
              style={{ height: 50 }}
            />
            <Form.Text style={{ color: "#faedc6" }}>Apenas números</Form.Text>
          </Form.Group>
        </Form>
        <Button
          variant="primary"
          onClick={() => getTransport(currentLineId)}
          style={{ height: "5vh", width: "10vw" }}
        >
          Buscar
        </Button>
      </StyledHome>
    );
  }
}

const mapStateToProps = ({ transport }) => ({ transport });

export default connect(mapStateToProps, { ...TransportCreators })(Home);
