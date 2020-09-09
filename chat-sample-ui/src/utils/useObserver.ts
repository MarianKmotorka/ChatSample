import { useCallback, useRef, useState, useEffect } from 'react'

/**
 * @param observeAfter Time in ms after which starts observing
 * @param observeAfterDeps When any of the observeAfterDeps changes observeAfter is restarted
 */
export const useObserver = <TElement extends HTMLElement>(
  canObserve: boolean,
  callback: () => any,
  observeAfter: number = 0,
  ...observeAfterDeps: any[]
) => {
  const observer = useRef<IntersectionObserver>()
  const [startObserving, setStartObserving] = useState(false)

  useEffect(() => {
    if (observeAfter === 0) return setStartObserving(true)

    const id = setTimeout(() => setStartObserving(true), observeAfter)
    return () => {
      clearTimeout(id)
      setStartObserving(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [observeAfter, ...observeAfterDeps])

  const observe = useCallback(
    (node: TElement) => {
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && canObserve && startObserving) {
          callback()
        }
      })
      if (node) observer.current.observe(node)
    },
    [callback, canObserve, startObserving]
  )

  return observe
}

export default useObserver
