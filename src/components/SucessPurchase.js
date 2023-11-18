import styled from "styled-components";
import qrcode from "./qr-code.png";

export default function SucessPurchase({ buyerData }) {
  let totalValor = 0;

  return (
    <PurchaseContainer>
      <PurchaseInfo>
        <h2>Ingressos</h2>
        {buyerData.ids.map((seat, index) => {
          // Some o valor do assento a totalValor
          totalValor += seat.valor;
          return <p key={index}>{`Assento ${seat.name} - R$ ${seat.valor},00`}</p>;
        })}
      </PurchaseInfo>
      <PurchaseInfo>
        <h2>Comprador</h2>
        <p>{`Nome: ${buyerData.name}`}</p>
        <p>{`CPF: ${buyerData.cpf}`}</p>
        <p>{`E-MAIL: ${buyerData.email}`}</p>
      </PurchaseInfo>
      <PurchaseInfo>
        <h2>PIX</h2>
        <p>
          <img src={qrcode} alt="QRCODE" />
        </p>
        <p>{`CHAVE: (71) 98690-4826`}</p>
        <p>{`NOME: BEATRIZ DA SILVA SANTOS BARROS`}</p>
        <p>{`VALOR TOTAL: R$ ${totalValor},00`}</p>
      </PurchaseInfo>
    </PurchaseContainer>
  );
}

const PurchaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 40px;
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
`;
