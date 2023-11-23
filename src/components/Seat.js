import styled from "styled-components";
import { useState } from "react";

export default function Seat({
  name,
  isAvailable,
  seatId,
  selectedSeats,
  setSelectedSeats,
  valor,
}) {
  const [selected, setSelected] = useState(false);

  function selectSeat(seatId, name, isSelected, isAvailable, valor) {
    setSelected(!selected);

    if (!isAvailable) {
      alert("Esse assento não está disponível");
      return;
    }

    if (isSelected) {
      // Remover o assento desmarcado com base no seatId
      setSelectedSeats(selectedSeats.filter((seat) => seat.seatId !== seatId));
    } else if (!isSelected && isAvailable) {
      setSelectedSeats([...selectedSeats, { name, seatId, valor }]);
    }
  }

  return (
    <SeatButton selected={selected} isAvailable={isAvailable} valor={valor}>
      <button
        onClick={() => selectSeat(seatId, name, selected, isAvailable, valor)}
      >
        {name}
      </button>
    </SeatButton>
  );
}

const SeatButton = styled.li`
  button {
    width: 40px;
    height: 40px;
    text-align: center;
    font-size: 12px;
    color: ${(props) => {
      if (props.isAvailable && props.selected) {
        return "#000";
      } else if (props.isAvailable) {
        return "#FFF";
      }

      return "#000000";
    }};
    background-color: ${(props) => {
      if (props.isAvailable && props.selected) {
        return "#8DD7CF";
      } else if (props.valor === 0) {
        return "#FF0000";
      } else if (props.isAvailable) {
        return "#3AA8F9";
      }

      return "#C3CFD9";
    }};
    border: 1px solid
      ${(props) => {
        if (props.isAvailable && props.selected) {
          return "#1AAE9E";
        } else if (props.isAvailable) {
          return "#7B8B99";
        }

        return "#C3CFD9";
      }};
    cursor: ${(props) => (props.isAvailable ? "pointer" : "unset")};
  }
`;
