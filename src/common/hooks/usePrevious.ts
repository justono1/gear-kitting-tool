import { useEffect, useRef } from 'react'

export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>(null)
  useEffect(() => {
    ref.current = value
  }, [value])

  if (ref.current) {
    return ref.current
  }
}
