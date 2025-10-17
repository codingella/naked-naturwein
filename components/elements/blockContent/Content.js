import { PortableText } from '@portabletext/react'
import components from './components'
import style from './Content.module.css'

const Content = ({ blocks, full = false, children = null }) => {
  if (!children && (!blocks || blocks.length === 0)) return null

  return (
    <div className={style.Content} data-full={full}>
      <PortableText value={blocks} components={{ ...components }} />
      {children}
    </div>
  )
}

export default Content

export const ContentWithInline = ({
  blocks,
  full = false,
  children = null,
  appendInlineEnd = '',
}) => {
  if (!children && (!blocks || blocks.length === 0)) return null

  // Render all but the last block normally, then the last block with an inline append
  const lastIdx = blocks.length - 1
  const head = blocks.slice(0, lastIdx)
  const tail = blocks[lastIdx]

  return (
    <div className={style.Content} data-full={full}>
      {head.length > 0 && (
        <PortableText value={head} components={{ ...components }} />
      )}

      <PortableText
        value={[tail]}
        components={{
          ...components,
          block: {
            // append only when the last block is a normal paragraph
            normal: ({ children }) => (
              <p>
                {children}
                {/* inline, no extra line break */}
                <span className={style.inlineAppend}>{appendInlineEnd}</span>
              </p>
            ),
          },
        }}
      />
      {children}
    </div>
  )
}
