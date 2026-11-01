'use client'
import { TextMorph } from '@/components/ui/text-morph'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import {
  getStoredReadMode,
  READ_MODE_ATTRIBUTE,
  storeReadMode,
} from '@/lib/read-mode'
import { ArrowLeftIcon, BookOpenIcon } from 'lucide-react'
import { MotionConfig } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useLayoutEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import { Connect } from '../connect'
import './post.css'

function CopyButton() {
  const [text, setText] = useState('Copy')

  useEffect(() => {
    setTimeout(() => {
      setText('Copy')
    }, 2000)
  }, [text])

  return (
    <button
      onClick={() => {
        setText('Copied')
        navigator.clipboard.writeText(window.location.href)
      }}
      className="font-base text-muted hover:text-accent flex items-center gap-1 text-center text-sm transition-colors"
      type="button"
    >
      <TextMorph>{text}</TextMorph>
      <span>URL</span>
    </button>
  )
}

// The first block of the article still on screen, below the sticky bar.
function findReadingAnchor() {
  const barBottom =
    document.querySelector('.post-bar')?.getBoundingClientRect().bottom ?? 0
  const blocks = document.querySelectorAll('.post-lede > *, .post-body > *')
  return Array.from(blocks).find(
    (block) => block.getBoundingClientRect().bottom > barBottom,
  )
}

function useReadMode() {
  const [isOn, setIsOn] = useState(false)

  useLayoutEffect(() => {
    setIsOn(getStoredReadMode())
  }, [])

  // The attribute lives on <html>, so it must not outlive the post.
  useLayoutEffect(() => {
    const root = document.documentElement
    root.toggleAttribute(READ_MODE_ATTRIBUTE, isOn)
    return () => root.removeAttribute(READ_MODE_ATTRIBUTE)
  }, [isOn])

  const toggle = () => {
    // Switching changes the page height, so keep the reader on the same block.
    const anchor = findReadingAnchor()
    const topBefore = anchor?.getBoundingClientRect().top ?? 0
    storeReadMode(!isOn)
    flushSync(() => setIsOn(!isOn))
    if (anchor) {
      window.scrollBy({
        top: anchor.getBoundingClientRect().top - topBefore,
        behavior: 'instant',
      })
    }
  }

  return { isOn, toggle }
}

function ReadModeButton({
  isOn,
  onClick,
}: {
  isOn: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-pressed={isOn}
      onClick={onClick}
      className="text-muted hover:text-accent inline-flex items-center gap-1.5 text-sm transition-colors"
    >
      <BookOpenIcon className="h-3.5 w-3.5" />
      {isOn ? 'Exit read mode' : 'Read mode'}
    </button>
  )
}

function PostShell({ children }: { children: React.ReactNode }) {
  const { isOn, toggle } = useReadMode()

  return (
    <>
      <ScrollProgress
        className="bg-accent-fill fixed top-0 z-50 h-0.5"
        springOptions={{
          bounce: 0,
        }}
      />
      <div className="post-bar border-line px-gutter flex items-center justify-between gap-4 border-b py-3">
        <Link
          href="/blog"
          className="text-muted hover:text-accent inline-flex items-center gap-1.5 text-sm transition-colors"
        >
          <ArrowLeftIcon className="h-3.5 w-3.5" />
          All posts
        </Link>
        <div className="flex items-center gap-4 md:gap-6">
          <ReadModeButton isOn={isOn} onClick={toggle} />
          <CopyButton />
        </div>
      </div>
      <main className="post">{children}</main>
    </>
  )
}

export default function LayoutBlog({
  children,
}: {
  children: React.ReactNode
}) {
  const isIndex = usePathname() === '/blog'

  return (
    <MotionConfig reducedMotion="user">
      {isIndex ? children : <PostShell>{children}</PostShell>}
      <Connect />
    </MotionConfig>
  )
}
