'use client'

import { Menu, Sparkles, X } from 'lucide-react'
import { useState } from 'react'
import { BlogFeed } from '@/components/blog-feed'
import { Dashboard } from '@/components/dashboard'
import { RightSidebar } from '@/components/right-sidebar'
import { Sidebar, type View } from '@/components/sidebar'
import { ThemeToggle } from '@/components/theme-toggle'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { posts, tags } from '@/lib/data'
import { cn } from '@/lib/utils'

function TagsView() {
  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">标签</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          按主题浏览所有文章。
        </p>
      </header>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <button
            key={tag.name}
            className="group flex items-center gap-2 rounded-full border bg-card/50 px-4 py-2 text-sm transition-colors hover:border-foreground/20 hover:bg-accent"
          >
            <span className="font-medium">{tag.name}</span>
            <Badge variant="secondary" className="rounded-full px-1.5 text-xs">
              {tag.count}
            </Badge>
          </button>
        ))}
      </div>
    </div>
  )
}

function ArchiveView() {
  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">归档</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          全部 {posts.length} 篇文章，按时间排序。
        </p>
      </header>
      <ul className="flex flex-col">
        {posts.map((post) => (
          <li key={post.id}>
            <a
              href="#"
              className="group flex items-baseline justify-between gap-4 border-b py-4 transition-colors hover:border-foreground/20"
            >
              <span className="text-sm font-medium text-balance transition-colors group-hover:text-primary">
                {post.title}
              </span>
              <span className="shrink-0 font-mono text-xs text-muted-foreground">
                {new Date(post.date).toLocaleDateString('zh-CN')}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function BlogHome() {
  const [view, setView] = useState<View>('home')
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleSelect = (v: View) => {
    setView(v)
    setMobileOpen(false)
  }

  const showRightSidebar = view === 'home' || view === 'blog'

  const content =
    view === 'dashboard' ? (
      <Dashboard />
    ) : view === 'tags' ? (
      <TagsView />
    ) : view === 'archive' ? (
      <ArchiveView />
    ) : (
      <BlogFeed />
    )

  return (
    <div className="min-h-svh">
      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b bg-background/80 px-4 py-3 backdrop-blur-md lg:hidden">
        <div className="flex items-center gap-2.5">
          <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="size-4" />
          </div>
          <span className="text-sm font-semibold tracking-tight">Lumen</span>
        </div>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            aria-label="打开菜单"
            className="size-8"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="size-5" />
          </Button>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-background/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 border-r bg-sidebar shadow-xl">
            <div className="flex justify-end p-2">
              <Button
                variant="ghost"
                size="icon"
                aria-label="关闭菜单"
                className="size-8"
                onClick={() => setMobileOpen(false)}
              >
                <X className="size-5" />
              </Button>
            </div>
            <Sidebar active={view} onSelect={handleSelect} />
          </div>
        </div>
      )}

      <div className="mx-auto flex w-full max-w-[1400px]">
        {/* Left sidebar (desktop) */}
        <aside className="sticky top-0 hidden h-svh w-60 shrink-0 border-r bg-sidebar lg:block">
          <Sidebar active={view} onSelect={handleSelect} />
        </aside>

        {/* Main + right */}
        <div
          className={cn(
            'flex w-full flex-col gap-8 px-5 py-8 md:px-8 lg:flex-row lg:py-10',
          )}
        >
          <main className="min-w-0 flex-1">{content}</main>
          {showRightSidebar && (
            <aside className="w-full shrink-0 lg:w-72">
              <div className="lg:sticky lg:top-10">
                <RightSidebar />
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  )
}
