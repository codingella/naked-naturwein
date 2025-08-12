'use client'

import { createContext, useState } from 'react'

const IndexContext = createContext(undefined)
const IndexDispatchContext = createContext(undefined)

function IndexProvider({ children }) {
  const [indexData, setIndexData] = useState(1) // could be 1, 2, or 3

  return (
    <IndexContext.Provider value={indexData}>
      <IndexDispatchContext.Provider value={setIndexData}>
        {children}
      </IndexDispatchContext.Provider>
    </IndexContext.Provider>
  )
}

export { IndexProvider, IndexContext, IndexDispatchContext }
