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
    // Contar assentos selecionados com valor 0 e 30
    const countValor0 = selectedSeats.filter((seat) => seat.valor === 0).length;
    const countValor30 = selectedSeats.filter(
      (seat) => seat.valor === 30
    ).length;

    // Verifica se está tentando selecionar um novo assento
    // if (!isSelected && selectedSeats.length >= 5 && !avulso) {
    //   alert("Você pode selecionar no máximo 5 assentos.");
    //   return;
    // }

    if (!isAvailable) {
      alert("Esse assento não está disponível");
      return;
    }

    // if (countValor0 || valor === 0){
    //   alert("O assento de cortesia selecionado está atualmente bloqueado e indisponível.");
    //   return;
    // }

    if (countValor30 || valor !== 0) {
      alert("O assento selecionado está atualmente bloqueado e indisponível.");
      return;
    }

    if (isSelected) {
      // Remover o assento desmarcado com base no seatId
      setSelectedSeats(selectedSeats.filter((seat) => seat.seatId !== seatId));
      setSelected(false);
    } else {
      // Regras para adicionar assento
      if (valor === 0 && countValor0 >= 2) {
        alert("Você só pode selecionar no máximo 2 assentos cortesia.");
        return;
      }
      // if (valor === 30 && countValor30 >= 3 && !avulso) {
      //   alert("Você só pode selecionar no máximo 3 assentos normais.");
      //   return;
      // }

      setSelectedSeats([...selectedSeats, { name, seatId, valor }]);
      setSelected(true);
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
      } else if (!props.isAvailable && props.valor === 0) {
        return "#C3CFD9";
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
