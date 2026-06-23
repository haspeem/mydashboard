# haspeem — 个人博客 & 仪表盘

一个基于 Next.js 的个人博客与数据仪表盘，支持文章浏览、点赞、评论、实时数据统计。

## 技术栈

- **框架**: Next.js 16 (App Router, TypeScript, Turbopack)
- **样式**: Tailwind CSS 4 + shadcn/ui
- **内容**: Markdown 渲染 (react-markdown + remark-gfm + rehype-highlight)
- **评论**: Giscus (基于 GitHub Discussions)
- **数据统计**: Upstash Redis (Vercel KV) — 浏览量、点赞数、访客数
- **部署**: Vercel
- **包管理**: pnpm

## 功能

- 首页博客文章列表（卡片式布局）
- 文章详情页（Markdown 渲染、代码高亮、代码复制）
- 点赞与分享（复制链接 / Twitter）
- 上一篇 / 下一篇导航
- Giscus 评论区（跟随暗色模式）
- 仪表盘（文章数、总浏览量、点赞数、访客数实时统计）
- 侧边栏状态气泡与博客网龄
- 暗色 / 亮色模式切换
- 响应式设计（移动端抽屉菜单）

## 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

打开 http://localhost:3000

### 环境变量

在项目根目录创建 `.env.local`（已在 .gitignore 中忽略）：

```env
KV_REST_API_URL=https://your-upstash-url.upstash.io
KV_REST_API_TOKEN=your-token
```

> 未配置时自动降级为内存存储，不影响开发调试。

## 项目结构

```
app/
├── layout.tsx              # 根布局（主题、字体、SEO）
├── page.tsx                # 首页入口
├── blog/[slug]/page.tsx    # 文章详情页路由
├── api/
│   ├── views/[slug]/       # 浏览量 API（GET/POST）
│   ├── likes/[slug]/       # 点赞 API（GET/POST）
│   └── stats/              # 全站统计 API

components/
├── blog-home.tsx           # 首页容器（视图切换）
├── blog-feed.tsx           # 文章列表
├── blog-post-shell.tsx     # 文章详情页布局
├── article-header.tsx      # 文章头部（标题、元信息、作者）
├── article-content.tsx     # 文章正文（Markdown + 代码高亮）
├── comments.tsx            # Giscus 评论区
├── like-button.tsx         # 点赞按钮
├── share-buttons.tsx       # 分享按钮
├── post-navigation.tsx     # 上下篇导航
├── view-tracker.tsx        # 浏览量追踪
├── dashboard.tsx           # 仪表盘（统计卡片、图表、动态）
├── sidebar.tsx             # 左侧导航栏
├── right-sidebar.tsx       # 右侧边栏（搜索、近期文章、标签、社交）
├── profile-status.tsx      # 状态气泡与网龄
├── theme-provider.tsx      # 暗色模式 Provider
└── theme-toggle.tsx        # 主题切换按钮

lib/
├── data.ts                 # 文章数据、作者信息、Giscus 配置
├── kv.ts                   # Upstash Redis 统计工具函数
└── utils.ts                # 通用工具
```

## Giscus 评论配置

评论区基于 GitHub Discussions，需在 `lib/data.ts` 中配置：

```ts
export const giscusConfig = {
  repo: 'haspeem/mydashboard',
  repoId: 'your-repo-id',        // 从 https://giscus.app 获取
  category: 'Announcements',
  categoryId: 'your-category-id', // 从 https://giscus.app 获取
  mapping: 'pathname',
}
```

## 部署

项目已部署在 Vercel，每次 push 到 `main` 分支自动部署。

KV 环境变量在 Vercel 项目 Settings → Environment Variables 中配置。

## 相关链接

- [Next.js 文档](https://nextjs.org/docs)
- [v0.app](https://v0.app)
- [Giscus](https://giscus.app)
- [Upstash Redis](https://upstash.com)
