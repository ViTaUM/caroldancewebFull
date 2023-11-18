import styled from "styled-components";
import { useState, useEffect } from "react";
import SeatsList from "./SeatsList";
import FormUser from "./FormUser";
import Footer from "./Fotter";
import logo from "./logo.jpg";
import Assentos from "../evento/assentos.json";
import axios from "axios";

export default function SeatsView({ setBuyerData, setSessionData }) {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    // Cria a configuração dos cabeçalhos para o Axios
    const config = {
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest", // Adiciona o cabeçalho X-Requested-With
        // Exemplo: Adiciona um cabeçalho de autorização
        // 'Authorization': 'Bearer seu-token-aqui'
        // Adicione outros cabeçalhos conforme necessário
      },
    };

    // Faz uma chamada para o servidor backend para buscar os dados dos eventos usando Axios
    axios
      .get("https://api-carol-dance-web-o5zr.vercel.app/assentos", config)
      .then((response) => {
        setSeats(response.data); // O Axios já faz o parse do JSON automaticamente
      })
      .catch((error) => {
        console.error("Erro ao buscar os assentos:", error);
      });
  }, []);

  return (
    <SeatsContent>
      <div class="header">
        <h1>PALCO</h1>
        <h2>Selecione o(s) assento(s)</h2>
      </div>
      <SeatsList
        seats={seats}
        selectedSeats={selectedSeats}
        setSelectedSeats={setSelectedSeats}
      />
      <FormUser selectedSeats={selectedSeats} setBuyerData={setBuyerData} />
      <Footer>
        <img src={logo} alt="Logo" />
        <NameTime>
          <h3>Descendentes</h3>
          <p>07/12/2023 - Quinta-feira às 19:30 horas</p>
        </NameTime>
      </Footer>
    </SeatsContent>
  );
}

const SeatsContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 60px;
  h1 {
    font-weight: bold;
    font-size: 24px;
  }
  h2 {
    font-size: 24px;
    color: #293845;
  }
  .header {
    justify-content: center;
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

const NameTime = styled.div`
  display: flex;
  flex-direction: column;

  p {
    margin-top: 10px;
  }
`;
