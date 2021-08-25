import React from 'react'
import styled from 'styled-components'

type Props = {
  checkboxRef: React.RefObject<HTMLInputElement>
  defaultChecked: boolean
}

export const CheckBox: React.VFC<Props> = (props) => {
  const { checkboxRef, defaultChecked } = props

  return (
    <Container
      ref={checkboxRef}
      type="checkbox"
      defaultChecked={defaultChecked}
    />
  )
}

export const Container = styled.input``
