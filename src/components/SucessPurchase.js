import styled from "styled-components";

export default function SucessPurchase({ buyerData }) {
  return (
    <PurchaseContainer>
      {/* <PurchaseInfo>
        <h2>Filme e sessão</h2>
        <p>{ sessionData.movie.title }</p>
        <p>{`${ sessionData.day.date } - ${ sessionData.name }`}</p>
      </PurchaseInfo> */}
      <PurchaseInfo>
        <h2>Ingressos</h2>
        {buyerData.ids.map((seat, index) => <p key={ index }>{`Assento ${ seat.name }`}</p>)}
      </PurchaseInfo>
      <PurchaseInfo>
        <h2>Comprador</h2>
        <p>{`Nome: ${ buyerData.name }`}</p>
        <p>{`CPF: ${ buyerData.cpf }`}</p>
        <p>{`E-MAIL: ${ buyerData.email }`}</p>
      </PurchaseInfo>
      <PurchaseInfo>
        <h2>PIX</h2>
        <p>{`Chave: ${ buyerData.name }`}</p>
        <p>{`VALOR: R$90,00`}</p>
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
    text-align: start;
    margin-bottom: 10px;
  }

  p {
    font-size: 22px;
    margin: 4px 0;
  }
`