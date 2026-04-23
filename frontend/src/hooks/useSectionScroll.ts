import { useEffect, useRef } from 'react'

type Options = {
  sectionSelector: string
  threshold?: number
  durationMs?: number
}

function useSectionScroll({
  sectionSelector,
  threshold = 10,
  durationMs = 700
}: Options) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = containerRef.current

    if (!container) {
      return
    }

    let isAnimating = false
    let unlockTimer: number | null = null

    const sections = Array.from(
      container.querySelectorAll<HTMLElement>(sectionSelector)
    )

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < threshold || isAnimating || sections.length === 0) {
        return
      }

      event.preventDefault()

      const currentTop = container.scrollTop
      const currentIndex = sections.findIndex((_, index) => {
        const nextSection = sections[index + 1]

        if (!nextSection) {
          return true
        }

        return currentTop < nextSection.offsetTop - 20
      })

      const direction = event.deltaY > 0 ? 1 : -1
      const targetIndex = Math.min(
        Math.max(currentIndex + direction, 0),
        sections.length - 1
      )

      if (targetIndex === currentIndex) {
        return
      }

      isAnimating = true
      container.scrollTo({
        top: sections[targetIndex].offsetTop,
        behavior: 'smooth'
      })

      if (unlockTimer) {
        window.clearTimeout(unlockTimer)
      }

      unlockTimer = window.setTimeout(() => {
        isAnimating = false
      }, durationMs)
    }

    container.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      container.removeEventListener('wheel', handleWheel)

      if (unlockTimer) {
        window.clearTimeout(unlockTimer)
      }
    }
  }, [durationMs, sectionSelector, threshold])

  return containerRef
}

export default useSectionScroll
