import styled from "styled-components";
import { useState } from "react";

export default function Seat({
  name,
  isAvailable,
  seatId,
  selectedSeats,
  setSelectedSeats,
  valor,
  isCadeirante,
}) {
  const [selected, setSelected] = useState(false);
  const [showModal, setShowModal] = useState(false);

  function selectSeat(seatId, name, isSelected, isAvailable, valor) {
    // Contar assentos selecionados com valor 0 e 30
    const countValor0 = selectedSeats.filter((seat) => seat.valor === 0).length;
    // const countValor30 = selectedSeats.filter(
    //   (seat) => seat.valor === 30
    // ).length;

    // Verifica se está tentando selecionar um novo assento
    // if (!isSelected && selectedSeats.length >= 5 && !avulso) {
    //   alert("Você pode selecionar no máximo 5 assentos.");
    //   return;
    // }

    if (!isAvailable) {
      alert("Esse assento não está disponível");
      return;
    }

    //  if ( valor === 40){
    //    alert("Apenas assentos cortesias estão liberados!");
    //    return;
    //  }

    // if (countValor30 || valor !== 0) {
    //   alert(
    //     "Os ingressos estarão disponíveis para venda a partir das 09 horas."
    //   );
    //   return;
    // }

    if (isSelected) {
      // Remover o assento desmarcado com base no id
      setSelectedSeats(selectedSeats.filter((seat) => seat.id !== seatId));
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

      if (isCadeirante) {
        setShowModal(true);
      } else {
        setSelectedSeats([...selectedSeats, { name, id: seatId, valor }]);
        setSelected(true);
      }
    }
  }

  function handleConfirmCadeirante() {
    setSelectedSeats([...selectedSeats, { name, id: seatId, valor }]);
    setSelected(true);
    setShowModal(false);
  }

  return (
    <>
      <SeatButton selected={selected} isAvailable={isAvailable} valor={valor} isCadeirante={isCadeirante}>
        <button
          onClick={() => selectSeat(seatId, name, selected, isAvailable, valor)}
        >
          {name}
        </button>
      </SeatButton>

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalText>
              Aviso: os assentos dos cadeirantes não possuem uma poltrona para sentar.
            </ModalText>
            <ConfirmButton onClick={handleConfirmCadeirante}>
              Ciente
            </ConfirmButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
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
      } else if (props.isCadeirante && props.isAvailable) {
        return "#0000FF";
      } else if (!props.isAvailable && props.valor === 0) {
        return "#C3CFD9";
      } else if (props.valor === 0) {
        return "#FF0000";
      } else if (props.isAvailable) {
        return "#32CD32";
      }

      return "#C3CFD9";
    }};
    border: 1px solid
      ${(props) => {
        if (props.isAvailable && props.selected) {
          return "#1AAE9E";
        } else if (props.isCadeirante && props.isAvailable) {
          return "#0000FF";
        } else if (props.isAvailable) {
          return "#7B8B99";
        }

        return "#C3CFD9";
      }};
    cursor: ${(props) => (props.isAvailable ? "pointer" : "unset")};
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  max-width: 90%;
  width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ModalText = styled.p`
  font-size: 18px;
  text-align: center;
  color: #293845;
  line-height: 1.5;
`;

const ConfirmButton = styled.button`
  background-color: #8DD7CF;
  color: #000;
  border: none;
  padding: 10px 30px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1AAE9E;
  }
`;
