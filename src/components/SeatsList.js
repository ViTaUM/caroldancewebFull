import styled from "styled-components";
import Seat from "./Seat";

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
    </SeatsContainer>
  );
}

const DivImpar = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 10px;
`;

const SeatsContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 1366px) {
    flex-direction: column;
  }
`;

const SeatsColumn = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    margin: 60px 0;
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
