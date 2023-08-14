import { useState, useRef, useCallback } from "react"

export const useUpdata = () => {
  const [_, _update] = useState<number>(0)
  const ref = useRef<React.Dispatch<React.SetStateAction<number>>>()

  ref.current = _update;

  const update = useCallback(() => {
    ref.current(new Date().getTime())
  }, [])
  return update
}
