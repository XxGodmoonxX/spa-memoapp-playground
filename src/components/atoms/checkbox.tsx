import React from 'react'
import styled from 'styled-components'

type Props = {
  checkboxRef: React.RefObject<HTMLInputElement>
  defaultChecked: boolean
  labelText?: string
}

export const CheckBox: React.VFC<Props> = (props) => {
  const { checkboxRef, defaultChecked, labelText } = props

  return (
    <Container>
      {labelText && <LabelText>{labelText}</LabelText>}
      <Input
        ref={checkboxRef}
        type="checkbox"
        defaultChecked={defaultChecked}
      />
    </Container>
  )
}

const Container = styled.label`
  display: flex;
  align-items: center;
`

const Input = styled.input``

const LabelText = styled.p`
  font-size: 14px;
  margin: 0 10px 0 0;
`
