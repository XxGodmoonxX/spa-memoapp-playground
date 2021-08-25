import { format } from 'date-fns'
import React from 'react'
import styled from 'styled-components'
import { Text } from '../atoms/text'

export type Memo = {
  id: number
  title: string | undefined
  content: string | undefined
  updateDate: number
  isPinned: boolean
}

type Props = {
  memo: Memo
  isLink?: boolean
}

export const MemoLink: React.VFC<Props> = (props) => {
  const { memo, isLink = true } = props

  return (
    <Container {...(isLink && { href: `detail/${memo.id}`, target: '_blank' })}>
      <Heading>タイトル</Heading>
      <Text>{memo.title}</Text>
      <Heading>内容</Heading>
      <Text>{memo.content}</Text>
      <Heading>更新日時</Heading>
      <Text>
        {memo.updateDate && format(memo?.updateDate, 'yyyy/MM/dd kk:mm:ss')}
      </Text>
      {/* 画像 https://icooon-mono.com/11152-%e6%8a%bc%e3%81%97%e3%83%94%e3%83%b3%e3%81%ae%e3%82%a2%e3%82%a4%e3%82%b3%e3%83%b3%e7%b4%a0%e6%9d%90/ */}
      {memo.isPinned && <PinImg src="/icon/pin.svg" />}
    </Container>
  )
}

const Container = styled.a`
  width: 100%;
  border: 1px solid black;
  display: block;
  text-decoration: none;
  color: black;
  padding: 20px 40px 40px;
  box-sizing: border-box;
  position: relative;
  transition: opacity 0.4s;

  &:hover {
    opacity: 0.6;
  }

  &:active {
    color: black;
  }

  & + & {
    margin-top: 20px;
  }

  > p {
    margin: 4px 0 0;
  }
`

const Heading = styled.h2`
  font-size: 18px;
  margin: 20px 0 0;
`

const PinImg = styled.img`
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 40px;
  height: auto;
`
