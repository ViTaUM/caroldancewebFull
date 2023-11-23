import styled from "styled-components";
import SucessPurchase from "./SucessPurchase";

export default function SucessView({ buyerData }) {
  function AddWhatsApp() {
    const whatsappURL = "https://wa.me/5571986904826";
    window.open(whatsappURL, "_blank"); // Abre em uma nova aba
  }

  function ReturnHome() {
    alert("Assim que seu pagamento for confirmado, você receberá um e-mail! Obrigado!");
  window.location.href = '/'; // Redireciona para a página inicial
  }

  return (
    <SucessContent>
      <SucessMessage>Pedido realizado com sucesso!</SucessMessage>
      <TextInfo>
        <p>
          Recebemos seu pedido com sucesso e estamos aguardando o pagamento do
          pix e o envio do comprovante de pagamento via WhatsApp:{" "}
          <a href="https://wa.me/5571986904826" style={{ cursor: "pointer" }}>(71) 98690-4826.</a>
        </p>
      </TextInfo>
      <SucessPurchase buyerData={buyerData} />
      <ButtonContainer>
        <ButtonPagamento onClick={ReturnHome}>Pagamento Efetuado</ButtonPagamento>
        <ButtonWhatsApp onClick={AddWhatsApp}>
          Enviar Comprovante de Pagamento
        </ButtonWhatsApp>
      </ButtonContainer>
    </SucessContent>
  );
}

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
