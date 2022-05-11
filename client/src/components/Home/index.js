import React, { Component } from "react";
import Maps from "../Maps";

import { connect } from "react-redux";
import { Creators as TransportCreators } from "../../store/ducks/transport";

import { StyledHome } from "./styles";
import { Form, Button, Table } from "react-bootstrap";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLineId: -1,
    };
  }

  renderLineInformation() {
    const { data } = this.props.transport;

    return (
      <>
        <h2>Horários de saída do terminal</h2>
        <Table
          striped
          bordered
          hover
          className="mt-3 w-75"
          style={{ textAlign: "center" }}
        >
          <thead>
            <tr>
              <th>Horário de saída</th>
              <th>Observação</th>
              <th>Dia da semana</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((element, index) => {
              let weekDay;
              switch (element.tipo_dia) {
                case "SAB":
                  weekDay = "Sábado";
                  break;
                case "DOM":
                  weekDay = "Domingo";
                  break;
                default:
                  weekDay = "Dias úteis";
                  break;
              }

              return (
                <tr key={index}>
                  <td>{element.horario_saida}</td>
                  <td>{element.observacao}</td>
                  <td>{weekDay}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </>
    );
  }

  render() {
    const { currentLineId } = this.state;
    const { getTransport } = this.props;

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
          className="mb-5"
        >
          Buscar
        </Button>
        {this.renderLineInformation()}
      </StyledHome>
    );
  }
}

const mapStateToProps = ({ transport }) => ({ transport });

export default connect(mapStateToProps, { ...TransportCreators })(Home);
