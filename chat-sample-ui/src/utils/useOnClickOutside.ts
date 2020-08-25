import { useEffect, useRef } from 'react'

export const useOnClickOutside = <TRef extends HTMLElement>(
  handler: (e: Event) => any
) => {
  const ref = useRef<TRef>(null)

  useEffect(() => {
    const listener = (event: Event) => {
      if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
        return
      }

      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])

  return ref
}

export default useOnClickOutside
