import type { Metadata } from 'next'
import { BLOG_POSTS } from '../data'
import { PostList } from './post-list'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Security research and write-ups by Mukul Lohar.',
  alternates: {
    canonical: '/blog',
  },
}

export default function BlogIndex() {
  return (
    <main>
      <div className="px-gutter @container flex items-end justify-between pt-6 pb-5 lg:pt-8 lg:pb-7">
        <h1 className="-ml-[0.07em] text-[19cqw] leading-none font-semibold tracking-[-0.055em]">
          Blog
        </h1>
        <p className="text-muted font-mono text-sm tracking-normal">
          {BLOG_POSTS.length} {BLOG_POSTS.length === 1 ? 'post' : 'posts'}
        </p>
      </div>
      <PostList headingLevel="h2" />
    </main>
  )
}
