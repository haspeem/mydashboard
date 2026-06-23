import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArticleContent } from '@/components/article-content'
import { ArticleHeader } from '@/components/article-header'
import { BlogPostShell } from '@/components/blog-post-shell'
import { Comments } from '@/components/comments'
import { LikeButton } from '@/components/like-button'
import { PostNavigation } from '@/components/post-navigation'
import { ShareButtons } from '@/components/share-buttons'
import {
  getAllSlugs,
  getAdjacentPosts,
  getPostBySlug,
} from '@/lib/data'

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const post = getPostBySlug(slug)
    if (!post) return { title: '文章未找到' }
    return {
      title: post.title,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        publishedTime: post.date,
      },
    }
  })
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const { prev, next } = getAdjacentPosts(slug)

  return (
    <BlogPostShell>
      <article className="flex flex-col gap-8">
        <ArticleHeader post={post} />
        <ArticleContent content={post.content} />
        <div className="flex flex-wrap items-center justify-between gap-4 border-t pt-6">
          <LikeButton initial={0} />
          <ShareButtons title={post.title} />
        </div>
        <PostNavigation prev={prev} next={next} />
        <Comments />
      </article>
    </BlogPostShell>
  )
}
