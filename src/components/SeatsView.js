import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate
import SeatsList from "./SeatsList";
import FormUser from "./FormUser";
import Footer from "./Fotter";
import logo from "./logo.jpg";
import axios from "axios";

export default function SeatsView({ setBuyerData, overview, avulso }) {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFooterVisible, setIsFooterVisible] = useState(true);
  const [showModal, setShowModal] = useState(true); // Estado para o modal
  const navigate = useNavigate(); // Hook para navegação

  useEffect(() => {
    // Exibe o modal e redireciona após 3 segundos
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false); // Fecha o modal
        navigate("/"); // Redireciona para a página inicial (ou outra página desejada)
      }, 3000); // 3 segundos de exibição

      return () => clearTimeout(timer); // Limpa o timer ao desmontar o componente
    }
  }, [showModal, navigate]);

  useEffect(() => {
    // Cria a configuração dos cabeçalhos para o Axios
    const config = {
      headers: {
        "Content-Type": "application/json",
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
      {showModal && (
        <Modal>
          <ModalContent>
            <h2>Atenção</h2>
            <p>O sistema será liberado a partir de 12 horas!</p>
          </ModalContent>
        </Modal>
      )}
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

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 40px;
  border-radius: 8px;
  text-align: center;
  width: 80%;
  max-width: 600px;
  h2 {
    margin-bottom: 20px;
    font-size: 2em;
  }
  p {
    margin-bottom: 30px;
    font-size: 1.2em;
  }
`;
