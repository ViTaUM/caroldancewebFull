import styled from "styled-components";
import qrcode from "./qr-code.png";

export default function SucessPurchaseVaga({ buyerData }) {

  // Obtém a data e hora atual
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString();

  return (
    <PurchaseContainer>
      <LeftColumn>
        <OrderDetails>
          <p>A confirmação foi enviada para o e-mail: </p>
          <span>{buyerData.email}</span>
        </OrderDetails>
        <PurchaseInfo>
          <h2>Estacionamento</h2>
          <p>{buyerData.estacionamento === 1 ? "R$15,00" : "R$25,00"}</p>
        </PurchaseInfo>
        <PurchaseInfo>
          <h2>Dados</h2>
          <p>
            Status: <span>Aguardando Pagamento</span>
          </p>
          <p>{`Data do Pedido: ${formattedDate}`}</p>
          <p>{`Forma de Pagamento: PIX`}</p>
          <p>
            Valor Total: <span>{buyerData.estacionamento === 1 ? "R$15,00" : "R$25,00"}</span>
          </p>
        </PurchaseInfo>
      </LeftColumn>
      <RightColumn>
        <PurchaseInfo>
          <h2>PIX</h2>
          <p>{`Chave: (71) 98690-4826`}</p>
          <p>
            <img src={qrcode} alt="QRCODE" />
          </p>
          <p>{`Nome: Beatriz da Silva Santos Barros`}</p>
        </PurchaseInfo>
      </RightColumn>
    </PurchaseContainer>
  );
}

const PurchaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 40px;

  @media (min-width: 822px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const LeftColumn = styled.div`
  flex: 1;
  width: 100%;

  @media (min-width: 822px) {
    width: 60%;
    padding-right: 20px;
  }
`;

const RightColumn = styled.div`
  flex: 1;
  width: 100%;

  @media (min-width: 822px) {
    width: 40%;
  }
`;

const PurchaseInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 40px;
  padding: 0 26px;

  h2 {
    color: #293845;
    font-size: 24px;
    font-weight: bold;
    width: 100%;
    text-align: center;
    margin-bottom: 10px;
  }

  p {
    font-size: 22px;
    margin: 4px 0;
    text-align: center;
  }

  span {
    color: red;
    font-size: 24px;
    font-weight: bold;
  }
`;

const OrderDetails = styled.div`
  background-color: #eee;
  padding: 15px;
  margin-left: 50px;
  margin-bottom: 20px;
  text-align: center;

  @media (max-width: 822px) {
    margin-left: 0px;
  }

  span {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 10px;
  }
`;
