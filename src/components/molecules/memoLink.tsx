import { format } from 'date-fns'
import React from 'react'
import styled, { css } from 'styled-components'
import { Text } from '../atoms/text'

export type Memo = {
  id: number
  title: string | undefined
  content: string | undefined
  updateDate: number
  isPinned: boolean
}

type Props = {
  /**  */
  memo: Memo
  /** タイトルと内容が全て表示される */
  isDetail?: boolean
  /**
   * リンク先
   * リンク先がある場合のみホバー時のインタラクションが発生する
   */
  href?: string
}

/**
 * メモを表示するコンポーネント
 */
export const MemoLink: React.VFC<Props> = (props) => {
  const { memo, isDetail, href } = props

  return (
    <Container href={href}>
      <Heading>タイトル</Heading>
      <ContentTitle isDetail={isDetail}>{memo.title}</ContentTitle>
      <Heading>内容</Heading>
      <ContentText isDetail={isDetail}>{memo.content}</ContentText>
      <Heading>更新日時</Heading>
      <Text>
        {memo.updateDate && format(memo?.updateDate, 'yyyy/MM/dd kk:mm:ss')}
      </Text>
      {/* 画像 https://icooon-mono.com/11152-%e6%8a%bc%e3%81%97%e3%83%94%e3%83%b3%e3%81%ae%e3%82%a2%e3%82%a4%e3%82%b3%e3%83%b3%e7%b4%a0%e6%9d%90/ */}
      {memo.isPinned && <PinImg src="/icon/pin.svg" />}
    </Container>
  )
}

const Container = styled.a<Pick<Props, 'href'>>`
  width: 100%;
  border: 1px solid black;
  display: block;
  color: black;
  padding: 40px;
  box-sizing: border-box;
  position: relative;

  ${(props) =>
    props.href &&
    css`
      transition: opacity 0.4s;

      &:hover {
        opacity: 0.6;
      }
    `}

  & + & {
    margin-top: 20px;
  }

  > p {
    margin: 4px 0 0;
  }
`

const Heading = styled.h2`
  font-size: 22px;

  &:not(:first-child) {
    margin-top: 20px;
  }
`

const PinImg = styled.img`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 30px;
  height: auto;
`

export const ContentTitle = styled.p<Pick<Props, 'isDetail'>>`
  font-size: 20px;

  ${(props) =>
    props.isDetail
      ? css`
          overflow-wrap: anywhere;
        `
      : css`
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        `}
`

export const ContentText = styled.p<Pick<Props, 'isDetail'>>`
  font-size: 14px;

  ${(props) =>
    props.isDetail
      ? css`
          overflow-wrap: anywhere;
        `
      : css`
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        `}
`
