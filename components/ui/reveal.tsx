'use client'
import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

export const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export const TRANSITION_SECTION = {
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1],
}

// The section stays static and only its content moves, so anchor links measure
// the section's resting position rather than its offset pre-reveal position.
export function Reveal({
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
