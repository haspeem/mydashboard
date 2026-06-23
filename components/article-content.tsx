'use client'

import { Check, Copy, X } from 'lucide-react'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import { cn } from '@/lib/utils'

function extractText(node: React.ReactNode): string {
  if (typeof node === 'string') return node
  if (Array.isArray(node)) return node.map(extractText).join('')
  if (node && typeof node === 'object' && 'props' in node) {
    // @ts-expect-error - 递归读取子节点文本
    return extractText(node.props?.children)
  }
  return ''
}

function CodeBlock({ children }: { children: React.ReactNode }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const text = extractText(children)
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // 忽略复制失败
    }
  }

  return (
    <div className="group relative my-6 overflow-hidden rounded-xl border bg-card">
      <button
        type="button"
        onClick={handleCopy}
        aria-label="复制代码"
        className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-md border bg-background/80 px-2 py-1 text-xs text-muted-foreground opacity-0 backdrop-blur transition-opacity hover:text-foreground group-hover:opacity-100"
      >
        {copied ? (
          <>
            <Check className="size-3.5 text-primary" />
            已复制
          </>
        ) : (
          <>
            <Copy className="size-3.5" />
            复制
          </>
        )}
      </button>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        {children}
      </pre>
    </div>
  )
}

function ZoomImage({ src, alt }: { src?: string; alt?: string }) {
  const [open, setOpen] = useState(false)
  if (!src) return null

  return (
    <>
      <img
        src={src || '/placeholder.svg'}
        alt={alt ?? ''}
        loading="lazy"
        onClick={() => setOpen(true)}
        className="my-6 w-full cursor-zoom-in rounded-xl border transition-opacity hover:opacity-90"
      />
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-background/90 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            aria-label="关闭"
            className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full border bg-card text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="size-5" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src || '/placeholder.svg'}
            alt={alt ?? ''}
            className="max-h-[90vh] max-w-full cursor-zoom-out rounded-lg object-contain"
          />
        </div>
      )}
    </>
  )
}

export function ArticleContent({ content }: { content: string }) {
  return (
    <div
      className={cn(
        'prose prose-neutral max-w-none dark:prose-invert',
        'prose-headings:scroll-mt-20 prose-headings:font-semibold prose-headings:tracking-tight',
        'prose-a:text-primary prose-a:no-underline hover:prose-a:underline',
        'prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground',
        'prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:font-normal prose-code:before:content-none prose-code:after:content-none',
        'prose-pre:m-0 prose-pre:bg-transparent prose-pre:p-0',
        'prose-img:my-0',
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
          img: ({ src, alt }) => (
            <ZoomImage src={typeof src === 'string' ? src : undefined} alt={alt} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
