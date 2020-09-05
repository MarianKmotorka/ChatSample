import { useRef, useEffect } from 'react'

export const useFocusElement = <TRef extends HTMLElement>(...dependencies: any[]) => {
  const ref = useRef<TRef>(null)

  useEffect(() => {
    ref?.current?.focus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies])

  return ref
}
