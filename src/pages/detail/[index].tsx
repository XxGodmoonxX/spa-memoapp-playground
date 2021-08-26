import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { Btn } from '../../components/atoms/btn'
import { CheckBox } from '../../components/atoms/checkbox'
import { Text } from '../../components/atoms/text'
import { Textarea } from '../../components/atoms/textArea'
import { Title } from '../../components/atoms/title'
import { TitleInput } from '../../components/atoms/titleInput'
import { FormWrapper } from '../../components/molecules/formWrapper'
import { MemoLink, Memo } from '../../components/molecules/memoLink'
import { Wrapper } from '../../components/organisms/wrapper'
import { PATH } from '../../utils/routes'
import { getStorage, setStorage } from '../../utils/storage'

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

      const storage = getStorage('spa-memoapp-playground')
      const item: Memo | null = storage
        ? JSON.parse(storage).filter(
            (item: Memo) => item.id === Number(index)
          )[0]
        : null
      if (item) {
        setExisted(true)
        setMemo(item)
      } else {
        router.push(PATH.NOTFOUND)
      }
    }
  }, [index, editing])

  const handleClickEdit = () => {
    setEditng(!editing)
  }

  const handleSubmit = () => {
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

    const storage = getStorage('spa-memoapp-playground')
    const items: Memo[] = storage ? JSON.parse(storage) : null
    const newItems = items.map((item) => {
      if (item.id === memo.id) {
        return currentMemo
      }

      return item
    })

    setStorage('spa-memoapp-playground', JSON.stringify([...newItems]))
    setEditng(!editing)
  }

  const handleSubmitDelete = () => {
    const result = confirm('削除いたしますか？')

    if (result) {
      const storage = getStorage('spa-memoapp-playground')
      const item: Memo[] = storage ? JSON.parse(storage) : null
      const newItem = item.filter((item) => Number(index) !== item.id)
      setStorage('spa-memoapp-playground', JSON.stringify([...newItem]))
      router.push(PATH.HOME)
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
      <Title>メモ詳細</Title>

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
            <Container>
              <MemoLink memo={memo} isDetail />
            </Container>
            <Btn action="edit" onClick={handleClickEdit}>
              メモを編集する
            </Btn>
            <Btn
              action="back"
              onClick={() => {
                router.push(PATH.HOME)
              }}
            >
              一覧へ戻る
            </Btn>
          </>
        ))}
    </Wrapper>
  )
}

const Container = styled.div`
  margin-top: 40px;
`
