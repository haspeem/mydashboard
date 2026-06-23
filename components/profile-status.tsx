'use client'

import { useEffect, useState } from 'react'
import { Cake } from 'lucide-react'
import { authorStatus, blogBirthDate } from '@/lib/data'

function getSiteAge(birth: string) {
  const start = new Date(birth)
  const now = new Date()
  const diffMs = now.getTime() - start.getTime()
  const totalDays = Math.max(0, Math.floor(diffMs / 86_400_000))
  const years = Math.floor(totalDays / 365)
  const days = totalDays - years * 365
  return { totalDays, years, days }
}

function formatAge(birth: string) {
  const { totalDays, years, days } = getSiteAge(birth)
  if (totalDays === 0) return '今天诞生 · 第 1 天'
  if (years > 0) return `已运行 ${years} 年 ${days} 天`
  return `已运行 ${totalDays} 天`
}

export function ProfileStatus() {
  const [ageText, setAgeText] = useState<string | null>(null)

  useEffect(() => {
    setAgeText(formatAge(blogBirthDate))
    const timer = setInterval(
      () => setAgeText(formatAge(blogBirthDate)),
      60_000,
    )
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col gap-2">
      {/* 状态气泡 */}
      <div className="relative ml-1.5 w-fit max-w-full rounded-2xl rounded-bl-sm border bg-card px-3 py-1.5 text-xs text-foreground shadow-sm">
        <span className="flex items-center gap-1.5">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
          </span>
          <span className="truncate">{authorStatus}</span>
        </span>
        {/* 气泡小尾巴 */}
        <span className="absolute -bottom-1 left-3 size-2 rotate-45 border-b border-r bg-card" />
      </div>

      {/* 网龄 */}
      <div className="flex items-center gap-1.5 px-2 text-xs text-muted-foreground">
        <Cake className="size-3.5 text-primary" />
        <span>{ageText ?? '正在计算网龄…'}</span>
      </div>
    </div>
  )
}
