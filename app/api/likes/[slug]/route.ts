import { NextRequest, NextResponse } from 'next/server'
import { getLikes, incrLikes, decrLikes } from '@/lib/kv'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const likes = await getLikes(slug)
  return NextResponse.json({ slug, likes })
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const body = await req.json().catch(() => ({}))
  const action = body.action === 'unlike' ? 'unlike' : 'like'

  const likes =
    action === 'like' ? await incrLikes(slug) : await decrLikes(slug)

  return NextResponse.json({ slug, likes })
}
