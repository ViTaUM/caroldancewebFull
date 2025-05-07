import styled from "styled-components";
import Seat from "./Seat";
import SeatsSubtitle from "./SeatsSubtitle";

const ROW_LABELS = [
  "Q", "P", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A"
];

export default function SeatsList({ seats, selectedSeats, setSelectedSeats }) {
  // seats deve ser uma matriz de arrays, cada um representando uma fileira
  return (
    <SeatsContainer>
      <SeatsGrid>
        {seats.map((row, rowIndex) => (
          <Row key={rowIndex}>
            {/* Letra da fileira à esquerda */}
            <RowLabel>{ROW_LABELS[rowIndex] || ""}</RowLabel>
            {row.map((seat, colIndex) => {
              if (!seat || seat.vazio) return null;
              return (
                <Seat
                  key={colIndex}
                  name={seat.name}
                  seatId={seat.id}
                  selectedSeats={selectedSeats}
                  setSelectedSeats={setSelectedSeats}
                  isAvailable={seat.disponivel}
                  valor={seat.valor}
                />
              );
            })}
            {/* Letra da fileira à direita */}
            <RowLabel>{ROW_LABELS[rowIndex] || ""}</RowLabel>
          </Row>
        ))}
      </SeatsGrid>
      <SeatsSubtitle />
    </SeatsContainer>
  );
}

const SeatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 20px;
  margin-top: 30px;
`;

const SeatsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  list-style: none; 
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  list-style: none;
`;

const RowLabel = styled.div`
  width: 20px;
  text-align: center;
  font-weight: bold;
  color: #293845;
`;
