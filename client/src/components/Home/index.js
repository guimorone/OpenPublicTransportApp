import React, { Component } from "react";
import Maps from "../Maps";

import { connect } from "react-redux";
import { Creators as TransportCreators } from "../../store/ducks/transport";

import {
  StyledHome,
  StyledTitleTable,
  StyledNameAndValue,
  NameLine,
} from "./styles";
import { Form, Button, Table } from "react-bootstrap";

import ReactLoading from "react-loading";

import { lineInfoRecife, tarifas } from "../../utils/constants";
import { formatMoney, noBreakLineSpace } from "../../utils/misc";

const weekDayOptions = ["Sábado", "Domingo", "Dias úteis"];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLineId: -1,
      filterWeekDay: "",
      showTable: false,
    };
  }

  handleSearchClick = () => {
    this.props.getTransport(this.state.currentLineId);
    this.setState({ showTable: true });
  };

  componentDidMount() {
    const input = document.getElementById("inputLineId");
    input.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("searchLineBtn").click();
      }
    });
  }

  renderLineInformation() {
    const { loading, data } = this.props.transport;
    const { filterWeekDay, currentLineId } = this.state;

    if (data?.data) {
      const local = lineInfoRecife.find(
        (e) => e.codigo_linha === currentLineId.toString()
      );

      if (!local) return <h1>Código incorreto, tente novamente!</h1>;

      let valor;
      try {
        valor = tarifas[local.tarifa_linha];
      } catch {
        valor = "Preço indisponível";
      }

      // \u00A0 == &nbsp;
      return (
        <>
          {!loading ? (
            <>
              <StyledNameAndValue>
                <NameLine>
                  {local?.descricao_linha
                    ? noBreakLineSpace(local.descricao_linha)
                    : null}
                </NameLine>
                <h3>
                  {valor !== "Preço indisponível" ? formatMoney(valor) : valor}
                </h3>
              </StyledNameAndValue>
              <StyledTitleTable>
                <h2>Horários&nbsp;de&nbsp;saída&nbsp;do&nbsp;terminal</h2>
                <Form.Select
                  style={{ width: "20vw" }}
                  onChange={(element) =>
                    this.setState({ filterWeekDay: element.target.value })
                  }
                >
                  <option key="default" value="todos">
                    Todos os dias
                  </option>
                  {weekDayOptions.map((element, index) => (
                    <option key={index} value={element}>
                      {element}
                    </option>
                  ))}
                </Form.Select>
              </StyledTitleTable>
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
                    if (
                      !filterWeekDay ||
                      filterWeekDay === "todos" ||
                      weekDay === filterWeekDay
                    )
                      return (
                        <tr key={index}>
                          <td>
                            {element.horario_saida
                              ? element.horario_saida
                              : "Horário indisponível"}
                          </td>
                          <td>{element.observacao}</td>
                          <td>{weekDay}</td>
                        </tr>
                      );
                  })}
                </tbody>
              </Table>
            </>
          ) : (
            <ReactLoading type={"spin"} style={{ width: "10%" }} />
          )}
        </>
      );
    }
  }

  render() {
    const { showTable } = this.state;

    return (
      <StyledHome className="mb-5">
        <Maps />
        <Form className="w-50 m-2">
          <Form.Group className="mb-1">
            <Form.Label style={{ fontSize: "1.5em" }}>
              Buscar por linha
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="Linha do transporte"
              onChange={(element) =>
                this.setState({
                  currentLineId: element.target.value,
                  showTable: false,
                })
              }
              style={{ height: 50 }}
              id="inputLineId"
            />
            <Form.Text style={{ color: "#faedc6" }}>Apenas números</Form.Text>
          </Form.Group>
        </Form>
        <Button
          variant="primary"
          onClick={this.handleSearchClick}
          style={{ height: "5vh", width: "10vw" }}
          className="mb-5"
          id="searchLineBtn"
        >
          Buscar
        </Button>
        {showTable ? this.renderLineInformation() : null}
      </StyledHome>
    );
  }
}

const mapStateToProps = ({ transport }) => ({ transport });

export default connect(mapStateToProps, { ...TransportCreators })(Home);
