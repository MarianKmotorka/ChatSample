import { useState, useEffect } from 'react'

/**
 * @param text User text imput.
 * @param callback Function that will be called when user starts or stops typing.
 */
export const useIsTyping = (text: string, callback: (isTyping: boolean) => void) => {
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    text && setIsTyping(true)

    const timeoutId = setTimeout(() => setIsTyping(false), 500)
    return () => clearTimeout(timeoutId)
  }, [text])

  useEffect(() => {
    callback(isTyping)
  }, [callback, isTyping])
}

export default useIsTyping
