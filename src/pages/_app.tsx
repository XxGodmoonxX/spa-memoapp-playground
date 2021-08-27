// import 'modern-css-reset/dist/reset.min.css'
import { AppProps } from 'next/app'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const App = ({ Component, pageProps }: AppProps) => {
  const GlobalStyle = createGlobalStyle`
    ${reset}

    a {
    color: inherit;
    text-decoration: none;
  }

    button{
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
    padding: 0;
    appearance: none;
  }

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: transparent;
    font-family: inherit;
  }

  input[type='submit'],
  input[type='button'],
  button,
  select {
    cursor: pointer;
  }

  select::-ms-expand {
    display: none;
  }
  `
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}

export default App
