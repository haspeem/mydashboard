'use client'

import { Clock, Eye } from 'lucide-react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { posts, type Post } from '@/lib/data'

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('zh-CN', {
    month: 'long',
    day: 'numeric',
  })
}

function PostCard({ post, featured }: { post: Post; featured?: boolean }) {
  return (
    <article
      className={
        'group overflow-hidden rounded-xl border bg-card transition-colors hover:border-foreground/20 ' +
        (featured ? 'md:col-span-2 md:flex' : '')
      }
    >
      <div
        className={
          'relative aspect-[16/9] overflow-hidden bg-muted ' +
          (featured ? 'md:aspect-auto md:w-1/2' : '')
        }
      >
        <Image
          src={post.cover || '/placeholder.svg'}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className={'flex flex-col p-5 ' + (featured ? 'md:w-1/2 md:justify-center md:p-7' : '')}>
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
        <h3
          className={
            'mt-3 font-semibold tracking-tight text-balance transition-colors group-hover:text-primary ' +
            (featured ? 'text-xl md:text-2xl' : 'text-base')
          }
        >
          {post.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {post.excerpt}
        </p>
        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <span>{formatDate(post.date)}</span>
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" />
            {post.readTime}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="size-3.5" />
            {post.views.toLocaleString()}
          </span>
        </div>
      </div>
    </article>
  )
}

export function BlogFeed() {
  const [featured, ...rest] = posts
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-balance">
          最新文章
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          关于设计、工程与产品的思考。
        </p>
      </header>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <PostCard post={featured} featured />
        {rest.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
