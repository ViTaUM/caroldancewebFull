import styled from "styled-components";
import { useState, useEffect } from "react";
import SeatsList from "./SeatsList";
import SeatsSubtitle from "./SeatsSubtitle";
import FormUser from "./FormUser";
import Footer from "./Fotter";
import logo from "./logo.jpg";
import Assentos from "../evento/assentos.json";

export default function SeatsView({ setBuyerData, setSessionData }) {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    // Definindo os filmes com os dados importados do JSON
    setSeats(Assentos);
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
