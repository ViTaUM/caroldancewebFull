import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import Logo20anos from "./logo_qrcode.jpg";

function QRCode2() {
  const [data, setData] = useState({
    CPF: "",
    Nome: "",
    Assentos: [],
    Sessao: "",
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const CPF = urlParams.get("CPF") || "";
    const Nome = urlParams.get("NOME") || "";
    const Assentos = urlParams.get("ASSENTOS") ? urlParams.get("ASSENTOS").split(",") : [];
    const Sessao = urlParams.get("SESSAO") || "";

    setData({
      CPF,
      Nome,
      Assentos,
      Sessao,
    });
  }, []);

  const baseURL = "https://carol-dance-web.netlify.app/qrcode?";
  const qrData = `${baseURL}CPF=${encodeURIComponent(data.CPF)}&Nome=${encodeURIComponent(data.Nome)}&Assentos=${encodeURIComponent(data.Assentos.join(","))}&Sessao=${encodeURIComponent(data.Sessao)}`;

  const logo = Logo20anos; // URL do logo

  return (
    <div style={{ textAlign: "center", marginTop: "50px", display: "flex", justifyContent: "center" }}>
      <div style={{ position: "relative", display: "inline-block", marginRight: "50px" }}>
        <h1>QR Code - Memórias 20 anos</h1>
        <QRCode
          value={qrData}
          size={256}
          bgColor={"#ffffff"}
          fgColor={"#612d6d"}
          renderAs="svg"
        />
        <img
          src={logo}
          alt="logo"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100px",
            height: "80px",
          }}
        />
      </div>
      <div style={{ textAlign: "left", fontSize: "16px", maxWidth: "900px", lineHeight: "1.5" }}>
        <h2>Informações do Cliente</h2>
        <form style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "5px", backgroundColor: "#f9f9f9" }}>
          <div style={{ marginBottom: "10px" }}>
            <label style={{ fontSize: "25px" }}>CPF: </label>
            <span style={{ fontWeight: "bold", fontSize: "25px" }}>{data.CPF}</span>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label style={{ fontSize: "25px" }}>Nome: </label>
            <span style={{ fontWeight: "bold", fontSize: "25px" }}>{data.Nome}</span>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label style={{ fontSize: "25px" }}>Assentos: </label>
            <span style={{ fontWeight: "bold", fontSize: "25px" }}>{data.Assentos.join(", ")}</span>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label style={{ fontSize: "25px" }}>Sessão: </label>
            <span style={{ fontWeight: "bold", fontSize: "25px" }}>{data.Sessao}</span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default QRCode2;
