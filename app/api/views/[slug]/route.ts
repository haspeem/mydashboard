import { NextRequest, NextResponse } from 'next/server'
import { getViews, incrViews, trackUV } from '@/lib/kv'
import { posts } from '@/lib/data'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const views = await getViews(slug)
  return NextResponse.json({ slug, views })
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const exists = posts.some((p) => p.slug === slug)
  if (!exists) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 })
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'

  const [views, _uv] = await Promise.all([
    incrViews(slug),
    trackUV(ip),
  ])

  return NextResponse.json({ slug, views })
}
