import styled from "styled-components";

export default function SeatsSubtitle() {
  return (
    <ColorsSubtitle>
      <ColorContainer>
        <CircleColor type="selecionado" />
        <p>Selecionado</p>
      </ColorContainer>
      <ColorContainer>
        <CircleColor type="disponivel" />
        <p>Disponível</p>
      </ColorContainer>
      <ColorContainer>
        <CircleColor type="cortesia" />
        <p>Cortesia</p>
      </ColorContainer>
      <ColorContainer>
        <CircleColor type="indisponivel" />
        <p>Indisponível</p>
      </ColorContainer>
    </ColorsSubtitle>
  );
}

const ColorsSubtitle = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 0 10%;
`;

const ColorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;

  p {
    font-size: 12px;
    color: #4E5A65;
  }
`;

const CircleColor = styled.div`
  width: 30px;
  height: 30px;
  margin-bottom: 10px;
  border-radius: 50%;
  background-color: ${props => {
    if (props.type === "disponivel") {
      return "#C3CFD9";
    } else if (props.type === "indisponivel") {
      return "#FBE192";
    } else if (props.type === "cortesia") {
      return "#FF0000";
    }

    return "#8DD7CF";
  }};
  border: 1px solid ${props => {
    if (props.type === "disponivel") {
      return "#7B8B99";
    } else if (props.type === "indisponivel") {
      return "#F7C52B";
    }

    return "#1AAE9E";
  }};
`