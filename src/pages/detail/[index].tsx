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
  const [existed, setExisted] = useState<boolean>(false)
  const [editing, setEditng] = useState<boolean>(false)
  const titleRef = useRef<HTMLInputElement>(null)
  const textareeRef = useRef<HTMLTextAreaElement>(null)
  const checkboxRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (index) {
      console.log(`index = ${index}`)

      const storage = localStorage.getItem(STORAGE_KEY)
      const item: Memo = storage ? JSON.parse(storage)[Number(index)] : null
      if (item) {
        setExisted(true)
        setMemo(item)
      } else {
        router.push('/')
      }
    }
  }, [index, editing])

  const handleClickEdit = () => {
    console.log('handleClickEdit')
    setEditng(!editing)
  }

  const handleSubmit = () => {
    console.log('handleSubmit')

    if (!memo) {
      router.push('/')
      return
    }

    const currentMemo: Memo = {
      id: memo?.id,
      title: titleRef.current?.value,
      content: textareeRef.current?.value,
      updateDate: Date.now(),
      isPinned: checkboxRef.current?.checked
    }

    const storage = localStorage.getItem(STORAGE_KEY)
    const items: Memo[] = storage ? JSON.parse(storage) : null
    const newItems = items.map((item) => {
      if (item.id === memo.id) {
        return currentMemo
      }

      return item
    })
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...newItems]))
    setEditng(!editing)
  }

  const handleSubmitDelete = () => {
    console.log('handleSubmitDelete')
    const result = confirm('削除いたしますか？')

    if (result) {
      const storage = localStorage.getItem(STORAGE_KEY)
      const item: Memo[] = storage ? JSON.parse(storage) : null
      const newItem = item.filter((_, itemIndex) => Number(index) !== itemIndex)
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...newItem]))
      router.push('/')
    }
  }

  if (!existed) {
    return <></>
  }

  return (
    <>
      {index}
      <br />
      {memo &&
        (editing ? (
          <form name="form">
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
            <DeleteBtn type="button" onClick={handleSubmitDelete}>
              delete
            </DeleteBtn>
            <SubmitBtn type="button" onClick={handleSubmit}>
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

const DeleteBtn = styled.button``
