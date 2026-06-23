'use client'

import { Menu, Sparkles, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Sidebar, type View } from '@/components/sidebar'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'

export function BlogPostShell({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  // 详情页点击侧边栏导航时回到首页对应视图
  const handleSelect = (view: View) => {
    setMobileOpen(false)
    router.push(view === 'home' ? '/' : `/?view=${view}`)
  }

  return (
    <div className="min-h-svh">
      {/* 移动端顶栏 */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b bg-background/80 px-4 py-3 backdrop-blur-md lg:hidden">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="size-4" />
          </div>
          <span className="text-sm font-semibold tracking-tight">haspeem</span>
        </Link>
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

      {/* 移动端抽屉 */}
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
            <Sidebar active="blog" onSelect={handleSelect} />
          </div>
        </div>
      )}

      <div className="mx-auto flex w-full max-w-[1400px]">
        {/* 左侧栏（桌面） */}
        <aside className="sticky top-0 hidden h-svh w-60 shrink-0 border-r bg-sidebar lg:block">
          <Sidebar active="blog" onSelect={handleSelect} />
        </aside>

        {/* 正文区域 */}
        <div className="flex w-full flex-col px-5 py-8 md:px-8 lg:py-10">
          <main className="mx-auto w-full min-w-0 max-w-3xl">{children}</main>
        </div>
      </div>
    </div>
  )
}
