import { PortableText } from '@portabletext/react'
import components from './components'

const Content = ({ blocks, full = false, children = null }) => {
  if (!children && (!blocks || blocks.length === 0)) return null

  return (
    <div className={`Content`} data-full={full}>
      <PortableText value={blocks} components={{ ...components }} />
      {children}
    </div>
  )
}

export default Content
