const BlockText = ({ as: P = 'p', type, children }) => {
  return (
    <P className="BlockText" data-type={type}>
      {children}
    </P>
  )
}

export default BlockText
