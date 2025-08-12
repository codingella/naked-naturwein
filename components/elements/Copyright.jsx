'use client'

const Copyright = ({title}) => {
  const currentYear = new Date().getFullYear().toString();

  return (
    <span>
      © {currentYear} {title},
    </span>
  )
}

export default Copyright
