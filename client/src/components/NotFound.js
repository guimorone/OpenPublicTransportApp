import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function NotFound() {
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        top: "45%",
        left: "0",
        right: "0",
        margin: "auto",
      }}
    >
      <h1 className="font-weight-bold">PAGE NOT FOUND</h1>
      <h2>Parece que não podemos carregar essa página ☹</h2>
      <Link to="/home" className="m-2">
        <Button style={{ height: 40, width: 200 }}>
          Voltar&nbsp;à&nbsp;página&nbsp;inicial
        </Button>
      </Link>
    </div>
  );
}
