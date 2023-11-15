import styled from "styled-components";

export default function Footer({ children }) {
  return (
    <BottomBar>
      { children }
    </BottomBar>
  );
}

const BottomBar = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  padding: 22px 20px;
  background-color: #DFE6ED;
  border: 1px solid #9EADBA;
  position: fixed;
  bottom: 0;
  left: 0;

  img {
    width: 84px;
    height: auto;
    margin-right: 16px;
  }

  h3 {
    font-size: 26px;
    color: #293845;
  }

  p{
    font-size: 26px;
    color: #293845;
  }
`;