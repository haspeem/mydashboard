'use client'

import { Check, Link2, MessageCircle, Twitter } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false)
  const [wechatOpen, setWechatOpen] = useState(false)

  const getUrl = () =>
    typeof window !== 'undefined' ? window.location.href : ''

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getUrl())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // 忽略复制失败
    }
  }

  const handleTwitter = () => {
    const url = encodeURIComponent(getUrl())
    const text = encodeURIComponent(title)
    window.open(
      `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      '_blank',
      'noopener,noreferrer',
    )
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm text-muted-foreground">分享：</span>
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopy}
        className="gap-1.5"
      >
        {copied ? (
          <>
            <Check className="size-4 text-primary" />
            已复制链接
          </>
        ) : (
          <>
            <Link2 className="size-4" />
            复制链接
          </>
        )}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleTwitter}
        className="gap-1.5"
      >
        <Twitter className="size-4" />
        Twitter
      </Button>
      <div className="relative">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setWechatOpen((v) => !v)}
          className="gap-1.5"
        >
          <MessageCircle className="size-4" />
          微信
        </Button>
        {wechatOpen && (
          <div className="absolute bottom-full left-0 z-10 mb-2 w-48 rounded-lg border bg-popover p-3 text-xs text-muted-foreground shadow-md">
            复制本页链接后，在微信中粘贴分享给好友或分享到朋友圈。
          </div>
        )}
      </div>
    </div>
  )
}
