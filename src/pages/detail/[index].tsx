import { format } from 'date-fns'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Memo } from '../'
import { STORAGE_KEY } from '../../constants'

export default function Detail() {
  const router = useRouter()
  const { index } = router.query
  const [memo, setMemo] = useState<Memo>()

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
  }, [index])

  return (
    <>
      {index}
      <br />
      {memo && (
        <>
          title: {memo.title}
          <br />
          content: {memo.content}
          <br />
          updateDate:
          {memo.updateDate && format(memo?.updateDate, 'yyyy/MM/dd kk:mm:ss')}
          isPinned:: {memo.isPinned}
          <br />
        </>
      )}
    </>
  )
}
