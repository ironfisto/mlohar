type Project = {
  name: string
  description: string
  link: string
  video: string
  id: string
}

type WorkExperience = {
  company: string
  title: string
  start: string
  end: string
  link: string
  id: string
}

type BlogPost = {
  title: string
  description: string
  link: string
  uid: string
}

type SocialLink = {
  label: string
  link: string
}

export const PROJECTS: Project[] = [
  {
    name: 'Motion Primitives Pro',
    description:
      'Advanced components and templates to craft beautiful websites.',
    link: 'https://pro.motion-primitives.com/',
    video:
      'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/newProfileItem/d898be8a-7037-4c71-af0c-8997239b050d.mp4?_a=DATAdtAAZAA0',
    id: 'project1',
  },
  {
    name: 'Motion Primitives',
    description: 'UI kit to make beautiful, animated interfaces.',
    link: 'https://motion-primitives.com/',
    video:
      'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
    id: 'project2',
  },
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'GoDaddy',
    title: 'Sr Security Engineer',
    start: '2025',
    end: 'Present',
    link: 'https://godaddy.com',
    id: 'work1',
  },
  {
    company: 'ServiceNow',
    title: 'Sr Product Security Engineer',
    start: '2023',
    end: '2025',
    link: 'https://servicenow.com',
    id: 'work3',
  },
  {
    company: 'Tokopedia',
    title: 'Sr. Application Security Engineer',
    start: '2021',
    end: '2023',
    link: 'https://tokopedia.com',
    id: 'work4',
  },
  {
    company: 'LoginSoft',
    title: 'SDE - Security Engineer',
    start: '2021',
    end: '2021',
    link: 'https://loginsoft.com',
    id: 'work5',
  },
  {
    company: 'Orbigo',
    title: 'Jr Software Engineer',
    start: '2018',
    end: '2021',
    link: 'https://orbigo.com',
    id: 'work6',
  },
]

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'Theoretically Possible to Practical Account Takeover',
    description: 'A write-up on turning a theoretical account takeover vulnerability into a practical exploit.',
    link: '/blog/theoretically-possible-to-practical-account-takeover',
    uid: 'blog-2',
  }
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Github',
    link: 'https://github.com/ironfisto',
  },
  {
    label: 'Twitter',
    link: 'https://twitter.com/ironfisto',
  },
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/malviyamukul/',
  },
]

export const EMAIL = 'mukul.lohar@tokopedia.com'
