import type { MDXComponents } from 'mdx/types'
import { ComponentPropsWithoutRef } from 'react'
import { highlight } from 'sugar-high'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Cover: ({
      src,
      alt,
      caption,
    }: {
      src: string
      alt: string
      caption: string
    }) => {
      return (
        <figure>
          <img src={src} alt={alt} />
          <figcaption>{caption}</figcaption>
        </figure>
      )
    },
    code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => {
      // Only fences with a language are code. Highlighting raw HTTP or URLs
      // would misread them, for example greying out everything after `//`.
      if (!props.className?.startsWith('language-')) {
        return <code {...props}>{children}</code>
      }
      const codeHTML = highlight(children as string)
      return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
    },
  }
}
