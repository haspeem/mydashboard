'use client'

import { useEffect, useState } from 'react'
import { Cake } from 'lucide-react'
import { authorStatus, blogBirthDate } from '@/lib/data'

// 按真实日历计算网龄：年 / 月 / 天，而非固定 365 天
function getSiteAge(birth: string) {
  const start = new Date(birth)
  const now = new Date()
  const totalDays = Math.max(
    0,
    Math.floor((now.getTime() - start.getTime()) / 86_400_000),
  )

  let years = now.getFullYear() - start.getFullYear()
  let months = now.getMonth() - start.getMonth()
  let days = now.getDate() - start.getDate()

  if (days < 0) {
    months -= 1
    // 上个月的天数
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0)
    days += prevMonth.getDate()
  }
  if (months < 0) {
    years -= 1
    months += 12
  }

  return { totalDays, years, months, days }
}

function formatAge(birth: string) {
  const { totalDays, years, months, days } = getSiteAge(birth)
  if (totalDays === 0) return '今天诞生 · 第 1 天'
  if (years > 0) return `已运行 ${years} 年 ${months} 个月 ${days} 天`
  if (months > 0) return `已运行 ${months} 个月 ${days} 天`
  return `已运行 ${totalDays} 天`
}

function formatBirth(birth: string) {
  const d = new Date(birth)
  return `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日诞生`
}

export function ProfileStatus() {
  const [ageText, setAgeText] = useState<string | null>(null)
  const [totalDays, setTotalDays] = useState<number | null>(null)

  useEffect(() => {
    const update = () => {
      setAgeText(formatAge(blogBirthDate))
      setTotalDays(getSiteAge(blogBirthDate).totalDays)
    }
    update()
    const timer = setInterval(update, 60_000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col">
      {/* 状态气泡 */}
      <div className="group relative mb-3 ml-1.5 w-fit max-w-full rounded-2xl rounded-bl-sm border bg-card px-3 py-1.5 text-xs text-foreground shadow-sm transition-colors hover:bg-accent/60">
        <span className="flex items-center gap-1.5">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
          </span>
          <span className="truncate">{authorStatus}</span>
        </span>
        {/* 气泡小尾巴 */}
        <span className="absolute -bottom-1 left-3 size-2 rotate-45 border-b border-r bg-card transition-colors group-hover:bg-accent/60" />
      </div>

      {/* 网龄 —— 独立一行，用分隔线与气泡区分开 */}
      <div
        className="flex items-center gap-1.5 border-t px-2 pt-3 text-xs text-muted-foreground"
        title={
          totalDays !== null
            ? `${formatBirth(blogBirthDate)} · 共 ${totalDays} 天`
            : undefined
        }
      >
        <Cake className="size-3.5 shrink-0 text-primary" />
        <span className="truncate">{ageText ?? '正在计算网龄…'}</span>
      </div>
    </div>
  )
}
