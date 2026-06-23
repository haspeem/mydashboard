import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { Post } from '@/lib/data'

export function PostNavigation({
  prev,
  next,
}: {
  prev: Post | null
  next: Post | null
}) {
  if (!prev && !next) return null

  return (
    <nav
      aria-label="文章导航"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
    >
      {prev ? (
        <Link
          href={`/blog/${prev.slug}`}
          className="group flex flex-col gap-1 rounded-xl border bg-card/50 p-4 transition-colors hover:border-foreground/20 hover:bg-accent/50"
        >
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            上一篇
          </span>
          <span className="text-sm font-medium text-balance transition-colors group-hover:text-primary">
            {prev.title}
          </span>
        </Link>
      ) : (
        <span aria-hidden className="hidden sm:block" />
      )}
      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="group flex flex-col gap-1 rounded-xl border bg-card/50 p-4 text-right transition-colors hover:border-foreground/20 hover:bg-accent/50"
        >
          <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
            下一篇
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
          <span className="text-sm font-medium text-balance transition-colors group-hover:text-primary">
            {next.title}
          </span>
        </Link>
      ) : null}
    </nav>
  )
}
