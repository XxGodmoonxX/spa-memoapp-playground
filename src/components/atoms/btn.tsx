import React from 'react'
import styled, { css } from 'styled-components'

type Props = {
  action?: 'submit' | 'delete' | 'edit' | 'back'
  children: React.ReactNode
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const Btn: React.VFC<Props> = (props) => {
  const { action, children, onClick } = props

  return (
    <Container onClick={onClick} action={action} type="button">
      {children}
    </Container>
  )
}

const Container = styled.button<Pick<Props, 'action'>>`
  width: 200px;
  height: 36px;
  cursor: pointer;
  transition: opacity 0.4s;

  &:hover {
    opacity: 0.6;
  }

  ${(props) =>
    props.action === 'delete'
      ? css`
          background-color: #f54e4e;
          color: white;
          border: none;
        `
      : css`
          background-color: white;
          color: black;
          border: 1px solid black;
        `};
`
