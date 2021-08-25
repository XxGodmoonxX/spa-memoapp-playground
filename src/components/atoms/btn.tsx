import React from 'react'
import styled, { css } from 'styled-components'

type Props = {
  action: 'submit' | 'delete' | 'edit'
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
  color: white;

  ${(props) =>
    props.action === 'delete' &&
    css`
      background-color: red;
    `}

  ${(props) =>
    props.action === 'edit' &&
    css`
      background-color: green;
    `}

    ${(props) =>
    props.action === 'submit' &&
    css`
      background-color: blue;
    `}
`
