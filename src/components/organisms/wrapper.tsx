import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 600px;
  padding: 40px 0;
  margin: auto;

  > button {
    margin: 40px auto auto;
    display: block;
  }

  > button + button {
    margin-top: 10px;
  }
`
