import styled from "styled-components";
import Seat from "./Seat";
import SeatsSubtitle from "./SeatsSubtitle";

export default function SeatsList({ seats, selectedSeats, setSelectedSeats }) {
  // Filtrar assentos ímpares
  const oddSeats = seats.map((row, index) =>
    row.filter((seat) => parseInt(seat.id) % 2 !== 0)
  );

  // Filtrar assentos pares
  const evenSeats = seats.map((row, index) =>
    row.filter((seat) => parseInt(seat.id) % 2 === 0)
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
                        name={seat.name}
                        seatId={seat.id}
                        selectedSeats={selectedSeats}
                        setSelectedSeats={setSelectedSeats}
                        isAvailable={seat.isAvailable}
                        valor={seat.valor}
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
                return row.map((seat, index) => (
                  <Seat
                    key={index}
                    name={seat.name}
                    seatId={seat.id}
                    selectedSeats={selectedSeats}
                    setSelectedSeats={setSelectedSeats}
                    isAvailable={seat.isAvailable}
                    valor={seat.valor}
                  />
                ));
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
  @media (max-width: 1376px) {
    flex-direction: column;
  }
`;

const DivImpar = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 10px;
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

  @media (max-width: 1366px) {
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
  display: grid;
  gap: 10px 10px;
  grid-template-columns: repeat(13, 1fr);
  grid-template-rows: repeat(21, 1fr);
  padding: 20px;
  flex-direction: row-reverse;
`;

const SeatsImpares = styled.ul`
  flex-direction: column;
  display: flex;
  gap: 10px 10px;
  grid-template-columns: repeat(13, 1fr);
  padding: 20px;
`;
