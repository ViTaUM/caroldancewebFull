import styled from "styled-components";
import SucessPurchase from "./SucessPurchase";

export default function SucessView({ buyerData, restartData }) {

  function AddWhatsApp() {
    const whatsappURL = "https://wa.me/5571986904826";
    window.open(whatsappURL, "_blank"); // Abre em uma nova aba
  }

  return (
    <SucessContent>
      <SucessMessage>Pedido aguardando pagamento!</SucessMessage>
      <SucessPurchase buyerData={buyerData} />
      <ButtonContainer>
        <ButtonPagamento>Pagamento Efetuado</ButtonPagamento>
        <ButtonWhatsApp onClick={AddWhatsApp}>
          Enviar Comprovante de Pagamento
        </ButtonWhatsApp>
      </ButtonContainer>
    </SucessContent>
  );
}

const SucessContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 60px 0;
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
`;
