import { animate } from 'framer-motion'
import { RefObject, useEffect } from 'react'

export const useAnimatedNumber = <
  T extends {
    textContent: string | null
  }
>(
  ref: RefObject<T>,
  value: number,
  formatValue: (v: number) => string,
  duration: number = 1.5
) => {
  useEffect(() => {
    const node = ref.current

    if (!node) {
      return
    }

    const controls = animate(0, value, {
      duration,
      onUpdate(value) {
        node.textContent = formatValue(value)
      },
      ease: 'circInOut'
    })

    return () => controls.stop()
  }, [formatValue, ref, value, duration])
}
