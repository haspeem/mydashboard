'use client'

import { useEffect, useState } from 'react'

export function ViewTracker({ slug }: { slug: string }) {
  const [views, setViews] = useState<number | null>(null)

  useEffect(() => {
    let aborted = false

    async function track() {
      try {
        const res = await fetch(`/api/views/${slug}`, { method: 'POST' })
        const data = await res.json()
        if (!aborted && typeof data.views === 'number') {
          setViews(data.views)
        }
      } catch {
        if (!aborted) setViews(0)
      }
    }

    track()
    return () => {
      aborted = true
    }
  }, [slug])

  if (views === null) return null

  return (
    <span className="flex items-center gap-1">
      <span>{views.toLocaleString()} 次浏览</span>
    </span>
  )
}
