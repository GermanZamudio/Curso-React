// src/GlobalStyle.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Open Sans', sans-serif;
    background-color: #f2f2f2;
    color: #333;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    font-family: inherit;
  }
  .modal {
  z-index: 1200 !important;
}
`;

export default GlobalStyle;
