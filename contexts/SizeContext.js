'use client'
import { createContext, useState, useEffect } from 'react'

// UserContext: to query the context state
// UserDispatchContext: to mutate the context state
const SizeContext = createContext(undefined)
//const SizeDispatchContext = createContext(undefined)

// A "provider" is used to encapsulate only the
// components that needs the state in this context
function SizeProvider({ children }) {
  const [screensize, setScreensize] = useState({
    width: 1920,
    height: 1080,
    mobile: false,
  })

  // Update the size on window resize
  useEffect(() => {
    function handleResize() {
      setScreensize({
        width: window.innerWidth,
        height: window.innerHeight,
        mobile: window.innerWidth < window.innerHeight, // Adjust breakpoint if needed
      })
    }

    window.addEventListener('resize', handleResize)
    handleResize() // Initialize size on mount

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <SizeContext.Provider value={screensize}>{children}</SizeContext.Provider>
  )
}

export { SizeProvider, SizeContext }
