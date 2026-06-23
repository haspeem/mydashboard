import { NextResponse } from 'next/server'
import {
  getTotalViews,
  getTotalUV,
  getTotalLikes,
  getAllViews,
  getDailyViewsLast7Days,
} from '@/lib/kv'
import { posts } from '@/lib/data'

export async function GET() {
  const slugs = posts.map((p) => p.slug)

  const [
    totalViews,
    totalUV,
    totalLikes,
    articleViews,
    dailyViews,
  ] = await Promise.all([
    getTotalViews(),
    getTotalUV(),
    getTotalLikes(),
    getAllViews(slugs),
    getDailyViewsLast7Days(),
  ])

  return NextResponse.json({
    totalViews,
    totalUV,
    totalLikes,
    postCount: posts.length,
    articleViews,
    dailyViews,
  })
}
