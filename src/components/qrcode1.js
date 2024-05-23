import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import Logo20anos from "./logo_qrcode.jpg";

function QRCode1() {
  const [data, setData] = useState({
    CPF: "",
    Nome: "",
    Assentos: [],
    Sessao: "",
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const CPF = urlParams.get("CPF") || "";
    const Nome = urlParams.get("Nome") || "";
    const Assentos = urlParams.get("Assentos")
      ? urlParams.get("Assentos").split(",")
      : [];
    const Sessao = urlParams.get("Sessao") || "";

    setData({
      CPF,
      Nome,
      Assentos,
      Sessao,
    });
  }, []);

  const baseURL = "https://carol-dance-web.netlify.app/qrcode?";
  const qrData = `${baseURL}CPF=${encodeURIComponent(
    data.CPF
  )}&Nome=${encodeURIComponent(data.Nome)}&Assentos=${encodeURIComponent(
    data.Assentos.join(",")
  )}&Sessao=${encodeURIComponent(data.Sessao)}`;

  // Define a cor de fundo com base no valor de Sessao
  const fgColor = data.Sessao === "1" ? "#a81947" : "#612d6d";

  const logo = Logo20anos; // URL do logo

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "20px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "inline-block",
          margin: "20px",
        }}
      >
        <h1 style={{ fontSize: "24px" }}>QR Code - Memórias 20 anos</h1>
        <QRCode
          value={qrData}
          size={256}
          bgColor={"#ffffff"}
          fgColor={fgColor}
          renderAs="svg"
          style={{ width: "100%", height: "auto" }}
        />
        <img
          src={logo}
          alt="logo"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "25%",
            height: "auto",
          }}
        />
      </div>
      <div
        style={{
          textAlign: "left",
          fontSize: "16px",
          maxWidth: "400px",
          lineHeight: "1.5",
          margin: "20px",
        }}
      >
        <h2>Informações do Cliente</h2>
        <form
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "5px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <div style={{ marginBottom: "10px" }}>
            <label style={{ fontSize: "18px", display: "block" }}>CPF: </label>
            <span style={{ fontWeight: "bold", fontSize: "18px" }}>
              {data.CPF}
            </span>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label style={{ fontSize: "18px", display: "block" }}>Nome: </label>
            <span style={{ fontWeight: "bold", fontSize: "18px" }}>
              {data.Nome}
            </span>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label style={{ fontSize: "18px", display: "block" }}>
              Assentos:{" "}
            </label>
            <span style={{ fontWeight: "bold", fontSize: "18px" }}>
              {data.Assentos.join(", ")}
            </span>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label style={{ fontSize: "18px", display: "block" }}>
              Sessão:{" "}
            </label>
            <span style={{ fontWeight: "bold", fontSize: "18px" }}>
              {data.Sessao}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default QRCode1;
