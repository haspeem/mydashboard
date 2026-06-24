# AGENTS.md — 开发规范

> 本文件供 AI Agent 阅读，帮助快速理解项目结构并保持代码风格一致。

## 项目概述

haspeem 的个人博客 & 仪表盘。基于 Next.js 16 (App Router + Turbopack) 构建，支持博客文章、评论、实时数据统计（浏览量 / 点赞 / 访客数）。

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Next.js 16 (App Router) |
| 语言 | TypeScript (strict) |
| 样式 | Tailwind CSS 4 + tw-animate-css |
| UI 组件 | shadcn/ui (base-nova style) + @base-ui/react |
| 图标 | lucide-react |
| 字体 | Geist Sans / Geist Mono (next/font/google) |
| Markdown | react-markdown + remark-gfm + rehype-highlight |
| 评论 | @giscus/react (GitHub Discussions) |
| 数据统计 | @vercel/kv (Upstash Redis) |
| 暗色模式 | next-themes |
| 包管理 | pnpm |
| 部署 | Vercel |

## 项目结构

```
app/                        # Next.js App Router
├── layout.tsx              # 根布局（主题 Provider、字体、SEO metadata）
├── page.tsx                # 首页入口（渲染 BlogHome）
├── globals.css             # 全局样式 + CSS 变量（暗色模式色板）
├── blog/[slug]/page.tsx   # 文章详情页路由（Server Component）
└── api/                    # API 路由
    ├── views/[slug]/       # GET 浏览量 / POST +1 并记录 UV
    ├── likes/[slug]/       # GET 点赞数 / POST like/unlike
    └── stats/              # GET 全站统计聚合数据

components/                 # React 组件
├── ui/                     # shadcn/ui 基础组件（avatar、badge、button、card、input 等）
├── blog-home.tsx           # 首页容器（Client，管理视图切换 home/blog/tags/archive/dashboard）
├── blog-feed.tsx           # 文章列表（Client，从 API 拉取浏览量）
├── blog-post-shell.tsx     # 文章详情页布局壳（含侧边栏 + 路由跳转）
├── article-header.tsx      # 文章头部（标题、标签、元信息、作者卡、封面）
├── article-content.tsx     # 文章正文（Markdown 渲染 + 代码高亮 + 代码复制 + 图片放大）
├── comments.tsx            # Giscus 评论区（Client，跟随主题切换）
├── like-button.tsx         # 点赞按钮（Client，调用 API 持久化）
├── share-buttons.tsx       # 分享按钮（复制链接 / Twitter / 微信）
├── post-navigation.tsx    # 上一篇 / 下一篇导航
├── view-tracker.tsx        # 浏览量追踪（Client，进入页面时 POST）
├── dashboard.tsx           # 仪表盘（Client，统计卡片 + 每周图表 + 动态时间线）
├── sidebar.tsx             # 左侧导航栏（Client）
├── right-sidebar.tsx       # 右侧边栏（搜索、近期文章、标签云、社交链接）
├── profile-status.tsx      # 状态气泡与博客网龄
├── theme-provider.tsx      # next-themes Provider
└── theme-toggle.tsx        # 暗色/亮色切换按钮

lib/
├── data.ts                 # 静态数据（文章、作者、标签、活动、Giscus 配置、CRUD 函数）
├── kv.ts                   # Upstash Redis 统计函数（浏览量 / 点赞 / UV / 每日数据）
└── utils.ts                # cn() 类名合并工具

public/                     # 静态资源（avatar.png 等）
```

## 代码风格规范

### 通用

- 使用 **TypeScript**，启用 strict 模式
- 使用 **单引号**（类型导入用 `type` 关键字）
- 组件 **PascalCase** 命名（`ArticleHeader`），函数/变量 **camelCase**
- 文件名使用 **kebab-case**（`blog-feed.tsx`）
- 每个组件文件导出一个同名组件函数
- **不添加注释**，除非逻辑非常复杂

### 组件

- **Server Component**（默认）：不写 `'use client'`，可以直接 `await` 异步数据
- **Client Component**：文件顶部写 `'use client'`，用于：
  - 使用 `useState` / `useEffect` / `useRouter` 等 hooks
  - 交互事件（onClick、onChange 等）
  - 通过 `fetch` 调用 API 路由
- props 使用**具名解构**，不使用 `props.xxx`

### 导入顺序

```typescript
// 1. 外部库
import Link from 'next/link'
import { Heart } from 'lucide-react'

// 2. 项目组件 / 工具
import { Button } from '@/components/ui/button'
import { posts } from '@/lib/data'
import { cn } from '@/lib/utils'
```

### 路径别名

- 使用 `@/` 别名指向项目根目录
- 例：`import { Button } from '@/components/ui/button'`

### 样式

- 使用 **Tailwind CSS** 工具类
- 条件类名使用 `cn()` 工具函数合并
- 使用语义化 CSS 变量：`bg-background`、`text-foreground`、`border`、`bg-card/50`、`text-muted-foreground`
- 暗色模式通过 `.dark` class 自动生效，**不要**硬编码颜色
- 图标使用 `lucide-react`，尺寸用 `size-4` / `size-3.5` 等

### API 路由

- 使用 Next.js App Router 的 `route.ts` 格式
- 返回 `NextResponse.json()`
- `params` 为 `Promise` 类型：`{ params }: { params: Promise<{ slug: string }> }`
- 需 `await params` 解构

### 数据

- 静态内容（文章、作者、标签）放在 `lib/data.ts`
- 动态统计（浏览量、点赞、UV）放在 `lib/kv.ts`，使用 `@vercel/kv`
- `lib/kv.ts` 包含**本地内存降级**：无 KV 环境变量时自动用 `Map` 存储，不影响开发
- KV 键名规范：
  - `views:{slug}` — 单篇浏览量
  - `views:total` — 全站总浏览量
  - `views:daily:YYYY-MM-DD` — 每日浏览量
  - `likes:{slug}` — 单篇点赞数
  - `likes:total` — 全站总点赞数
  - `uv:visitors` — 访客 IP 集合
  - `uv:total` — 访客总数

### 环境变量

- `.env.local`（已在 .gitignore 中忽略）
- 必需变量：
  - `KV_REST_API_URL` — Upstash Redis URL
  - `KV_REST_API_TOKEN` — Upstash Redis Token
- 未配置时自动降级为内存存储

## 常用命令

```bash
pnpm install    # 安装依赖
pnpm dev        # 启动开发服务器（http://localhost:3000）
pnpm build      # 构建生产版本
pnpm start      # 启动生产服务器
pnpm lint       # 运行 ESLint
```

## 注意事项

- 先 `pnpm install` 再 `pnpm dev`
- 提交前确认 `.env.local` 不会被提交
- `pnpm-workspace.yaml` 中的 `allowBuilds` 控制允许运行构建脚本的依赖
- `next.config.mjs` 中 `typescript.ignoreBuildErrors: true` 跳过类型检查
- 图片使用 `next/image`，但当前 `images.unoptimized: true`
- 部署在 Vercel，每次 push 到 `main` 自动触发部署