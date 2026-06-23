'use client'

import {
  Archive,
  Hash,
  Home,
  LayoutDashboard,
  Newspaper,
  Sparkles,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ThemeToggle } from '@/components/theme-toggle'
import { ProfileStatus } from '@/components/profile-status'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

export type View = 'home' | 'blog' | 'tags' | 'archive' | 'dashboard'

function SidebarStats() {
  const [views, setViews] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/stats')
      .then((r) => r.json())
      .then((d) => setViews(d.totalViews ?? 0))
      .catch(() => setViews(0))
  }, [])

  return (
    <div className="rounded-lg border bg-card/50 p-3">
      <p className="text-xs text-muted-foreground">总浏览量</p>
      <p className="mt-1 text-lg font-semibold tracking-tight">
        {views === null ? '—' : views.toLocaleString()}
      </p>
      <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
        <span className="font-medium">实时</span>
      </div>
    </div>
  )
}

const navItems: { id: View; label: string; icon: typeof Home }[] = [
  { id: 'home', label: '首页', icon: Home },
  { id: 'blog', label: '博客', icon: Newspaper },
  { id: 'tags', label: '标签', icon: Hash },
  { id: 'archive', label: '归档', icon: Archive },
  { id: 'dashboard', label: '仪表盘', icon: LayoutDashboard },
]

export function Sidebar({
  active,
  onSelect,
}: {
  active: View
  onSelect: (view: View) => void
}) {
  return (
    <div className="flex h-full flex-col gap-2 px-3 py-5">
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-2 pb-4">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Sparkles className="size-4" />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold tracking-tight">haspeem</p>
          <p className="text-xs text-muted-foreground">个人博客</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1">
        <p className="px-3 pb-1 text-xs font-medium text-muted-foreground/70">
          导航
        </p>
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = active === item.id
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={cn(
                'group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-accent text-foreground'
                  : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground',
              )}
            >
              <Icon
                className={cn(
                  'size-4 transition-colors',
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground group-hover:text-foreground',
                )}
              />
              {item.label}
            </button>
          )
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-3">
        {/* Quick stats teaser */}
        <SidebarStats />

        {/* Status bubble + 网龄 */}
        <ProfileStatus />

        {/* Profile */}
        <div className="flex items-center justify-between rounded-lg px-1.5 py-1">
          <div className="flex items-center gap-2.5">
            <Avatar className="size-8">
              <AvatarImage src="/avatar.png" alt="haspeem" />
              <AvatarFallback className="bg-secondary text-xs font-medium">
                HS
              </AvatarFallback>
            </Avatar>
            <div className="leading-tight">
              <p className="text-sm font-medium">haspeem</p>
              <p className="text-xs text-muted-foreground">作者</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
