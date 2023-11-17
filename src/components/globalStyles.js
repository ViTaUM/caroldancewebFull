import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    font-family: 'Roboto', sans-serif;
    background-color: #FAACA8;
    background-image: linear-gradient(19deg, #FAACA8 0%, #DDD6F3 100%);    
  }

`;

export default GlobalStyle;
