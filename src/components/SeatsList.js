import styled from "styled-components";
import Seat from "./Seat";

export default function SeatsList({ seats, selectedSeats, setSelectedSeats }) {
  // Filtrar assentos ímpares
  const oddSeats = seats.filter((seat) => parseInt(seat.id) % 2 !== 0);

  // Filtrar assentos pares
  const evenSeats = seats.filter((seat) => parseInt(seat.id) % 2 === 0);

  return (
    <SeatsContainer>
      <SeatsColumn>
        <h2>Ímpares</h2>
        <SeatsImpares>
          {oddSeats.length > 0 ? (
            oddSeats.map((seat, index) => (
              <Seat
                key={index}
                name={seat.name}
                seatId={seat.id}
                selectedSeats={selectedSeats}
                setSelectedSeats={setSelectedSeats}
                isAvailable={seat.isAvailable}
                valor={seat.valor}
              />
            ))
          ) : (
            <p>Nenhum assento ímpar disponível.</p>
          )}
        </SeatsImpares>
      </SeatsColumn>

      <SeatsColumn>
        <h2>Pares</h2>
        <SeatsPar>
          {evenSeats.length > 0 ? (
            evenSeats.map((seat, index) => (
              <Seat
                key={index}
                name={seat.name}
                seatId={seat.id}
                selectedSeats={selectedSeats}
                setSelectedSeats={setSelectedSeats}
                isAvailable={seat.isAvailable}
                valor={seat.valor}
              />
            ))
          ) : (
            <p>Nenhum assento par disponível.</p>
          )}
        </SeatsPar>
      </SeatsColumn>
    </SeatsContainer>
  );
}

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
  display: grid;
  gap: 10px 10px;
  grid-template-columns: repeat(13, 1fr);
  padding: 20px;
`;
