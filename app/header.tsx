'use client'
import { TextEffect } from '@/components/ui/text-effect'
import Link from 'next/link'
import Image from 'next/image'

export function Header() {
  return (
    <header className="mb-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Image
          src="/image.png"
          alt="Portrait of Mukul Lohar"
          width={48}
          height={48}
          className="h-12 w-12 rounded-full object-cover ring-2 ring-zinc-200 dark:ring-zinc-800"
          priority
        />
        <div>
          <Link href="/" className="font-medium text-black dark:text-white">
            Mukul Lohar
          </Link>
          <TextEffect
            as="p"
            preset="fade"
            per="char"
            className="text-zinc-600 dark:text-zinc-500"
            delay={0.5}
          >
            Senior Security Engineer
          </TextEffect>
        </div>
      </div>
    </header>
  )
}
