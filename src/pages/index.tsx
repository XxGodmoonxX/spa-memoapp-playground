import { format } from 'date-fns'
import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { STORAGE_KEY } from '../constants'

export type Memo = {
  id: number
  title: string | undefined
  content: string | undefined
  updateDate: number
  isPinned: boolean | undefined
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

    list.sort((a, b) => {
      return b.updateDate - a.updateDate
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
    <>
      <Title>My page</Title>
      {memo &&
        memo.map((memo, index) => {
          return (
            <a href={`detail/${memo.id}`} key={index}>
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
        <TitleInput type="text" ref={titleRef} />
        <br />
        <Textarea ref={textareeRef} />
        <br />
        <SubmitBtn type="submit" onClick={handleSubmit}>
          Submit
        </SubmitBtn>
      </form>
    </>
  )
}

const Title = styled.h1`
  color: red;
  font-size: 50px;
`

const TitleInput = styled.input``

const Textarea = styled.textarea``

const SubmitBtn = styled.button``
