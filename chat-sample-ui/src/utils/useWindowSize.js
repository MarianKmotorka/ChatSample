import { useEffect, useState, useCallback } from 'react'

const XS = 640
const SM = 768
const MD = 1024
const LG = 1280

export const useWindowSize = () => {
  const isClient = typeof window === 'object'

  const getSize = useCallback(
    () => ({
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
      xs: window.innerWidth < XS,
      sm: window.innerWidth > XS && window.innerWidth < SM,
      md: window.innerWidth > SM && window.innerWidth < MD,
      lg: window.innerWidth > MD && window.innerWidth < LG,
      xl: window.innerWidth > LG
    }),
    [isClient]
  )

  const [windowSize, setWindowSize] = useState(getSize)

  useEffect(() => {
    if (!isClient) return false

    const handleResize = () => {
      setWindowSize(getSize())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [getSize, isClient])

  return windowSize
}
