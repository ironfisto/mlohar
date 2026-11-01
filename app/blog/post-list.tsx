'use client'
import { ArrowUpRightIcon } from 'lucide-react'
import Link from 'next/link'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { BLOG_POSTS } from '../data'

export function PostList({
  headingLevel: Heading,
}: {
  headingLevel: 'h2' | 'h3'
}) {
  return (
    <div className="divide-line border-line divide-y border-y">
      <AnimatedBackground
        enableHover
        className="bg-wash h-full w-full"
        transition={{
          type: 'spring',
          bounce: 0,
          duration: 0.2,
        }}
      >
        {BLOG_POSTS.map((post) => (
          <Link
            key={post.uid}
            href={post.link}
            data-id={post.uid}
            className="group flex [&>div]:w-full"
          >
            <div className="px-gutter grid gap-4 py-8 md:grid-cols-12 lg:py-12">
              <Heading className="text-[clamp(1.75rem,3.4vw,4.5rem)] leading-[1.05] font-medium tracking-[-0.03em] text-balance md:col-span-7">
                {post.title}
              </Heading>
              <p className="text-muted text-lg text-pretty md:col-span-4 md:pt-1">
                {post.description}
              </p>
              <ArrowUpRightIcon className="text-muted group-hover:text-accent hidden h-7 w-7 justify-self-end transition-colors duration-150 md:col-span-1 md:block" />
            </div>
          </Link>
        ))}
      </AnimatedBackground>
    </div>
  )
}
