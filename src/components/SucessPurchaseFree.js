import styled from "styled-components";

export default function SucessPurchase({ buyerData }) {
  return (
    <PurchaseContainer>
      <LeftColumn>
        <OrderDetails>
          <p>A(s) cortesia(s) foi(foram) enviada(s) para o e-mail:</p>
          <span>{buyerData.email}</span>
        </OrderDetails>
        <PurchaseInfo>
          <h2>Ingressos</h2>
          {buyerData.ids.map((seat, index) => {
            return (
              <p key={index}>{`Assento ${seat.name} - ${
                seat.valor === 0 ? "cortesia" : "R$" + seat.valor + ",00"
              }`}</p>
            );
          })}
        </PurchaseInfo>
        <PurchaseInfo>
          <h2>Dados</h2>
          <p>
            Status: <span>Cortesias Enviadas por E-mail</span>
          </p>
        </PurchaseInfo>
      </LeftColumn>
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
