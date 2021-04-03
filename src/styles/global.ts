import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    padding: 0;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
  }

  body {
    background: #fff;
    color: #1C1C1C;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'Roboto Slab', serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 500
  }

  button {
    cursor: pointer;
  }
`;
