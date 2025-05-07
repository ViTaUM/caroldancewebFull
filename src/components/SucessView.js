import styled from "styled-components";
import SucessPurchase from "./SucessPurchase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SucessView({ buyerData }) {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(300);

  function AddWhatsApp() {
    const whatsappURL = "https://wa.me/5571986904826";
    window.open(whatsappURL, "_blank"); // Abre em uma nova aba
  }

  function ReturnHome() {
    alert(
      "Assim que seu pagamento for confirmado, você receberá um e-mail! Obrigado!"
    );
  }

  function CloseAndGoHome() {
    navigate("/");
  }

  useEffect(() => {
    if (timeLeft === 0) navigate("/", { replace: true });
    const timer = setInterval(() => setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, navigate]);

  useEffect(() => {
    if (!buyerData || Object.keys(buyerData).length === 0) {
      navigate("/", { replace: true });
    }
  }, [buyerData, navigate]);

  function formatTime(seconds) {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  }

  return (
      <SucessContent>
      <TimerBox>
        <span>Tempo para finalizar</span>
        <Timer>{formatTime(timeLeft)}</Timer>
      </TimerBox>
        <SucessMessage>Pedido realizado com sucesso!</SucessMessage>
        <TextInfo>
          <p>
            Recebemos seu pedido com sucesso e estamos aguardando o pagamento do
            pix e o envio do comprovante de pagamento via WhatsApp:{" "}
            <a href="https://wa.me/5571986904826" style={{ cursor: "pointer" }}>
              (71) 98690-4826.
            </a>
          </p>
        </TextInfo>
        <SucessPurchase buyerData={buyerData} />
        <ButtonContainer>
          <ButtonPagamento onClick={ReturnHome}>
            Pagamento Efetuado
          </ButtonPagamento>
          <ButtonWhatsApp onClick={AddWhatsApp}>
            Enviar Comprovante de Pagamento
          </ButtonWhatsApp>
        </ButtonContainer>
        <CloseButton onClick={CloseAndGoHome}>Fechar</CloseButton>
      </SucessContent>
  );
}


const TimerBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  color: #00e0ff;
  font-size: 22px;
  font-family: 'Orbitron', 'Courier New', Courier, monospace;
  letter-spacing: 2px;
`;

const Timer = styled.div`
  color: #fff;
  background: #23272f;
  border-radius: 12px;
  font-size: 48px;
  font-family: 'Orbitron', 'Courier New', Courier, monospace;
  font-weight: bold;
  letter-spacing: 4px;
  padding: 8px 32px;
  margin-top: 8px;
  border: 2px solid #00e0ff;
`;

const TextInfo = styled.div`
  margin-top: 10px;
  font-weight: bold;
`;

const SucessContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 45px 0;
`;

const SucessMessage = styled.h2`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: #247a6b;
  width: 40%;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px; /* Espaçamento entre os botões */
`;

const ButtonWhatsApp = styled.div`
  margin: 10px;
  padding: 10px 20px;
  background-color: #4caf50; /* Cor verde */
  border-radius: 4px;
  border: none;
  color: #ffffff; /* Cor branca */
  text-align: center;
  font-size: 18px;
  cursor: pointer; /* Mostrar cursor de mão ao passar o mouse */

  &:hover {
    background-color: #66bb6a; /* Define a cor de fundo quando o mouse passa por cima */
  }
`;

const ButtonPagamento = styled.div`
  margin: 10px;
  padding: 10px 20px;
  background-color: #cd0077;
  border-radius: 4px;
  border: none;
  color: #ffffff; /* Cor branca */
  text-align: center;
  font-size: 18px;
  cursor: pointer; /* Mostrar cursor de mão ao passar o mouse */

  &:hover {
    background-color: #ff3366; /* Define a cor de fundo quando o mouse passa por cima */
  }
`;

const CloseButton = styled.div`
  margin: 20px;
  padding: 10px 20px;
  background-color: #f44336; /* Cor vermelha */
  border-radius: 4px;
  border: none;
  color: #ffffff; /* Cor branca */
  text-align: center;
  font-size: 18px;
  cursor: pointer; /* Mostrar cursor de mão ao passar o mouse */

  &:hover {
    background-color: #e57373; /* Define a cor de fundo quando o mouse passa por cima */
  }
`;
