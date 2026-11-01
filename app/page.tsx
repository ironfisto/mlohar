'use client'
import { useEffect, useState, type ReactNode } from 'react'
import { MotionConfig, motion } from 'motion/react'
import { ArrowUpRightIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Spotlight } from '@/components/ui/spotlight'
import { Magnetic } from '@/components/ui/magnetic'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { cn } from '@/lib/utils'
import { WORK_EXPERIENCE, BLOG_POSTS, EMAIL, SOCIAL_LINKS } from './data'

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const TRANSITION_SECTION = {
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1],
}

type LinkItem = {
  label: string
  href?: string
}

const EXPLORING: {
  learning: LinkItem[]
  cve: { id: string; title: string; links: LinkItem[] }
  openSource: LinkItem[]
  reading: LinkItem[]
  rfc: LinkItem[]
} = {
  learning: [
    { label: 'Smart Contract' },
    { label: 'Secure System Design' },
    { label: 'Explore Hacking in Undiscovered areas' },
    { label: 'Assembly' },
    { label: 'AR/VR' },
    { label: 'ThreeJS , Android XR' },
  ],
  cve: {
    id: 'CVE-2025-66021',
    title: 'XSS bypass on OWASP Java HTML Sanitizer Library',
    links: [{ label: 'NVD' }, { label: 'POC' }],
  },
  openSource: [{ label: 'Renix' }],
  reading: [
    { label: 'Designing Secure Software by Loren Kohnfelder' },
    { label: 'Hacking The Art Of Exploitation By jon erickson' },
    { label: 'Practical Reverse Engineering By Bruce Dang' },
    { label: 'Programming from the Ground Up By Jonathan Bartlett' },
    { label: 'Mastering Linux Security by Donald A. Tevault' },
    { label: 'Zero Trust Network by Evan Gilman & Doug Bart' },
    { label: 'DNS Security Management' },
    { label: 'Building Multi-Tenant SaaS Architectures by Tod Golding' },
  ],
  rfc: [
    { label: 'The MD5 Message-Digest Algorithm' },
    {
      label:
        'CyberGym: Evaluating AI Agents’ Cybersecurity Capabilities with Real-World Vulnerabilities at Scale',
    },
    { label: 'The Security Architecture of the Chromium Browser' },
    {
      label:
        'Cross-Origin State Inference (COSI) Attacks: Leaking Web Site States through XS-Leaks',
    },
    { label: 'kvm: the Linux Virtual Machine Monitor' },
    { label: 'Securing the AI Software Supply Chain' },
  ],
}

const CURRENT_JOB = WORK_EXPERIENCE[0]

const FACTS = [
  { label: 'Now', value: `${CURRENT_JOB.title}, ${CURRENT_JOB.company}` },
  {
    label: 'Focus',
    value: 'Threat modeling, secure code review, penetration testing',
  },
  { label: 'Bug bounty', value: 'Facebook, Google' },
  { label: 'Research', value: EXPLORING.cve.id },
  { label: 'Interests', value: 'Space security, AR/VR' },
]

const JOB_STARTS = WORK_EXPERIENCE.map((job) => Number(job.start))
const TIMELINE_START = Math.min(...JOB_STARTS)
// Keeps roles that started and ended in the same year visible on the track.
const MIN_ROLE_YEARS = 0.25

// The page is prerendered, so the clock is read after hydration: the timeline
// keeps up with "Present" without a rebuild or a hydration mismatch.
function useTimelineEnd() {
  const [timelineEnd, setTimelineEnd] = useState(Math.max(...JOB_STARTS) + 1)

  useEffect(() => {
    setTimelineEnd(new Date().getFullYear() + 1)
  }, [])

  return timelineEnd
}

function jobSegment(
  job: (typeof WORK_EXPERIENCE)[number],
  timelineEnd: number,
) {
  const span = timelineEnd - TIMELINE_START
  const start = Number(job.start)
  const end = job.end === 'Present' ? timelineEnd : Number(job.end)
  return {
    left: `${((start - TIMELINE_START) / span) * 100}%`,
    width: `${(Math.max(end - start, MIN_ROLE_YEARS) / span) * 100}%`,
  }
}

// The section stays static and only its content moves, so anchor links measure
// the section's resting position rather than its offset pre-reveal position.
function Reveal({
  children,
  className,
  id,
}: {
  children: ReactNode
  className?: string
  id: string
}) {
  return (
    <section id={id} className={cn('scroll-mt-14', className)}>
      <motion.div
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
      >
        {children}
      </motion.div>
    </section>
  )
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="px-gutter pt-20 pb-8 -indent-[0.05em] text-[clamp(2.5rem,6vw,6.5rem)] leading-none font-medium tracking-[-0.04em] lg:pt-32 lg:pb-12">
      {children}
    </h2>
  )
}

// Cells sit on a line-coloured backdrop, so the 1px gaps draw the rules and the
// spotlight lights them up around the cursor.
function HairlineGrid({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className="bg-line relative py-px">
      <Spotlight
        className="bg-[radial-gradient(circle_at_center,var(--accent-fill),transparent_70%)] blur-xl"
        size={320}
      />
      <div className={cn('relative grid gap-px', className)}>{children}</div>
    </div>
  )
}

function Cell({
  label,
  aside,
  className,
  children,
}: {
  label: string
  aside?: string
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn('bg-page px-gutter py-8 lg:py-10', className)}>
      <div className="text-muted mb-6 flex items-center justify-between font-mono text-xs tracking-normal">
        <h3>{label}</h3>
        {aside && <span>{aside}</span>}
      </div>
      {children}
    </div>
  )
}

function ItemLabel({ item }: { item: LinkItem }) {
  if (!item.href) {
    return <>{item.label}</>
  }
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-accent underline-offset-2 hover:underline"
    >
      {item.label}
    </a>
  )
}

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

function Hero() {
  return (
    <motion.section
      className="flex flex-col lg:min-h-[calc(100svh-3.5rem)]"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="px-gutter @container pt-6 pb-5 lg:pt-8 lg:pb-7"
      >
        <h1
          className="-ml-[0.08em] text-[19cqw] leading-[0.8] font-semibold tracking-[-0.055em] whitespace-nowrap"
        >
          Mukul Lohar
        </h1>
      </motion.div>

      <motion.div
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="bg-line grid flex-1 grid-cols-12 gap-px py-px"
      >
        <div className="bg-page relative col-span-12 aspect-[4/3] overflow-hidden md:col-span-4 md:aspect-auto md:min-h-96 lg:col-span-3">
          <Image
            src="/image.png"
            alt="Portrait of Mukul Lohar"
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
            className="origin-[50%_40%] scale-[1.14] object-cover object-[54%_30%]"
            priority
          />
        </div>

        <div className="bg-page px-gutter col-span-12 flex flex-col gap-6 py-8 text-lg leading-[1.35] text-pretty md:col-span-8 md:text-[clamp(1.25rem,1.7vw,2rem)] lg:col-span-6 lg:justify-between lg:py-10">
          <p>
            Hi, I am Mukul Lohar 👋 I am a Senior Product Security Engineer with
            expertise in threat modeling, secure code review, and penetration
            testing across large-scale cloud and on-prem systems.
          </p>
          <p className="text-muted">
            Beyond my professional work, I am deeply passionate about the
            intersection of space security and emerging technologies in AR/VR,
            exploring how immersive systems and critical infrastructures can be
            secured for the future. With a proven track record in bug bounty
            research for companies like Facebook and Google, I bring both
            hands-on technical depth and forward-looking curiosity to every
            challenge I take on.
          </p>
        </div>

        <dl className="bg-page px-gutter col-span-12 grid grid-cols-2 content-start gap-x-6 gap-y-6 py-8 md:grid-cols-5 lg:col-span-3 lg:grid-cols-1 lg:content-between lg:py-10">
          {FACTS.map((fact, index) => (
            <div
              key={fact.label}
              className={cn(index === 0 && 'col-span-2 md:col-span-1')}
            >
              <dt className="text-muted mb-1 font-mono text-xs tracking-normal">
                {fact.label}
              </dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </motion.section>
  )
}

function Exploring() {
  return (
    <Reveal id="exploring">
      <SectionHeading>Exploring</SectionHeading>
      <HairlineGrid className="grid-cols-6 lg:grid-cols-12">
        <Cell
          label="Research"
          aside="CVE"
          className="@container col-span-6 lg:col-span-5"
        >
          <p className="text-accent font-mono text-[11.4cqw] leading-none font-medium tracking-tight">
            {EXPLORING.cve.id}
          </p>
          <p className="mt-5 text-lg text-pretty">{EXPLORING.cve.title}</p>
          <div className="mt-6 flex flex-wrap gap-2 font-mono text-xs tracking-normal">
            {EXPLORING.cve.links.map((link) => (
              <span
                key={link.label}
                className="border-line rounded-full border px-3 py-1"
              >
                <ItemLabel item={link} />
              </span>
            ))}
          </div>
        </Cell>

        <Cell
          label="Learning Now"
          className="col-span-6 sm:col-span-3 lg:col-span-4"
        >
          <ul className="space-y-2 text-lg">
            {EXPLORING.learning.map((item) => (
              <li key={item.label}>
                <ItemLabel item={item} />
              </li>
            ))}
          </ul>
        </Cell>

        <Cell
          label="Open Source"
          className="col-span-6 sm:col-span-3 lg:col-span-3"
        >
          <ul className="space-y-2 text-[clamp(2rem,3.4vw,4rem)] leading-none font-medium tracking-[-0.03em]">
            {EXPLORING.openSource.map((item) => (
              <li key={item.label}>
                <ItemLabel item={item} />
              </li>
            ))}
          </ul>
        </Cell>

        <Cell label="Reading List" className="col-span-6 lg:col-span-7">
          <ul className="gap-x-gutter text-lg sm:columns-2">
            {EXPLORING.reading.map((item) => (
              <li key={item.label} className="break-inside-avoid pb-3">
                <ItemLabel item={item} />
              </li>
            ))}
          </ul>
        </Cell>

        <Cell label="RFC & Papers" className="col-span-6 lg:col-span-5">
          <ul className="space-y-3 text-lg">
            {EXPLORING.rfc.map((item) => (
              <li key={item.label} className="text-pretty">
                <ItemLabel item={item} />
              </li>
            ))}
          </ul>
        </Cell>
      </HairlineGrid>
    </Reveal>
  )
}

function Work() {
  const timelineEnd = useTimelineEnd()
  const timelineSpan = timelineEnd - TIMELINE_START
  const timelineYears = Array.from(
    { length: timelineSpan },
    (_, index) => TIMELINE_START + index,
  )

  return (
    <Reveal id="work">
      <SectionHeading>Work Experience</SectionHeading>
      <HairlineGrid>
        <div
          aria-hidden
          className="bg-page text-muted hidden grid-cols-12 font-mono text-xs tracking-normal md:grid"
        >
          <div className="col-span-4" />
          <div className="col-span-5 flex xl:col-span-6">
            {timelineYears.map((year) => (
              <span key={year} className="flex-1 py-2 pl-1.5">
                {year}
              </span>
            ))}
          </div>
          <div className="col-span-3 xl:col-span-2" />
        </div>

        {WORK_EXPERIENCE.map((job) => (
          <a
            key={job.id}
            href={job.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-page hover:bg-wash grid grid-cols-12 transition-colors duration-150"
          >
            <div className="pl-gutter col-span-7 py-5 pr-4 md:col-span-4 lg:py-7">
              <p className="text-[clamp(1.5rem,2.6vw,3.25rem)] leading-tight font-medium tracking-[-0.03em]">
                {job.company}
              </p>
              <p className="text-muted mt-1">{job.title}</p>
            </div>

            <div
              aria-hidden
              className="border-line relative col-span-5 hidden border-r bg-[linear-gradient(to_right,var(--line)_1px,transparent_1px)] md:block xl:col-span-6"
              style={{ backgroundSize: `${100 / timelineSpan}% 100%` }}
            >
              <div
                className={cn(
                  'group-hover:bg-accent-fill absolute inset-y-[38%] transition-colors duration-150',
                  job.end === 'Present' ? 'bg-accent-fill' : 'bg-ink',
                )}
                style={jobSegment(job, timelineEnd)}
              />
            </div>

            <div className="pr-gutter col-span-5 flex items-start justify-end gap-2 py-5 text-right font-mono text-xs tracking-normal md:col-span-3 md:text-sm lg:py-7 xl:col-span-2">
              <span className="pt-1 whitespace-nowrap">
                {job.start} - {job.end}
              </span>
              <ArrowUpRightIcon className="text-muted group-hover:text-accent mt-1 hidden h-4 w-4 shrink-0 transition-colors duration-150 lg:block" />
            </div>
          </a>
        ))}
      </HairlineGrid>
    </Reveal>
  )
}

function Blog() {
  return (
    <Reveal id="blog">
      <SectionHeading>Blog</SectionHeading>
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
                <h3 className="text-[clamp(1.75rem,3.4vw,4.5rem)] leading-[1.05] font-medium tracking-[-0.03em] text-balance md:col-span-7">
                  {post.title}
                </h3>
                <p className="text-muted text-lg text-pretty md:col-span-4 md:pt-1">
                  {post.description}
                </p>
                <ArrowUpRightIcon className="text-muted group-hover:text-accent hidden h-7 w-7 justify-self-end transition-colors duration-150 md:col-span-1 md:block" />
              </div>
            </Link>
          ))}
        </AnimatedBackground>
      </div>
    </Reveal>
  )
}

function Connect() {
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

export default function Personal() {
  return (
    <MotionConfig reducedMotion="user">
      <main>
        <Hero />
        <Exploring />
        <Work />
        <Blog />
        <Connect />
      </main>
    </MotionConfig>
  )
}
