import { format } from 'date-fns'
import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { Btn } from '../components/atoms/btn'
import { Textarea } from '../components/atoms/textArea'
import { TitleInput } from '../components/atoms/titleInput'
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
  }

  return (
    <Wrapper>
      <Title>My page</Title>
      {memo &&
        memo.map((memo) => {
          return (
            <a href={`detail/${memo.id}`} key={memo.id}>
              id:{memo.id}
              <br />
              title: {memo.title}
              <br />
              content: {memo.content}
              <br />
              updateDate:
              {memo.updateDate &&
                format(memo?.updateDate, 'yyyy/MM/dd kk:mm:ss')}
              <br />
              isPinned: {memo.isPinned ? 'true' : 'false'}
              <br />
            </a>
          )
        })}
      <br />
      <form name="form">
        <TitleInput inputRef={titleRef} />
        <br />
        <Textarea ref={textareeRef} />
        <br />
        <Btn action="submit" onClick={handleSubmit}>
          Submit
        </Btn>
      </form>
    </Wrapper>
  )
}

const Title = styled.h1`
  color: red;
  font-size: 50px;
`
