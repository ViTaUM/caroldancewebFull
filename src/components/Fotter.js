import styled from "styled-components";

export default function Footer({ children }) {
  return <BottomBar>{children}</BottomBar>;
}

const BottomBar = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 22px 20px;
  position: fixed;
  bottom: 0;
  left: 0;
  background: rgba( 0, 0, 0, 0.4 );
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 4px );
  -webkit-backdrop-filter: blur( 4px );

  img {
    width: 84px;
    height: auto;
    margin-right: 16px;
  }

  h3 {
    font-size: 26px;
    color: #FFF;
  }

  p {
    font-size: 26px;
    color: #FFF;
  }
`;
