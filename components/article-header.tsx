import { ChevronRight, Clock, Eye } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ViewTracker } from '@/components/view-tracker'
import { author, type Post } from '@/lib/data'

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function ArticleHeader({
  post,
  initialViews,
}: {
  post: Post
  initialViews?: number
}) {
  return (
    <header className="flex flex-col gap-6">
      {/* 面包屑（移动端隐藏） */}
      <nav
        aria-label="面包屑"
        className="hidden items-center gap-1.5 text-sm text-muted-foreground sm:flex"
      >
        <Link href="/" className="transition-colors hover:text-foreground">
          首页
        </Link>
        <ChevronRight className="size-3.5 shrink-0" />
        <Link
          href="/?view=blog"
          className="transition-colors hover:text-foreground"
        >
          博客
        </Link>
        <ChevronRight className="size-3.5 shrink-0" />
        <span className="truncate text-foreground">{post.title}</span>
      </nav>

      {/* 标签 */}
      <div className="flex flex-wrap items-center gap-2">
        {post.tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="rounded-full text-xs font-normal"
          >
            {tag}
          </Badge>
        ))}
      </div>

      {/* 标题 */}
      <h1 className="text-3xl font-bold tracking-tight text-balance md:text-4xl">
        {post.title}
      </h1>

      {/* 元信息 */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
        <span>{formatDate(post.date)}</span>
        <span className="flex items-center gap-1">
          <Clock className="size-3.5" />
          {post.readTime}
        </span>
        <span className="flex items-center gap-1">
          <Eye className="size-3.5" />
          {typeof initialViews === 'number' ? (
            <>
              {initialViews.toLocaleString()} 次浏览
              <ViewTracker slug={post.slug} />
            </>
          ) : (
            <ViewTracker slug={post.slug} />
          )}
        </span>
      </div>

      {/* 作者信息卡 */}
      <div className="flex items-center gap-3 rounded-xl border bg-card/50 p-4">
        <Avatar className="size-10">
          <AvatarImage src={author.avatar} alt={author.name} />
          <AvatarFallback className="bg-secondary text-xs font-medium">
            HS
          </AvatarFallback>
        </Avatar>
        <div className="leading-tight">
          <p className="text-sm font-medium">{author.name}</p>
          <p className="text-xs text-muted-foreground">
            {author.role} · {author.bio}
          </p>
        </div>
      </div>

      {/* 封面图 */}
      {post.cover && (
        <div className="relative aspect-[16/9] overflow-hidden rounded-xl border bg-muted">
          <Image
            src={post.cover || '/placeholder.svg'}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
      )}
    </header>
  )
}
