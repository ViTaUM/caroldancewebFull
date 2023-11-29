import styled from "styled-components";
import Seat from "./Seat";
import SeatsSubtitle from "./SeatsSubtitle";

export default function SeatsList({ seats, selectedSeats, setSelectedSeats, avulso }) {
  // Filtrar assentos ímpares
  const oddSeats = seats.map((row, index) =>
    row.filter((seat) => parseInt(seat.numero) % 2 !== 0)
  );

  // Filtrar assentos pares
  const evenSeats = seats.map((row, index) =>
    row.filter((seat) => parseInt(seat.numero) % 2 === 0)
  );

  return (
    <SeatsContainer>
      <SeatsWrapper>
        <SeatsColumn>
          <h2>Ímpares</h2>
          <SeatsImpares>
            {oddSeats.length > 0 ? (
              oddSeats.map((row, index) => {
                return (
                  <DivImpar>
                    {row.map((seat, index) => (
                      <Seat
                        key={index}
                        name={seat.nome}
                        seatId={seat.id}
                        selectedSeats={selectedSeats}
                        setSelectedSeats={setSelectedSeats}
                        isAvailable={seat.disponivel}
                        valor={seat.valor}
                        avulso={avulso}
                      />
                    ))}
                  </DivImpar>
                );
              })
            ) : (
              <p>Nenhuma assento ímpar disponível.</p>
            )}
          </SeatsImpares>
        </SeatsColumn>

        <SeatsColumn>
          <h2>Pares</h2>
          <SeatsPar>
            {evenSeats.length > 0 ? (
              evenSeats.map((row, index) => {
                return (
                  <DivPar>
                    {row.map((seat, index) => (
                      <Seat
                        key={index}
                        name={seat.nome}
                        seatId={seat.id}
                        selectedSeats={selectedSeats}
                        setSelectedSeats={setSelectedSeats}
                        isAvailable={seat.disponivel}
                        valor={seat.valor}
                      />
                    ))}
                  </DivPar>
                );
              })
            ) : (
              <p>Nenhuma assento Pares disponível.</p>
            )}
          </SeatsPar>
        </SeatsColumn>
      </SeatsWrapper>
      <SeatsSubtitle />
    </SeatsContainer>
  );
}

const SeatsWrapper = styled.div`
  display: flex;
  @media (max-width: 1176px) {
    width: 100%;
    flex-direction: column;
  }
`;

const DivImpar = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 10px;
  @media (max-width: 1176px) {
    overflow: scroll;
    width: 100%;
  }
`;

const DivPar = styled.div`
  display: flex;
  gap: 10px;
  @media (max-width: 1176px) {
    overflow: scroll;
    width: 100%;
  }
`;

const SeatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 20px;
  margin-top: 30px;

  @media (max-width: 1176px) {
    width: 100%;
    flex-direction: column;
  }
`;

const SeatsColumn = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 24px;
    color: #293845;
    text-align: center;
  }
`;

const SeatsPar = styled.ul`
  flex-direction: column;
  display: flex;
  gap: 10px 10px;
  grid-template-columns: repeat(13, 1fr);
  padding: 20px;
  @media (max-width: 1176px) {
    flex-wrap: wrap;
  }
`;

const SeatsImpares = styled.ul`
  flex-direction: column;
  display: flex;
  gap: 10px 10px;
  grid-template-columns: repeat(13, 1fr);
  padding: 20px;
  @media (max-width: 1176px) {
    flex-wrap: wrap;
  }
`;
