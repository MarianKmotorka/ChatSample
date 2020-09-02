import { useState, useEffect, useCallback } from 'react'

/**
 * @param text User text imput.
 * @param callback Function that will be called when user starts or stops typing.
 */
export const useIsTyping = (text: string, callback: (isTyping: boolean) => void) => {
  const [isTyping, setIsTyping] = useState(false)
  const memoizedCallback = useCallback(callback, [])

  useEffect(() => {
    text && setIsTyping(true)

    const timeoutId = setTimeout(() => setIsTyping(false), 500)
    return () => clearTimeout(timeoutId)
  }, [text])

  useEffect(() => {
    memoizedCallback(isTyping)
  }, [memoizedCallback, isTyping])
}

export default useIsTyping
