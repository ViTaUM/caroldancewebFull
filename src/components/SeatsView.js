import styled from "styled-components";
import { useState, useEffect } from "react";
import SeatsList from "./SeatsList";
import FormUser from "./FormUser";
import Footer from "./Fotter";
import logo from "./logo.jpg";
import axios from "axios";

export default function SeatsView({ setBuyerData, overview, avulso }) {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFooterVisible, setIsFooterVisible] = useState(true); // Novo estado

  useEffect(() => {
    // Cria a configuração dos cabeçalhos para o Axios
    const config = {
      headers: {
        "Content-Type": "application/json",
        // "X-Requested-With": "XMLHttpRequest", // Adiciona o cabeçalho X-Requested-With
        // Exemplo: Adiciona um cabeçalho de autorização
        // 'Authorization': 'Bearer seu-token-aqui'
        // Adicione outros cabeçalhos conforme necessário
      },
    };

    // Faz uma chamada para o servidor backend para buscar os dados dos eventos usando Axios
    axios
      .get(
        "https://greenyellow-owl-992918.hostingersite.com/clientTicket/seat",
        config
      )
      .then((response) => {
        setSeats(response.data.data[overview]); // O Axios já faz o parse do JSON automaticamente
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar os assentos:", error);
      });
  }, [overview]);

  if (loading) {
    return <></>;
  }

  return (
    <SeatsContent>
      <div className="header">
        <h1>PALCO</h1>
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
          overview === 1 ? "11/12/2024 - SESSAO 1" : "11/12/2024 - SESSAO 2"
        }
        setIsFooterVisible={setIsFooterVisible}
        avulso={avulso}
      />
      {isFooterVisible && (
        <Footer>
          <img src={logo} alt="Logo" />
          <NameTime>
            <h3>O verdadeiro presente de Natal</h3>
            <p>
              11/12/2024 - quarta-feira às {overview === 1 ? "17:00" : "19:30"} horas
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
