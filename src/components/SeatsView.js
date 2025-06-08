import styled from "styled-components";
import { useState, useEffect } from "react";
import SeatsList from "./SeatsList";
import FormUser from "./FormUser";
import Footer from "./Fotter";
import logo from "./logo.jpg";
import axios from "axios";
import cadeiranteImg from "../assets/cadeirante.png";

const PREFERENCIAL = [
  "B2", "B4", "B5", "B8", "B9", "B12", "B13", "B18"
];

export default function SeatsView({ setBuyerData, overview, avulso }) {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFooterVisible, setIsFooterVisible] = useState(true);

  useEffect(() => {
    axios
      .get(`https://h-simcepi.smsprefeiturasp.com.br/go/seat?session=${overview}`)
      .then((response) => {
        // Junta todos os arrays das propriedades em um único array
        const assentosObj = response.data;
        const assentosArray = Object.values(assentosObj).flat();
        const matrizAssentos = agruparAssentosPorFileira(assentosArray);
        setSeats(matrizAssentos);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar os assentos:", error);
      });
  }, [overview]);

  function agruparAssentosPorFileira(assentos) {
    const fileiras = {};
    assentos.forEach((assento) => {
      if (!fileiras[assento.letter]) fileiras[assento.letter] = [];
      fileiras[assento.letter].push(assento);
    });

    // Ordem das fileiras do fundo para frente (Q até A)
    const ordem = [
      "Q", "P", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A"
    ];
    return ordem.map((letra) =>
      (fileiras[letra] || []).sort((a, b) => a.id - b.id)
    );
  }

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
        cadeiranteImg={cadeiranteImg}
        preferenciais={PREFERENCIAL}
      />
      <FormUser
        selectedSeats={selectedSeats}
        setBuyerData={setBuyerData}
        overview={
          overview === 1 ? "15/06/2025 - SESSAO 1" : "15/06/2025 - SESSAO 2"
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
              15/06/2025 - domingo às {overview === 1 ? "10:00" : "11:30"} horas
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
  box-sizing: border-box;
  padding: 0 8px;

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

  @media (max-width: 768px) {
    margin-top: 30px;
    padding: 0 2px;
    width: 100vw;
    overflow-x: hidden;
  }
`;

const NameTime = styled.div`
  display: flex;
  flex-direction: column;

  p {
    margin-top: 10px;
  }
`;
