import React, { Component } from "react";
import Maps from "../Maps";

import { connect } from "react-redux";
import { Creators as TransportCreators } from "../../store/ducks/transport";

import {
  StyledHome,
  StyledTitleTable,
  StyledNameAndValue,
  NameLine,
  TableElement,
  ObsTable,
} from "./styles";
import { Form, Button, Table } from "react-bootstrap";
import ReactLoading from "react-loading";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import {
  tarifas,
  grandeRecifeLinesUrl,
  weekDayOptions,
} from "../../utils/constants";
import {
  formatMoney,
  noBreakLineSpace,
  createNewArrayFromArrayOfObject,
  divideArray,
} from "../../utils/misc";
import { doGet } from "../../utils/httpFunctions";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLineId: -1,
      filterWeekDay: "",
      showTable: false,
      lineInfoRecife: [],
    };
  }

  componentDidMount() {
    const input = document.getElementById("inputLineId");
    input.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("searchLineBtn").click();
      }
    });

    doGet(grandeRecifeLinesUrl)
      .then((data) => this.setState({ lineInfoRecife: data }))
      .catch((err) => console.error(err));
  }

  resetState = (element) => {
    this.setState({
      currentLineId: element.target.value.split(" - ")[0],
      showTable: false,
      filterWeekDay: "",
    });
  };

  handleSearchClick = () => {
    this.props.getTransport(this.state.currentLineId);
    this.setState({ showTable: true });
  };

  renderLineInformation() {
    const { loading, data } = this.props.transport;
    const { filterWeekDay, currentLineId, lineInfoRecife } = this.state;

    if (data?.data && lineInfoRecife) {
      const local = lineInfoRecife.find(
        (e) => e.codigo_linha === currentLineId.toString()
      );

      if (!local) return <h1>Código incorreto, tente novamente!</h1>;

      const arrayByTypeOfDay = [
        createNewArrayFromArrayOfObject(data.data, "tipo_dia", "DUT"),
        createNewArrayFromArrayOfObject(data.data, "tipo_dia", "SAB"),
        createNewArrayFromArrayOfObject(data.data, "tipo_dia", "DOM"),
      ];

      let valor;
      try {
        valor = tarifas[local.tarifa_linha];
      } catch {
        valor = "Preço indisponível";
      }

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
              {arrayByTypeOfDay.map((element, index) => {
                let weekDay;
                switch (index) {
                  case 2:
                    weekDay = "Domingo";
                    break;
                  case 0:
                    weekDay = "Dias úteis";
                    break;
                  default:
                    weekDay = "Sábado";
                    break;
                }
                if (
                  !filterWeekDay ||
                  filterWeekDay === "todos" ||
                  weekDay === filterWeekDay
                ) {
                  const dividedArr = divideArray(element);
                  if (element.length)
                    return (
                      <>
                        <h3 className="p-3">{weekDay}</h3>
                        <Table
                          bordered
                          hover
                          className="mt-3"
                          style={{
                            textAlign: "center",
                            borderCollapse: "unset",
                            width: "64%",
                          }}
                          key={index}
                        >
                          <tbody className="p-3">
                            {dividedArr.map((e, i) => (
                              <td key={i}>
                                {e.map((el, idx) => {
                                  return (
                                    <TableElement key={idx}>
                                      {el.observacao ? (
                                        <Popup
                                          trigger={
                                            <Button
                                              variant="outline-warning"
                                              style={{
                                                border: "none",
                                              }}
                                            >
                                              {el.horario_saida
                                                ? el.horario_saida
                                                : "Horário indisponível"}
                                            </Button>
                                          }
                                          position="right center"
                                        >
                                          <p>{el.observacao}</p>
                                        </Popup>
                                      ) : (
                                        <p>
                                          {el.horario_saida
                                            ? el.horario_saida
                                            : "Horário indisponível"}
                                        </p>
                                      )}
                                    </TableElement>
                                  );
                                })}
                              </td>
                            ))}
                          </tbody>
                        </Table>
                      </>
                    );
                  else
                    return (
                      <h3 className="p-4" style={{ color: "#630606" }}>
                        Essa linha não funciona aos {weekDay + "s"}
                      </h3>
                    );
                } else return null;
              })}
            </>
          ) : (
            <ReactLoading type={"spin"} style={{ width: "10%" }} />
          )}
          <ObsTable>
            <li>
              Os horários em feriados geralmente seguem o mesmo padrão dos
              Domingos.
            </li>
            <li>Horários em amarelo contém observações. Clique para ver!</li>
          </ObsTable>
        </>
      );
    }
  }

  render() {
    const { showTable, lineInfoRecife } = this.state;

    return (
      <StyledHome className="mb-5">
        <Maps />
        <Form className="w-50 m-2">
          <Form.Group className="mb-1">
            <Form.Label style={{ fontSize: "1.5em" }}>
              Buscar por linha
            </Form.Label>
            <Form.Control
              type="search"
              placeholder="Linha do transporte"
              onChange={this.resetState}
              style={{ height: 50 }}
              id="inputLineId"
              name="selectLine"
              list="lineOptions"
            />
            <datalist id="lineOptions">
              {lineInfoRecife?.map((element, index) => (
                <option
                  value={element.codigo_linha + " - " + element.descricao_linha}
                  key={index}
                />
              ))}
            </datalist>
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
