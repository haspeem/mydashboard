'use client'

import Giscus from '@giscus/react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { giscusConfig } from '@/lib/data'

function CommentsSkeleton() {
  return (
    <div className="flex flex-col gap-4" aria-hidden>
      <div className="h-24 w-full animate-pulse rounded-xl border bg-muted/50" />
      <div className="flex gap-3">
        <div className="size-9 shrink-0 animate-pulse rounded-full bg-muted/50" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-1/3 animate-pulse rounded bg-muted/50" />
          <div className="h-3 w-2/3 animate-pulse rounded bg-muted/50" />
        </div>
      </div>
      <div className="flex gap-3">
        <div className="size-9 shrink-0 animate-pulse rounded-full bg-muted/50" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-1/4 animate-pulse rounded bg-muted/50" />
          <div className="h-3 w-1/2 animate-pulse rounded bg-muted/50" />
        </div>
      </div>
    </div>
  )
}

export function Comments() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => setMounted(true), [])

  // 监听 giscus iframe 加载完成的消息
  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event.origin !== 'https://giscus.app') return
      if (event.data?.giscus) setLoaded(true)
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  const configured = Boolean(giscusConfig.repoId && giscusConfig.categoryId)

  return (
    <section aria-label="评论区" className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold tracking-tight">参与讨论</h2>

      {!configured ? (
        <div className="rounded-xl border bg-card/50 p-5 text-sm text-muted-foreground">
          评论区基于 GitHub Discussions（Giscus）。请在{' '}
          <a
            href="https://giscus.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            giscus.app
          </a>{' '}
          生成 <code className="rounded bg-muted px-1">repoId</code> 与{' '}
          <code className="rounded bg-muted px-1">categoryId</code>，填入{' '}
          <code className="rounded bg-muted px-1">lib/data.ts</code> 的{' '}
          <code className="rounded bg-muted px-1">giscusConfig</code> 即可启用。
        </div>
      ) : (
        <div className="relative min-h-[160px]">
          {!loaded && (
            <div className="absolute inset-0">
              <CommentsSkeleton />
            </div>
          )}
          {mounted && (
            <div className={loaded ? 'opacity-100' : 'opacity-0'}>
              <Giscus
                repo={giscusConfig.repo}
                repoId={giscusConfig.repoId}
                category={giscusConfig.category}
                categoryId={giscusConfig.categoryId}
                mapping={giscusConfig.mapping}
                strict="0"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
                lang="zh-CN"
                loading="lazy"
              />
            </div>
          )}
        </div>
      )}
    </section>
  )
}
