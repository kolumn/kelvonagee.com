import { useEffect, useState } from 'react'
import { cn } from '~/utils/cn'

export default function Sidebar() {
  const [isOpen, toggle] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  return (
    <div
      className={cn('sidebar ', {
        'sidebar--open': isOpen,
      })}
    />
  )
}
