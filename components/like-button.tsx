'use client'

import { Heart } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export function LikeButton({
  slug,
  initial = 0,
}: {
  slug: string
  initial?: number
}) {
  const [liked, setLiked] = useState(false)
  const [count, setCount] = useState(initial)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(`liked:${slug}`)
    if (stored === '1') setLiked(true)
  }, [slug])

  const toggle = async () => {
    if (loading) return
    setLoading(true)
    const newLiked = !liked
    setLiked(newLiked)
    setCount((c) => (newLiked ? c + 1 : Math.max(0, c - 1)))
    localStorage.setItem(`liked:${slug}`, newLiked ? '1' : '0')

    try {
      const res = await fetch(`/api/likes/${slug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: newLiked ? 'like' : 'unlike' }),
      })
      const data = await res.json()
      if (typeof data.likes === 'number') {
        setCount(Math.max(0, data.likes))
      }
    } catch {
      setCount((c) => (newLiked ? Math.max(0, c - 1) : c + 1))
      setLiked(!newLiked)
      localStorage.setItem(`liked:${slug}`, !newLiked ? '1' : '0')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={loading}
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
