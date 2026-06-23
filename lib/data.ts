export type Post = {
  id: string
  slug: string
  title: string
  excerpt: string
  cover: string
  date: string
  readTime: string
  tags: string[]
  views: number
  content: string
}

export const author = {
  name: 'haspeem',
  role: '作者',
  avatar: '/avatar.png',
  bio: '记录设计、工程与产品路上的思考。',
}

export const posts: Post[] = [
  {
    id: '1',
    slug: 'hello-world',
    title: '即将开始',
    excerpt: '博客正在建设中，敬请期待第一篇文章的到来。',
    cover: '/covers/cover-1.png',
    date: '2026-06-23',
    readTime: '1 分钟',
    tags: ['公告'],
    views: 0,
    content: `## 你好，世界

这是 **haspeem** 个人博客的第一篇文章。博客刚刚诞生，未来这里会记录我在设计、工程与产品方面的思考与实践。

### 这里会有什么

- 技术笔记与踩坑记录
- 产品与设计的观察
- 一些工具与效率心得

> 写作是把模糊的想法变清晰的过程。

### 一段示例代码

\`\`\`ts
function greet(name: string) {
  return \`Hello, \${name}!\`
}

console.log(greet('world'))
\`\`\`

感谢你的到来，敬请期待后续的更新。`,
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

// Giscus 评论区配置（基于 GitHub Discussions）。
// repoId 与 categoryId 需在 https://giscus.app 生成后填入，留空时评论区会提示未配置。
export const giscusConfig = {
  repo: 'haspeem/mydashboard' as `${string}/${string}`,
  repoId: '',
  category: 'Announcements',
  categoryId: '',
  mapping: 'pathname' as const,
}

// 根据 slug 获取单篇文章
export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug)
}

// 获取全部 slug，供 generateStaticParams 使用
export function getAllSlugs(): string[] {
  return posts.map((post) => post.slug)
}

// 获取上一篇 / 下一篇（按数组顺序）
export function getAdjacentPosts(slug: string): {
  prev: Post | null
  next: Post | null
} {
  const index = posts.findIndex((post) => post.slug === slug)
  if (index === -1) return { prev: null, next: null }
  return {
    prev: index > 0 ? posts[index - 1] : null,
    next: index < posts.length - 1 ? posts[index + 1] : null,
  }
}
