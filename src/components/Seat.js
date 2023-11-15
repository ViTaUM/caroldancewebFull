import styled from "styled-components";
import { useState } from "react";

export default function Seat({ name, isAvailable, seatId, selectedSeats, setSelectedSeats }) {
  const [ selected, setSelected ] = useState(false);

  function selectSeat(seatId, name, isSelected, isAvailable) {
    setSelected(!selected);

    if (!isAvailable) {
      alert("Esse assento não está disponível");
      return;
    }

    if (isSelected) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatId));
    } else if (!isSelected && isAvailable) {
      setSelectedSeats([...selectedSeats, { name, seatId }]);
    }
  }

  return (
    <SeatButton selected={selected} isAvailable={isAvailable}>
      <button onClick={() => selectSeat(seatId, name, selected, isAvailable)} >{name}</button>
    </SeatButton>
  );
}

const SeatButton = styled.li`
  button {
    width: 30px;
    height: 30px;
    margin: 4px 2px;
    text-align: center;
    border-radius: 50%;
    font-size: 12px;
    background-color: ${props => {
      if (props.isAvailable && props.selected) {
        return "#8DD7CF";
      } else if (props.isAvailable) {
        return "#C3CFD9";
      }

      return "#FBE192";
    }};
    border: 1px solid ${props => {
      if (props.isAvailable && props.selected) {
        return "#1AAE9E";
      } else if (props.isAvailable) {
        return "#7B8B99";
      }

      return "#F7C52B";
    }};
    cursor: ${props => props.isAvailable ? "pointer" : "unset"};
  }
`;