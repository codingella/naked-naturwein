import Link from 'next/link'
import BlockText from './BlockText'
import Img from '../image/Image'

const components = {
  undefined: (props) => {
    return null
  },

  block: {
    normal: ({ children }) => <BlockText type="normal">{children}</BlockText>,
    h5: ({ children }) => <h5>{children}</h5>,
  },

  marks: {
    uppercase: (props) => (
      <span
        style={{
          textTransform: 'uppercase',
        }}
      >
        {props?.children}
      </span>
    ),
    serif: ({ children }) => <span className="serif">{children}</span>,

    justified: ({ children }) => (
      <span style={{ display: 'block', textAlign: 'center' }}>{children}</span>
    ),

    link: ({ value, children }) => {
      const { href, url, fileName } = value

      // Prefer `url` if you projected it in GROQ, otherwise fallback to href
      const linkTarget = url || href
      if (!linkTarget) return null

      const isRelative = linkTarget.startsWith('/')
      const isMail = linkTarget.startsWith('mailto')

      // Handle relative links (internal routing)
      if (isRelative) {
        return <Link href={linkTarget}>{children}</Link>
      }

      // Handle mailto links
      if (isMail) {
        return (
          <a href={linkTarget} className="mailto">
            {children}
          </a>
        )
      }

      // Handle file download (PDFs)
      const isFile = !!fileName || linkTarget.endsWith('.pdf')

      return (
        <a
          href={linkTarget}
          target="_blank"
          rel="noopener noreferrer"
          download={isFile ? fileName || true : undefined}
        >
          {children}
        </a>
      )
    },
  },
  types: {
    image: ({ value }) => {
      return (
        <>
          <Img image={value} alt={value.alt} />
          <span className={'img-description'}>{value.description}</span>
        </>
      )
    },
    undefined: (props) => {
      return null
    },
  },
}

export default components
