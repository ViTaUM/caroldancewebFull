import styled from "styled-components";
import qrcode from "./qr-code.png";

export default function SucessPurchase({ buyerData }) {
  // Se existirem cortesias, substituir o valor dos assentos por 0 conforme a quantidade de cortesias
  let cortesiasRestantes = buyerData.cortesias || 0;
  const idsAtualizados = buyerData.ids.map((seat) => {
    if (cortesiasRestantes > 0) {
      seat.valor = 0;
      cortesiasRestantes--;
    }
    return seat;
  });

  // Recalcula o valor total após aplicar cortesias
  //let totalValor = idsAtualizados.reduce(
  //  (total, seat) => total + seat.valor,
  //  0
  //);

  // Adiciona o valor do estacionamento ao total se existir
  const estacionamentoValor =
    buyerData.estacionamento === 1
      ? 15
      : buyerData.estacionamento === 2
      ? 25
      : 0;

  // totalValor += estacionamentoValor;

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
        <div className="row w-100 g-4">
          <div className="col-12 col-md-7">
            <PurchaseInfo>
              <h2>Ingressos</h2>
              <p>
            
              <div className="d-flex flex-wrap justify-content-center gap-2 mb-3">
                {idsAtualizados.map((seat, index) => (
                  <SeatTag key={index}>{seat.name}</SeatTag>
                ))}
              </div>
              </p>
            </PurchaseInfo>
            {buyerData.estacionamento && (
              <PurchaseInfo>
                <h2>Estacionamento</h2>
                <p>R$ {estacionamentoValor},00</p>
              </PurchaseInfo>
            )}
            <PurchaseInfo>
              <h2>Dados</h2>
              <p>
                Status: <span>Aguardando Pagamento</span>
              </p>
              <p>{`Data do Pedido: ${formattedDate}`}</p>
              <p>{`Forma de Pagamento: PIX`}</p>
              <p>
                Valor Total: <span>{`R$ ${buyerData.totalValue},00`}</span>
              </p>
            </PurchaseInfo>
          </div>
          <div className="col-12 col-md-5 d-flex flex-column align-items-center justify-content-center">
            <PurchaseInfo>
              <h2>PIX</h2>
              <p>{`Chave: (71) 98690-4826`}</p>
              <p>
                <img src={qrcode} alt="QRCODE" />
              </p>
              <p>{`Nome: Beatriz da Silva Santos Barros`}</p>
            </PurchaseInfo>
          </div>
        </div>
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

const SeatTag = styled.span`
  display: inline-block;
  background: #293845;
  color: #fff;
  font-weight: bold;
  border-radius: 12px;
  padding: 8px 18px;
  font-size: 1.1rem;
  margin: 2px 4px;
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