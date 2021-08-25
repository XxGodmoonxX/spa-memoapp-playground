import { format } from 'date-fns'
import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react'
import { Memo } from '../'
import { Btn } from '../../components/atoms/btn'
import { CheckBox } from '../../components/atoms/checkbox'
import { Text } from '../../components/atoms/text'
import { Textarea } from '../../components/atoms/textArea'
import { TitleInput } from '../../components/atoms/titleInput'
import { FormWrapper } from '../../components/molecules/formWrapper'
import { Wrapper } from '../../components/organisms/wrapper'
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
        router.push('/404')
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
      return
    }

    const currentMemo: Memo = {
      id: memo?.id,
      title: titleRef.current?.value,
      content: textareeRef.current?.value,
      updateDate: Date.now(),
      isPinned: checkboxRef.current?.checked ? true : false
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
    } else {
      setEditng(!editing)
    }
  }

  const handleBack = () => {
    setEditng(!editing)
  }

  if (!existed) {
    return <></>
  }

  return (
    <Wrapper>
      {memo &&
        (editing ? (
          <>
            <FormWrapper>
              <Text>タイトル</Text>
              <TitleInput inputRef={titleRef} defaultValue={memo.title} />
              <Text>内容</Text>
              <Textarea ref={textareeRef} defaultValue={memo.content} />
              <CheckBox
                checkboxRef={checkboxRef}
                defaultChecked={memo.isPinned}
                labelText="ピン留めする"
              />
              <Btn action="submit" onClick={handleSubmit}>
                上記内容でメモを更新する
              </Btn>
              <Btn action="delete" onClick={handleSubmitDelete}>
                メモを削除する
              </Btn>
            </FormWrapper>
            <Btn action="back" onClick={handleBack}>
              戻る
            </Btn>
          </>
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
            <Btn action="edit" onClick={handleClickEdit}>
              メモを編集する
            </Btn>
          </>
        ))}
    </Wrapper>
  )
}
