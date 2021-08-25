import { format } from 'date-fns'
import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { Memo } from '../'
import { STORAGE_KEY } from '../../constants'

export default function Detail() {
  const router = useRouter()
  const { index } = router.query
  const [memo, setMemo] = useState<Memo>()
  const [editing, setEditng] = useState<boolean>(false)
  const titleRef = useRef<HTMLInputElement>(null)
  const textareeRef = useRef<HTMLTextAreaElement>(null)
  const checkboxRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (index) {
      console.log(`index = ${index}`)

      const storage = localStorage.getItem(STORAGE_KEY)
      const item: Memo = storage ? JSON.parse(storage)[Number(index)] : null
      if (!item) {
        router.push('/')
      }
      setMemo(item)
    }
  }, [index, editing])

  const handleClickEdit = () => {
    console.log('handleClickEdit')
    setEditng(!editing)
  }

  const handleSubmit = () => {
    console.log('handleSubmit')

    const currentMemo: Memo = {
      title: titleRef.current?.value,
      content: textareeRef.current?.value,
      updateDate: Date.now(),
      isPinned: checkboxRef.current?.checked
    }

    const storage = localStorage.getItem(STORAGE_KEY)
    const item: Memo[] = storage ? JSON.parse(storage) : null
    item.splice(Number(index), 1, currentMemo)
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...item]))
    setEditng(!editing)
  }

  return (
    <>
      {index}
      <br />
      {memo &&
        (editing ? (
          <form name="form">
            {/* updateDate:
            {memo.updateDate && format(memo?.updateDate, 'yyyy/MM/dd kk:mm:ss')}
            isPinned:: {memo.isPinned} */}
            <br />
            title:
            <TitleInput type="text" ref={titleRef} defaultValue={memo.title} />
            <br />
            content:
            <Textarea ref={textareeRef} defaultValue={memo.content} />
            <br />
            <CheckBox
              type="checkbox"
              ref={checkboxRef}
              defaultChecked={memo.isPinned}
            />
            <br />
            <SubmitBtn type="submit" onClick={handleSubmit}>
              Submit
            </SubmitBtn>
            <br />
          </form>
        ) : (
          <>
            title: {memo.title}
            <br />
            content: {memo.content}
            <br />
            updateDate:
            {memo.updateDate && format(memo?.updateDate, 'yyyy/MM/dd kk:mm:ss')}
            <br />
            isPinned: {memo.isPinned ? 'true' : 'false'}
            <br />
            <button type="button" onClick={handleClickEdit}>
              編集
            </button>
          </>
        ))}
    </>
  )
}

const TitleInput = styled.input``

const Textarea = styled.textarea``

const CheckBox = styled.input``

const SubmitBtn = styled.button``
