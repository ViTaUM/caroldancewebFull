import styled from "styled-components";

export default function TopBar() {


  return (
    <NavBar>
      <h1>Carol Dance Web</h1>
    </NavBar>
  );
}

const NavBar = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 80px;
  align-items: center;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  top: 0;
  left: 0;
  z-index: 1;

  h1 {
    font-size: 34px;
    font-weight: 700;
    color: #000;
  }
`;
