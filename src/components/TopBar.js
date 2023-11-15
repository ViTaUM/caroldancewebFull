import styled from "styled-components";
// import { useNavigate } from "react-router-dom";

export default function TopBar() {
  // const navigate = useNavigate();

  // function returnBackPage() {
  //   navigate(-1);
  // }

  return (
    <NavBar>
      {/* <button onClick={ returnBackPage }>Voltar</button> */}
      <h1>Carol Dance Web</h1>
    </NavBar>
  );
}

const NavBar = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  padding: 20px;
  background-color: #C3CFD9;
  position: fixed;
  top: 0;
  left: 0;

  h1 {
    font-size: 34px;
    color: #CD0077;
  }

  button {
    position: absolute;
    top: 4px;
    left: 4px;
    padding: 10px 20px;
    background-color: #CD0077;
    border-radius: 4px;
    border: none;
    color: #FFFFFF;
    text-align: center;
    font-size: 12px;
  }
`;