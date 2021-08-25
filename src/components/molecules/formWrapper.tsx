import styled from 'styled-components'

export const FormWrapper = styled.form`
  width: 400px;
  margin: 40px auto 0;
  padding: 20px 40px;
  box-sizing: border-box;
  border: 1px solid;

  > *:not(p):not(button) {
    margin: 10px auto 0;
  }

  > p {
    margin: 20px auto 0;
  }

  > button {
    margin: 20px auto 0;
    display: block;
  }

  > button + button {
    margin-top: 10px;
  }

  > *:first-child {
    margin-top: 0;
  }
`
