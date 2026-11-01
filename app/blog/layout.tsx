'use client'
import { TextMorph } from '@/components/ui/text-morph'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

function CopyButton() {
  const [text, setText] = useState('Copy')
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

  useEffect(() => {
    setTimeout(() => {
      setText('Copy')
    }, 2000)
  }, [text])

  return (
    <button
      onClick={() => {
        setText('Copied')
        navigator.clipboard.writeText(currentUrl)
      }}
      className="font-base text-muted hover:text-accent flex items-center gap-1 text-center text-sm transition-colors"
      type="button"
    >
      <TextMorph>{text}</TextMorph>
      <span>URL</span>
    </button>
  )
}

type Heading = { id: string; text: string }

function useArticleHeadings(articleRef: React.RefObject<HTMLElement | null>) {
  const [headings, setHeadings] = useState<Heading[]>([])

  // MDX headings have no ids, so derive them for the outline's anchor links.
  useEffect(() => {
    const nodes = articleRef.current?.querySelectorAll('h2') ?? []
    setHeadings(
      Array.from(nodes).map((node) => {
        const text = node.textContent ?? ''
        node.id ||= text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '')
        return { id: node.id, text }
      }),
    )
  }, [articleRef])

  return headings
}

export default function LayoutBlogPost({
  children,
}: {
  children: React.ReactNode
}) {
  const articleRef = useRef<HTMLElement>(null)
  const headings = useArticleHeadings(articleRef)

  return (
    <>
      <ScrollProgress
        className="bg-accent-fill fixed top-0 z-50 h-0.5"
        springOptions={{
          bounce: 0,
        }}
      />

      <div className="gap-x-gutter px-gutter py-8 lg:grid lg:grid-cols-12 lg:py-16">
        <aside className="mb-8 lg:col-span-3 lg:mb-0">
          <div className="flex items-center justify-between lg:sticky lg:top-24 lg:flex-col lg:items-start lg:gap-3">
            <Link
              href="/#blog"
              className="text-muted hover:text-accent inline-flex items-center gap-1.5 text-sm transition-colors"
            >
              <ArrowLeftIcon className="h-3.5 w-3.5" />
              All posts
            </Link>
            <CopyButton />
          </div>
        </aside>

        {/* The article keeps a readable line length; the rails use the rest. */}
        <main
          ref={articleRef}
          className="prose prose-gray prose-h4:prose-base dark:prose-invert prose-h1:text-[clamp(2rem,3.4vw,3.75rem)] prose-h1:leading-[1.05] prose-h1:font-medium prose-h1:tracking-tight prose-h2:mt-12 prose-h2:scroll-m-20 prose-h2:text-2xl prose-h2:font-medium prose-h3:text-lg prose-h3:font-medium prose-h4:font-medium prose-h5:text-base prose-h5:font-medium prose-h6:text-base prose-h6:font-medium prose-strong:font-medium lg:prose-lg 2xl:prose-xl mx-auto max-w-[36em] min-w-0 pb-12 lg:col-span-6"
        >
          {children}
        </main>

        {headings.length > 1 && (
          <nav aria-label="On this page" className="hidden lg:col-span-3 lg:block">
            <div className="lg:sticky lg:top-24">
              <p className="text-muted mb-3 font-mono text-xs tracking-normal">
                On this page
              </p>
              <ul className="space-y-2 text-sm">
                {headings.map((heading) => (
                  <li key={heading.id}>
                    <a
                      href={`#${heading.id}`}
                      className="text-muted hover:text-accent transition-colors"
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        )}
      </div>
    </>
  )
}
