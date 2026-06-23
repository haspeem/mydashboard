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
    title: '用 React Server Components 构建更快的应用',
    excerpt:
      '深入探讨 RSC 的渲染模型，如何减少客户端 JavaScript 体积，并在数据获取上获得更优雅的开发体验。',
    cover: '/covers/cover-1.png',
    date: '2026-06-18',
    readTime: '8 分钟',
    tags: ['React', '性能'],
    views: 4820,
  },
  {
    id: '2',
    title: '设计系统中的玻璃拟态与边框层次',
    excerpt:
      '从 Linear 与 Vercel 的界面中学习如何用细微的边框、模糊与阴影构建有层次但不喧宾夺主的视觉。',
    cover: '/covers/cover-2.png',
    date: '2026-06-12',
    readTime: '6 分钟',
    tags: ['设计', 'UI'],
    views: 3190,
  },
  {
    id: '3',
    title: 'TypeScript 类型体操实战：从入门到放弃再到精通',
    excerpt:
      '通过一系列真实案例，掌握条件类型、映射类型和模板字面量类型，写出既安全又优雅的类型定义。',
    cover: '/covers/cover-3.png',
    date: '2026-06-05',
    readTime: '12 分钟',
    tags: ['TypeScript'],
    views: 5640,
  },
  {
    id: '4',
    title: '我如何用 next-themes 实现完美的暗色模式',
    excerpt:
      '避免闪烁、支持系统偏好、并在服务端渲染下保持一致——这是一份关于暗色模式的完整实践指南。',
    cover: '/covers/cover-4.png',
    date: '2026-05-28',
    readTime: '5 分钟',
    tags: ['Next.js', '设计'],
    views: 2470,
  },
]

export const recentPosts = posts.slice(0, 4)

export type TagItem = { name: string; count: number }

export const tags: TagItem[] = [
  { name: 'React', count: 18 },
  { name: 'TypeScript', count: 14 },
  { name: '设计', count: 11 },
  { name: 'Next.js', count: 9 },
  { name: '性能', count: 7 },
  { name: 'UI', count: 6 },
  { name: 'CSS', count: 5 },
  { name: '工程化', count: 4 },
]

export type StatCard = {
  label: string
  value: string
  change: string
  trend: 'up' | 'down'
}

export const stats: StatCard[] = [
  { label: '文章总数', value: '128', change: '+4', trend: 'up' },
  { label: '总浏览量', value: '92.4k', change: '+12.5%', trend: 'up' },
  { label: '评论数', value: '1,842', change: '+8.1%', trend: 'up' },
  { label: '订阅者', value: '3,210', change: '-1.2%', trend: 'down' },
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
    text: '发布了新文章',
    meta: '用 React Server Components 构建更快的应用',
    time: '2 小时前',
    type: 'post',
  },
  {
    id: 'a2',
    text: '收到新评论',
    meta: '来自 @mira 在《暗色模式实践指南》',
    time: '5 小时前',
    type: 'comment',
  },
  {
    id: 'a3',
    text: '新增 24 位订阅者',
    meta: '本周累计 +138',
    time: '昨天',
    type: 'subscriber',
  },
  {
    id: 'a4',
    text: '文章浏览量突破 5k',
    meta: 'TypeScript 类型体操实战',
    time: '2 天前',
    type: 'view',
  },
  {
    id: 'a5',
    text: '发布了新文章',
    meta: '设计系统中的玻璃拟态与边框层次',
    time: '4 天前',
    type: 'post',
  },
]

export type DayViews = { day: string; views: number }

export const weeklyViews: DayViews[] = [
  { day: '周一', views: 1240 },
  { day: '周二', views: 1890 },
  { day: '周三', views: 1560 },
  { day: '周四', views: 2340 },
  { day: '周五', views: 2010 },
  { day: '周六', views: 2780 },
  { day: '周日', views: 3120 },
]

// 博客的诞生之日（今天）。网龄从这一天开始计算。
export const blogBirthDate = '2026-06-23'

// 作者当前状态（一句话），显示在头像上方的气泡里
export const authorStatus = '正在码字，灵感正旺 ✨'

export const socials = [
  { name: 'GitHub', handle: '@lumen', href: '#' },
  { name: 'Twitter', handle: '@lumen_dev', href: '#' },
  { name: 'RSS', handle: '订阅更新', href: '#' },
]
