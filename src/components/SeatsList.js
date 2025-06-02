import styled from "styled-components";
import Seat from "./Seat";
import SeatsSubtitle from "./SeatsSubtitle";

const ROW_LABELS = [
  "Q", "P", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A"
];

const CADEIRANTE_SEATS = ["B2", "B4", "B5", "B8", "B9", "B12", "B13", "B18"];

export default function SeatsList({ seats, selectedSeats, setSelectedSeats }) {
  // seats deve ser uma matriz de arrays, cada um representando uma fileira
  return (
    <SeatsContainer>
      <SeatsGridWrapper>
        <SeatsGrid>
          {seats.map((row, rowIndex) => (
            <Row key={rowIndex}>
              {/* Letra da fileira à esquerda */}
              <RowLabel>{ROW_LABELS[rowIndex] || ""}</RowLabel>
              {row.map((seat, colIndex) => {
                if (!seat || seat.vazio) return null;
                const isCadeirante = CADEIRANTE_SEATS.includes(seat.name);
                return (
                  <Seat
                    key={colIndex}
                    name={seat.name}
                    seatId={seat.id}
                    selectedSeats={selectedSeats}
                    setSelectedSeats={setSelectedSeats}
                    isAvailable={seat.is_available}
                    valor={seat.valor}
                    isCadeirante={isCadeirante}
                  />
                );
              })}
              {/* Letra da fileira à direita */}
              <RowLabel>{ROW_LABELS[rowIndex] || ""}</RowLabel>
            </Row>
          ))}
        </SeatsGrid>
      </SeatsGridWrapper>
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

const SeatsGridWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    max-width: 100vw;
  }
`;

const SeatsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  list-style: none;
  min-width: 600px;
  /* Garante largura mínima para rolagem */

  @media (max-width: 768px) {
    min-width: 500px;
  }
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
