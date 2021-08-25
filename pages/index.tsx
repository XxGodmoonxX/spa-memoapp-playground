import { format } from 'date-fns'
import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'

type Memo = {
  title: string | undefined
  content: string | undefined
  updateDate: number | undefined
  isPinned: boolean | undefined
}

const STORAGE_KEY = 'spa-memoapp-playground'

export default function Home() {
  const [memo, setMemo] = useState<Memo[]>()
  const titleRef = useRef<HTMLInputElement>(null)
  const textareeRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const storage = localStorage.getItem(STORAGE_KEY)
    setMemo(storage ? JSON.parse(storage) : null)
  }, [])

  const handleSubmit = () => {
    console.log('handleSubmit')

    const currentMemo: Memo = {
      title: titleRef.current?.value,
      content: textareeRef.current?.value,
      updateDate: Date.now(),
      isPinned: false
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(memo ? [...memo, currentMemo] : [currentMemo])
    )
    const storage = localStorage.getItem(STORAGE_KEY)
    setMemo(storage ? JSON.parse(storage) : null)
  }

  return (
    <>
      <Title>My page</Title>
      {memo &&
        memo.map((memo, index) => {
          return (
            <a href={`detail?${index}`} key={index}>
              title: {memo.title}
              <br />
              content: {memo.content}
              <br />
              updateDate:
              {memo.updateDate &&
                format(memo?.updateDate, 'yyyy/MM/dd kk:mm:ss')}
              isPinned:: {memo.isPinned}
              <br />
            </a>
          )
        })}
      <br />
      <TitleInput type="text" ref={titleRef} />
      <br />
      <Textarea ref={textareeRef} />
      <br />
      <SubmitBtn type="submit" onClick={handleSubmit}>
        Submit
      </SubmitBtn>
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
