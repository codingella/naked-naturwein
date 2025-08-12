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
      const { href } = value

      // If href is missing, return null
      if (!href) return null

      const isRelative = href.startsWith('/')
      const isMail = href.startsWith('mailto')

      if (isRelative) {
        return <Link href={href}>{children}</Link>
      }

      // External link fallback
      return (
        <a
          href={href}
          className={isMail ? 'mailto' : ''}
          target="_blank"
          rel="noopener noreferrer"
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
