'use client'
import { TextEffect } from '@/components/ui/text-effect'
import Link from 'next/link'

const NAV_LINKS = [
  { label: 'Exploring', href: '/#exploring' },
  { label: 'Work', href: '/#work' },
  { label: 'Blog', href: '/#blog' },
  { label: 'Connect', href: '/#connect' },
]

export function Header() {
  return (
    <header className="site-header border-line bg-page/85 px-gutter sticky top-0 z-40 flex h-14 items-center justify-between gap-4 border-b backdrop-blur-md">
      <div className="flex items-baseline gap-3 text-sm">
        <Link href="/" className="font-medium whitespace-nowrap">
          Mukul Lohar
        </Link>
        <TextEffect
          as="p"
          preset="fade"
          per="char"
          className="text-muted hidden sm:block"
          delay={0.5}
        >
          Senior Security Engineer
        </TextEffect>
      </div>
      <nav
        aria-label="Primary"
        className="flex h-full items-stretch gap-2.5 text-[13px] min-[400px]:gap-4 md:gap-6 md:text-sm"
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-muted hover:text-accent flex items-center transition-colors duration-150"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
