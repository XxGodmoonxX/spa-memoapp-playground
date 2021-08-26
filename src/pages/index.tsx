import { useState, useRef, useEffect } from 'react'
import { Btn } from '../components/atoms/btn'
import { Text } from '../components/atoms/text'
import { Textarea } from '../components/atoms/textArea'
import { Title } from '../components/atoms/title'
import { TitleInput } from '../components/atoms/titleInput'
import { FormWrapper } from '../components/molecules/formWrapper'
import { MemoLink } from '../components/molecules/memoLink'
import { Wrapper } from '../components/organisms/wrapper'
import { STORAGE_KEY } from '../constants'

export type Memo = {
  id: number
  title: string | undefined
  content: string | undefined
  updateDate: number
  isPinned: boolean
}

export default function Home() {
  const [memo, setMemo] = useState<Memo[]>()
  const titleRef = useRef<HTMLInputElement>(null)
  const textareeRef = useRef<HTMLTextAreaElement>(null)
  const [adding, setAdding] = useState<boolean>(false)

  useEffect(() => {
    const storage = localStorage.getItem(STORAGE_KEY)
    const list: Memo[] | null = storage ? JSON.parse(storage) : null
    if (!list) {
      return
    }

    list
      .sort((a, b) => {
        return b.updateDate - a.updateDate
      })
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
  }, [])

  const handleSubmit = () => {
    console.log('handleSubmit')

    const storage = localStorage.getItem(STORAGE_KEY)
    const list: Memo[] | null = storage ? JSON.parse(storage) : null

    const currentMemo: Memo = {
      id: list?.length ? list?.length : 0,
      title: titleRef.current?.value,
      content: textareeRef.current?.value,
      updateDate: Date.now(),
      isPinned: false
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(list ? [...list, currentMemo] : [currentMemo])
    )

    setMemo(storage ? JSON.parse(storage) : null)
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
          <Btn onClick={handleAdd}>メモを追加する</Btn>
          {memo &&
            memo.map((memo) => {
              return (
                <MemoLink
                  memo={memo}
                  key={memo.id}
                  href={`detail/${memo.id}`}
                />
              )
            })}
        </>
      )}
    </Wrapper>
  )
}
