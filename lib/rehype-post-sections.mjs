// Shapes a post at build time, so MDX files stay plain markdown:
//
//   <header class="post-header">
//     <h1 />
//     <div class="post-intro">
//       <div class="post-lede">everything before the first h2</div>
//       <div class="post-meta">reading time</div>
//       <nav class="post-contents">links to each section</nav>
//     </div>
//   </header>
//   <section class="post-section" id="slug">
//     <div class="post-section-head"><h2 /></div>
//     <div class="post-body">everything up to the next h2</div>
//   </section>

const WORDS_PER_MINUTE = 200

const element = (tagName, className, children, properties = {}) => ({
  type: 'element',
  tagName,
  properties: className ? { className: [className], ...properties } : properties,
  children,
})

const text = (value) => ({ type: 'text', value })

const isHeading = (node, tagName) =>
  node.type === 'element' && node.tagName === tagName

const isBlank = (node) => node.type === 'text' && !node.value.trim()

function textContent(node, { skipCode = false } = {}) {
  if (node.type === 'text') return node.value
  if (skipCode && node.tagName === 'pre') return ''
  return (node.children ?? [])
    .map((child) => textContent(child, { skipCode }))
    .join(' ')
}

function createSlugger() {
  const seen = new Map()
  return (value) => {
    const slug = value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    const count = seen.get(slug) ?? 0
    seen.set(slug, count + 1)
    return count ? `${slug}-${count}` : slug
  }
}

function readingTime(nodes) {
  const words = nodes
    .map((node) => textContent(node, { skipCode: true }))
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length
  return `${Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))} min read`
}

export default function rehypePostSections() {
  return (tree) => {
    const content = tree.children.filter((node) => !isBlank(node))
    const esm = content.filter((node) => node.type === 'mdxjsEsm')
    const nodes = content.filter((node) => node.type !== 'mdxjsEsm')

    const slugify = createSlugger()
    const title = nodes.find((node) => isHeading(node, 'h1'))
    const intro = []
    const sections = []

    for (const node of nodes) {
      if (node === title) continue
      if (isHeading(node, 'h2')) {
        const label = textContent(node).replace(/\s+/g, ' ').trim()
        sections.push({ heading: node, label, id: slugify(label), body: [] })
      } else {
        ;(sections.at(-1)?.body ?? intro).push(node)
      }
    }

    const meta = element('div', 'post-meta', [
      element('p', 'post-label', [text('Reading time')]),
      element('p', null, [text(readingTime(nodes))]),
    ])

    const contents =
      sections.length > 1
        ? [
            element(
              'nav',
              'post-contents',
              [
                element('p', 'post-label', [text('On this page')]),
                element(
                  'ul',
                  null,
                  sections.map(({ id, label }) =>
                    element('li', null, [
                      element('a', null, [text(label)], { href: `#${id}` }),
                    ]),
                  ),
                ),
              ],
              { ariaLabel: 'On this page' },
            ),
          ]
        : []

    tree.children = [
      ...esm,
      element('header', 'post-header', [
        ...(title ? [title] : []),
        element('div', 'post-intro', [
          element('div', 'post-lede', intro),
          meta,
          ...contents,
        ]),
      ]),
      ...sections.map(({ heading, id, body }) =>
        element(
          'section',
          'post-section',
          [
            element('div', 'post-section-head', [heading]),
            element('div', 'post-body', body),
          ],
          { id },
        ),
      ),
    ]
  }
}
