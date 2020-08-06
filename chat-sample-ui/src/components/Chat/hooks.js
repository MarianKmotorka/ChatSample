import { useEffect } from 'react'
import { get } from 'lodash'

export const useFocusWhenMounted = elementRef => {
  useEffect(() => {
    const input = get(elementRef, 'current')
    input && input.focus()
  }, [elementRef])
}

export const useScrollTo = (elementRef, deps) => {
  useEffect(() => {
    const message = get(elementRef, 'current')
    message && message.scrollIntoView()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef, ...deps])
}
