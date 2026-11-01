'use client'
import type { ReactNode } from 'react'
import { ArrowUpRightIcon } from 'lucide-react'
import { Magnetic } from '@/components/ui/magnetic'
import { Reveal } from '@/components/ui/reveal'
import { EMAIL, SOCIAL_LINKS } from './data'

function MagneticSocialLink({
  children,
  link,
}: {
  children: ReactNode
  link: string
}) {
  return (
    <Magnetic springOptions={{ bounce: 0 }} intensity={0.3}>
      <a
        href={link}
        className="group bg-on-accent inline-flex shrink-0 items-center gap-1 rounded-full px-4 py-2 text-white transition-colors duration-200 hover:bg-white hover:text-black"
      >
        {children}
        <ArrowUpRightIcon className="h-4 w-4" />
      </a>
    </Magnetic>
  )
}

export function Connect() {
  return (
    <Reveal
      id="connect"
      className="bg-accent-fill text-on-accent mt-20 lg:mt-32"
    >
      <div className="px-gutter @container pt-12 pb-10 lg:pt-16 lg:pb-14">
        <div className="mb-6 text-[clamp(1.25rem,2vw,2.5rem)] leading-tight tracking-[-0.02em]">
          <h2 className="font-medium">Connect</h2>
          <p>Feel free to contact me at</p>
        </div>
        <a
          href={`mailto:${EMAIL}`}
          className="-ml-[0.07em] block text-[18.76cqw] leading-[0.85] font-semibold tracking-[-0.055em] whitespace-nowrap decoration-[0.04em] underline-offset-[0.08em] hover:underline"
        >
          {EMAIL}
        </a>
        <div className="mt-10 flex flex-wrap items-center gap-3 lg:mt-14">
          {SOCIAL_LINKS.map((link) => (
            <MagneticSocialLink key={link.label} link={link.link}>
              {link.label}
            </MagneticSocialLink>
          ))}
        </div>
      </div>
    </Reveal>
  )
}
