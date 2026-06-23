'use client'

import { Heart } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export function LikeButton({ initial = 0 }: { initial?: number }) {
  const [liked, setLiked] = useState(false)
  const [count, setCount] = useState(initial)

  const toggle = () => {
    setLiked((prev) => {
      setCount((c) => (prev ? c - 1 : c + 1))
      return !prev
    })
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={liked}
      aria-label="点赞"
      className={cn(
        'group flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors',
        liked
          ? 'border-primary/30 bg-primary/10 text-primary'
          : 'text-muted-foreground hover:border-foreground/20 hover:text-foreground',
      )}
    >
      <Heart
        className={cn(
          'size-4 transition-transform group-active:scale-90',
          liked && 'fill-current',
        )}
      />
      <span className="tabular-nums">{count}</span>
    </button>
  )
}
