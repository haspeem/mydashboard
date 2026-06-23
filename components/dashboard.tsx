'use client'

import {
  ArrowDownRight,
  ArrowUpRight,
  Eye,
  FileText,
  MessageSquare,
  TrendingUp,
  UserPlus,
  Users,
} from 'lucide-react'
import { activities, stats, weeklyViews, type Activity } from '@/lib/data'
import { cn } from '@/lib/utils'

const activityIcon: Record<Activity['type'], typeof FileText> = {
  post: FileText,
  comment: MessageSquare,
  subscriber: UserPlus,
  view: Eye,
}

const statIcon = [FileText, Eye, MessageSquare, Users]

function StatsCards() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat, i) => {
        const Icon = statIcon[i]
        const up = stat.trend === 'up'
        return (
          <div
            key={stat.label}
            className="rounded-xl border bg-card/50 p-4 transition-colors hover:border-foreground/20"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <span className="flex size-8 items-center justify-center rounded-lg bg-accent text-primary">
                <Icon className="size-4" />
              </span>
            </div>
            <p className="mt-3 text-2xl font-semibold tracking-tight">
              {stat.value}
            </p>
            <div
              className={cn(
                'mt-1 flex items-center gap-1 text-xs',
                up ? 'text-emerald-500' : 'text-destructive',
              )}
            >
              {up ? (
                <ArrowUpRight className="size-3.5" />
              ) : (
                <ArrowDownRight className="size-3.5" />
              )}
              <span className="font-medium">{stat.change}</span>
              <span className="text-muted-foreground">本月</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function WeeklyChart() {
  const max = Math.max(...weeklyViews.map((d) => d.views))
  const total = weeklyViews.reduce((acc, d) => acc + d.views, 0)
  return (
    <div className="rounded-xl border bg-card/50 p-5">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium">每周浏览量</h3>
          <p className="mt-1 text-2xl font-semibold tracking-tight">
            {total.toLocaleString()}
          </p>
        </div>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <span className="font-medium">0%</span>
        </span>
      </div>
      <div className="mt-6 flex items-end justify-between gap-2 sm:gap-3">
        {weeklyViews.map((d) => (
          <div
            key={d.day}
            className="group flex flex-1 flex-col items-center gap-2"
          >
            <div className="flex h-40 w-full items-end">
              <div
                className="relative w-full rounded-t-md bg-primary/80 transition-all duration-300 group-hover:bg-primary"
                style={{ height: `${(d.views / max) * 100}%` }}
              >
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-medium text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                  {d.views.toLocaleString()}
                </span>
              </div>
            </div>
            <span className="text-xs text-muted-foreground">{d.day}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ActivityTimeline() {
  return (
    <div className="rounded-xl border bg-card/50 p-5">
      <h3 className="text-sm font-medium">近期动态</h3>
      <ol className="mt-4 flex flex-col">
        {activities.map((a, i) => {
          const Icon = activityIcon[a.type]
          const isLast = i === activities.length - 1
          return (
            <li key={a.id} className="relative flex gap-3 pb-5 last:pb-0">
              {!isLast && (
                <span className="absolute left-[15px] top-8 h-full w-px bg-border" />
              )}
              <span className="z-10 flex size-8 shrink-0 items-center justify-center rounded-full border bg-card text-muted-foreground">
                <Icon className="size-4" />
              </span>
              <div className="pt-1">
                <p className="text-sm">
                  <span className="font-medium">{a.text}</span>
                </p>
                <p className="text-xs text-muted-foreground">{a.meta}</p>
                <p className="mt-0.5 text-xs text-muted-foreground/70">
                  {a.time}
                </p>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">仪表盘</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          博客数据概览与近期动态。
        </p>
      </header>

      <StatsCards />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <WeeklyChart />
        </div>
        <div className="lg:col-span-2">
          <ActivityTimeline />
        </div>
      </div>
    </div>
  )
}
