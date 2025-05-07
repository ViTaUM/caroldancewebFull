import styled from "styled-components";
import { useState, useEffect } from "react";
import SeatsList from "./SeatsList";
import FormUser from "./FormUser";
import Footer from "./Fotter";
import logo from "./logo.jpg";
import assentos from "../evento/assentos.json";

export default function SeatsView({ setBuyerData, overview, avulso }) {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFooterVisible, setIsFooterVisible] = useState(true);

  useEffect(() => {
    setSeats(assentos);
    setLoading(false);
  }, []);

  if (loading) {
    return <></>;
  }

  return (
    <SeatsContent>
      <div className="header">
        <h2>Selecione o(s) assento(s)</h2>
      </div>
      <SeatsList
        seats={seats}
        selectedSeats={selectedSeats}
        setSelectedSeats={setSelectedSeats}
      />
      <FormUser
        selectedSeats={selectedSeats}
        setBuyerData={setBuyerData}
        overview={
          overview === 1 ? "11/06/2025 - SESSAO 1" : "11/06/2025 - SESSAO 2"
        }
        setIsFooterVisible={setIsFooterVisible}
        avulso={avulso}
      />
      {isFooterVisible && (
        <Footer>
          <img src={logo} alt="Logo" />
          <NameTime>
            <h3>Broadway - O show vai começar!</h3>
            <p>
              11/06/2025 - quarta-feira às {overview === 1 ? "10:00" : "11:30"} horas
            </p>
          </NameTime>
        </Footer>
      )}
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
