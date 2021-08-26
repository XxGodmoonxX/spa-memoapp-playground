export const keys = ['spa-memoapp-playground'] as const
export type Key = typeof keys[number]

/**
 * 渡すキーがkeysと部分一致するか
 */
const checkKeyIsValid = (key: string) => {
  return keys.some((item) => key === item)
}

export const getStorage = (key: Key) => {
  const isValid = checkKeyIsValid(key)

  if (isValid) {
    const storage = localStorage.getItem(key)
    return storage
  } else {
    console.error('LocalStorageエラー そのキーは存在していません')
  }
}

export const setStorage = (key: Key, item: string) => {
  const isValid = checkKeyIsValid(key)

  if (isValid) {
    const storage = localStorage.setItem(key, item)
    return storage
  } else {
    console.error('LocalStorageエラー そのキーは存在していません')
  }
}
