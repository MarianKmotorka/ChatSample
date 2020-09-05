import { useEffect, useRef } from 'react'

export const useScrollTo = <TRef extends HTMLElement>(...deps: any[]) => {
  const ref = useRef<TRef>(null)

  useEffect(() => {
    ref?.current?.scrollIntoView()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, ...deps])

  return ref
}
