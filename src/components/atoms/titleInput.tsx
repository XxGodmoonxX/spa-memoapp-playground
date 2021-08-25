import React from 'react'
import styled from 'styled-components'

type Props = {
  inputRef: React.RefObject<HTMLInputElement>
  defaultValue?: string
}

export const TitleInput: React.VFC<Props> = (props) => {
  const { inputRef, defaultValue } = props

  return <Container ref={inputRef} type="text" defaultValue={defaultValue} />
}

export const Container = styled.input``
