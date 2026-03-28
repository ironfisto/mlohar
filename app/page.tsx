'use client'
import { motion } from 'motion/react'
import { XIcon } from 'lucide-react'
import { Spotlight } from '@/components/ui/spotlight'
import { Magnetic } from '@/components/ui/magnetic'
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogClose,
  MorphingDialogContainer,
} from '@/components/ui/morphing-dialog'
import Link from 'next/link'
import { AnimatedBackground } from '@/components/ui/animated-background'
import {
  WORK_EXPERIENCE,
  BLOG_POSTS,
  EMAIL,
  SOCIAL_LINKS,
} from './data'

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const TRANSITION_SECTION = {
  duration: 0.3,
}

const EXPLORING = {
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
    links: [
      { label: 'NVD' },
      { label: 'POC' },
    ],
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

type ProjectVideoProps = {
  src: string
}

function ProjectVideo({ src }: ProjectVideoProps) {
  return (
    <MorphingDialog
      transition={{
        type: 'spring',
        bounce: 0,
        duration: 0.3,
      }}
    >
      <MorphingDialogTrigger>
        <video
          src={src}
          autoPlay
          loop
          muted
          className="aspect-video w-full cursor-zoom-in rounded-xl"
        />
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent className="relative aspect-video rounded-2xl bg-zinc-50 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950 dark:ring-zinc-800/50">
          <video
            src={src}
            autoPlay
            loop
            muted
            className="aspect-video h-[50vh] w-full rounded-xl md:h-[70vh]"
          />
        </MorphingDialogContent>
        <MorphingDialogClose
          className="fixed top-6 right-6 h-fit w-fit rounded-full bg-white p-1"
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: { delay: 0.3, duration: 0.1 },
            },
            exit: { opacity: 0, transition: { duration: 0 } },
          }}
        >
          <XIcon className="h-5 w-5 text-zinc-500" />
        </MorphingDialogClose>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}

function MagneticSocialLink({
  children,
  link,
}: {
  children: React.ReactNode
  link: string
}) {
  return (
    <Magnetic springOptions={{ bounce: 0 }} intensity={0.3}>
      <a
        href={link}
        className="group relative inline-flex shrink-0 items-center gap-[1px] rounded-full bg-zinc-100 px-2.5 py-1 text-sm text-black transition-colors duration-200 hover:bg-zinc-950 hover:text-zinc-50 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
      >
        {children}
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
        >
          <path
            d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </a>
    </Magnetic>
  )
}

export default function Personal() {
  return (
    <motion.main
      className="space-y-24"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <div className="flex-1">
          <p className="text-zinc-600 dark:text-zinc-400">
            Hi, I am Mukul Lohar 👋 I am a Senior Product Security Engineer with expertise in threat modeling, secure code review, and penetration testing across large-scale cloud and on-prem systems. Beyond my professional work, I am deeply passionate about the intersection of space security and emerging technologies in AR/VR, exploring how immersive systems and critical infrastructures can be secured for the future. With a proven track record in bug bounty research for companies like Facebook and Google, I bring both hands-on technical depth and forward-looking curiosity to every challenge I take on.
          </p>
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-lg font-medium">Exploring</h3>
        <div className="space-y-4">
          <div className="rounded-2xl bg-zinc-50/70 p-4 ring-1 ring-zinc-200/60 ring-inset dark:bg-zinc-950/60 dark:ring-zinc-800/60">
            <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Learning Now
            </div>
            <ul className="space-y-1.5 text-sm text-zinc-700 dark:text-zinc-300">
              {EXPLORING.learning.map((item) => (
                <li key={item.label} className="flex items-start gap-2">
                  <span className="mt-[6px] h-[6px] w-[6px] rounded-full bg-zinc-400 dark:bg-zinc-500" />
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline-offset-2 hover:underline"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span>{item.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-zinc-50/70 p-4 ring-1 ring-zinc-200/60 ring-inset dark:bg-zinc-950/60 dark:ring-zinc-800/60">
            <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                Research
              </span>
              <span className="rounded-full bg-zinc-200 px-2 py-0.5 text-[11px] font-semibold text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                CVE
              </span>
            </div>
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
              {EXPLORING.cve.id}
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              {EXPLORING.cve.title}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {EXPLORING.cve.links.map((link) => (
                <span
                  key={link.label}
                  className="rounded-full bg-zinc-900 px-3 py-1 text-[11px] font-semibold text-zinc-50 transition hover:bg-zinc-800 dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-zinc-300"
                >
                  {link.href ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="no-underline"
                    >
                      {link.label}
                    </a>
                  ) : (
                    link.label
                  )}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-zinc-50/70 p-4 ring-1 ring-zinc-200/60 ring-inset dark:bg-zinc-950/60 dark:ring-zinc-800/60">
            <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
              Reading List
            </div>
            <ul className="space-y-1.5 text-sm text-zinc-700 dark:text-zinc-300">
              {EXPLORING.reading.map((item) => (
                <li key={item.label} className="flex items-start gap-2">
                  <span className="mt-[6px] h-[6px] w-[6px] rounded-full bg-zinc-400 dark:bg-zinc-500" />
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline-offset-2 hover:underline"
                    >
                      {item.label}
                    </a>
                  ) : (
                    item.label
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-zinc-50/70 p-4 ring-1 ring-zinc-200/60 ring-inset dark:bg-zinc-950/60 dark:ring-zinc-800/60">
            <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
              Open Source
            </div>
            <ul className="space-y-1.5 text-sm text-zinc-700 dark:text-zinc-300">
              {EXPLORING.openSource.map((item) => (
                <li key={item.label} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500" />
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline-offset-2 hover:underline"
                    >
                      {item.label}
                    </a>
                  ) : (
                    item.label
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-zinc-50/70 p-4 ring-1 ring-zinc-200/60 ring-inset dark:bg-zinc-950/60 dark:ring-zinc-800/60">
            <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
              RFC & Papers
            </div>
            <ul className="space-y-1.5 text-sm text-zinc-700 dark:text-zinc-300">
              {EXPLORING.rfc.map((item) => (
                <li key={item.label} className="flex items-start gap-2">
                  <span className="mt-[6px] h-[6px] w-[6px] rounded-full bg-zinc-400 dark:bg-zinc-500" />
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline-offset-2 hover:underline"
                    >
                      {item.label}
                    </a>
                  ) : (
                    item.label
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-lg font-medium">Work Experience</h3>
        <div className="flex flex-col space-y-2">
          {WORK_EXPERIENCE.map((job) => (
            <a
              className="relative overflow-hidden rounded-2xl bg-zinc-300/30 p-[1px] dark:bg-zinc-600/30"
              href={job.link}
              target="_blank"
              rel="noopener noreferrer"
              key={job.id}
            >
              <Spotlight
                className="from-zinc-900 via-zinc-800 to-zinc-700 blur-2xl dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-50"
                size={64}
              />
              <div className="relative h-full w-full rounded-[15px] bg-white p-4 dark:bg-zinc-950">
                <div className="relative flex w-full flex-row justify-between">
                  <div>
                    <h4 className="font-normal dark:text-zinc-100">
                      {job.title}
                    </h4>
                    <p className="text-zinc-500 dark:text-zinc-400">
                      {job.company}
                    </p>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    {job.start} - {job.end}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-3 text-lg font-medium">Blog</h3>
        <div className="flex flex-col space-y-0">
          <AnimatedBackground
            enableHover
            className="h-full w-full rounded-lg bg-zinc-100 dark:bg-zinc-900/80"
            transition={{
              type: 'spring',
              bounce: 0,
              duration: 0.2,
            }}
          >
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.uid}
                className="-mx-3 rounded-xl px-3 py-3"
                href={post.link}
                data-id={post.uid}
              >
                <div className="flex flex-col space-y-1">
                  <h4 className="font-normal dark:text-zinc-100">
                    {post.title}
                  </h4>
                  <p className="text-zinc-500 dark:text-zinc-400">
                    {post.description}
                  </p>
                </div>
              </Link>
            ))}
          </AnimatedBackground>
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-lg font-medium">Connect</h3>
        <p className="mb-5 text-zinc-600 dark:text-zinc-400">
          Feel free to contact me at{' '}
          <a className="underline dark:text-zinc-300" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </p>
        <div className="flex items-center justify-start space-x-3">
          {SOCIAL_LINKS.map((link) => (
            <MagneticSocialLink key={link.label} link={link.link}>
              {link.label}
            </MagneticSocialLink>
          ))}
        </div>
      </motion.section>
    </motion.main>
  )
}
