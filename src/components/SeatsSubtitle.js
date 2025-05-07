import styled from "styled-components";

export default function SeatsSubtitle() {
  return (
    <ColorsSubtitle>
      <ColorContainer>
        <CircleColor type="selecionado" />
        <span>Selecionado</span>
      </ColorContainer>
      <ColorContainer>
        <CircleColor type="disponivel" />
        <span>Disponível</span>
      </ColorContainer>
      <ColorContainer>
        <CircleColor type="indisponivel" />
        <span>Indisponível</span>
      </ColorContainer>
    </ColorsSubtitle>
  );
}

const ColorsSubtitle = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 30px;
`;

const ColorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;

  span {
    font-size: 14px;
    color: #000;
    font-weight: 600;
  }
`;

const CircleColor = styled.div`
  width: 30px;
  height: 30px;
  margin-bottom: 10px;
  background-color: ${(props) => {
    if (props.type === "disponivel") {
      return "#32CD32";
    } else if (props.type === "indisponivel") {
      return "#C3CFD9";
    } else if (props.type === "cortesia") {
      return "#FF0000";
    }

    return "#8DD7CF";
  }};
  border: 1px solid
    ${(props) => {
    if (props.type === "disponivel") {
      return "#32CD32";
    } else if (props.type === "indisponivel") {
      return "#C3CFD9";
    }

    return "#FFFFF";
  }};
`;
