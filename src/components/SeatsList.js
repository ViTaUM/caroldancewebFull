import styled from "styled-components";
import Seat from "./Seat";

export default function SeatsList({ seats, selectedSeats, setSelectedSeats }) {
  // Filtrar assentos ímpares
  const oddSeats = seats.filter(
    (seat) => parseInt(seat.name.substring(1)) % 2 !== 0
  );

  // Filtrar assentos pares
  const evenSeats = seats.filter(
    (seat) => parseInt(seat.name.substring(1)) % 2 === 0
  );

  return (
    <SeatsContainer>
      <SeatsColumn>
        <h2>Ímpares</h2>
        <Seats>
          {oddSeats.length > 0 ? (
            oddSeats.map((seat, index) => (
              <Seat
                key={index}
                name={seat.name}
                seatId={seat.id}
                selectedSeats={selectedSeats}
                setSelectedSeats={setSelectedSeats}
                isAvailable={seat.isAvailable}
              />
            ))
          ) : (
            <p>Nenhum assento ímpar disponível.</p>
          )}
        </Seats>
      </SeatsColumn>

      <SeatsColumn>
        <h2>Pares</h2>
        <Seats>
          {evenSeats.length > 0 ? (
            evenSeats.map((seat, index) => (
              <Seat
                key={index}
                name={seat.name}
                seatId={seat.id}
                selectedSeats={selectedSeats}
                setSelectedSeats={setSelectedSeats}
                isAvailable={seat.isAvailable}
              />
            ))
          ) : (
            <p>Nenhum assento par disponível.</p>
          )}
        </Seats>
      </SeatsColumn>
    </SeatsContainer>
  );
}

const SeatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SeatsColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%; // Ajuste a largura conforme necessário

  h2 {
    margin: 60px 0;
    font-size: 24px;
    color: #293845;
    text-align: center;
  }
`;

const Seats = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  padding: 0 14px;
`;
