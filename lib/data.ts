export type Post = {
  id: string
  title: string
  excerpt: string
  cover: string
  date: string
  readTime: string
  tags: string[]
  views: number
}

export const posts: Post[] = [
  {
    id: '1',
    title: '即将开始',
    excerpt:
      '博客正在建设中，敬请期待第一篇文章的到来。',
    cover: '/covers/cover-1.png',
    date: '2026-06-23',
    readTime: '1 分钟',
    tags: ['公告'],
    views: 0,
  },
]

export const recentPosts = posts.slice(0, 4)

export type TagItem = { name: string; count: number }

export const tags: TagItem[] = [
  { name: '公告', count: 1 },
]

export type StatCard = {
  label: string
  value: string
  change: string
  trend: 'up' | 'down'
}

export const stats: StatCard[] = [
  { label: '文章总数', value: '1', change: '+1', trend: 'up' },
  { label: '总浏览量', value: '0', change: '0', trend: 'up' },
  { label: '评论数', value: '0', change: '0', trend: 'up' },
  { label: '订阅者', value: '0', change: '0', trend: 'up' },
]

export type Activity = {
  id: string
  text: string
  meta: string
  time: string
  type: 'post' | 'comment' | 'subscriber' | 'view'
}

export const activities: Activity[] = [
  {
    id: 'a1',
    text: '博客上线',
    meta: 'haspeem 的个人博客正式启用',
    time: '今天',
    type: 'post',
  },
]

export type DayViews = { day: string; views: number }

export const weeklyViews: DayViews[] = [
  { day: '周一', views: 0 },
  { day: '周二', views: 0 },
  { day: '周三', views: 0 },
  { day: '周四', views: 0 },
  { day: '周五', views: 0 },
  { day: '周六', views: 0 },
  { day: '周日', views: 0 },
]

// 博客的诞生之日（今天）。网龄从这一天开始计算。
export const blogBirthDate = '2026-06-23'

// 作者当前状态（一句话），显示在头像上方的气泡里
export const authorStatus = '正在码字，灵感正旺 ✨'

export const socials = [
  { name: 'GitHub', handle: '@haspeem', href: 'https://github.com/haspeem' },
]
