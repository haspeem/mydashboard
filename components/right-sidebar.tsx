'use client'

import { ArrowUpRight, Search } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { recentPosts, socials, tags } from '@/lib/data'

function Widget({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-xl border bg-card/50 p-4">
      <h3 className="mb-3 text-xs font-medium tracking-wide text-muted-foreground/80 uppercase">
        {title}
      </h3>
      {children}
    </section>
  )
}

export function RightSidebar() {
  return (
    <div className="flex flex-col gap-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="搜索文章…"
          className="h-10 bg-card/50 pl-9 text-sm"
        />
      </div>

      {/* Recent posts */}
      <Widget title="近期文章">
        <ul className="flex flex-col gap-3">
          {recentPosts.map((post) => (
            <li key={post.id}>
              <a
                href="#"
                className="group flex flex-col gap-0.5"
              >
                <span className="text-sm font-medium leading-snug text-balance transition-colors group-hover:text-primary">
                  {post.title}
                </span>
                <span className="text-xs text-muted-foreground">
                  {post.readTime} · {post.views.toLocaleString()} 阅读
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Widget>

      {/* Tag cloud */}
      <Widget title="标签云">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag.name}
              variant="secondary"
              className="cursor-pointer rounded-full font-normal transition-colors hover:bg-accent hover:text-foreground"
            >
              {tag.name}
              <span className="ml-1 text-muted-foreground">{tag.count}</span>
            </Badge>
          ))}
        </div>
      </Widget>

      {/* Socials */}
      <Widget title="关注我">
        <ul className="flex flex-col gap-1">
          {socials.map((s) => (
            <li key={s.name}>
              <a
                href={s.href}
                className="group flex items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-accent"
              >
                <span className="font-medium">{s.name}</span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  {s.handle}
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Widget>
    </div>
  )
}
