import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { Btn } from '../components/atoms/btn'
import { Text } from '../components/atoms/text'
import { Textarea } from '../components/atoms/textArea'
import { Title } from '../components/atoms/title'
import { TitleInput } from '../components/atoms/titleInput'
import { FormWrapper } from '../components/molecules/formWrapper'
import { MemoLink, Memo } from '../components/molecules/memoLink'
import { Wrapper } from '../components/organisms/wrapper'
import { PATH } from '../utils/routes'
import { getStorage, setStorage } from '../utils/storage'

export default function Home() {
  const [memo, setMemo] = useState<Memo[]>()
  const titleRef = useRef<HTMLInputElement>(null)
  const textareeRef = useRef<HTMLTextAreaElement>(null)
  const [adding, setAdding] = useState<boolean>(false)

  // NOTE: 現在のメモ一覧を取得しソートしてstateに入れる
  useEffect(() => {
    const storage = getStorage('spa-memoapp-playground')
    const list: Memo[] | null = storage ? JSON.parse(storage) : null
    if (!list) {
      return
    }

    list
      // NOTE: 更新日時で降順
      .sort((a, b) => {
        return b.updateDate - a.updateDate
      })
      // NOTE: ピン留めされたメモが優先で表示
      .sort((a, b) => {
        if (!a.isPinned && b.isPinned) {
          return 1
        } else if (a.isPinned && !b.isPinned) {
          return -1
        } else {
          return 0
        }
      })

    setMemo(list ? list : undefined)
  }, [adding])

  const handleSubmit = () => {
    const storage = getStorage('spa-memoapp-playground')
    /** 現在のメモ一覧 */
    const list: Memo[] | null = storage ? JSON.parse(storage) : null

    /** 新規で作るメモ */
    const currentMemo: Memo = {
      id: list?.length ? list[list?.length - 1].id + 1 : 0,
      title: titleRef.current?.value,
      content: textareeRef.current?.value,
      updateDate: Date.now(),
      isPinned: false
    }

    /** 更新後のメモ一覧 */
    const newMemo = list ? [...list, currentMemo] : [currentMemo]
    setStorage('spa-memoapp-playground', JSON.stringify(newMemo))

    setAdding(false)
  }

  const handleAdd = () => {
    setAdding(true)
  }

  const handleBack = () => {
    setAdding(false)
  }

  return (
    <Wrapper>
      <Title>メモ一覧</Title>

      {adding ? (
        <>
          <FormWrapper>
            <Text>タイトル</Text>
            <TitleInput inputRef={titleRef} />
            <Text>内容</Text>
            <Textarea ref={textareeRef} />
            <Btn action="submit" onClick={handleSubmit}>
              上記内容でメモを追加
            </Btn>
          </FormWrapper>
          <Btn action="back" onClick={handleBack}>
            戻る
          </Btn>
        </>
      ) : (
        <>
          <BtnContainer>
            <Btn onClick={handleAdd}>メモを追加する</Btn>
          </BtnContainer>
          {memo &&
            memo.map((memo) => {
              return (
                <MemoLink
                  memo={memo}
                  key={memo.id}
                  href={`${PATH.DETAIL}/${memo.id}`}
                />
              )
            })}
        </>
      )}
    </Wrapper>
  )
}

const BtnContainer = styled.div`
  margin-top: 40px;
  margin-bottom: 40px;
  text-align: center;
`
