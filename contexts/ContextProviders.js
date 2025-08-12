'use client'
import { SizeProvider } from '../contexts/SizeContext'
import { IndexProvider } from '../contexts/IndexContext'
import { MenuProvider } from '../contexts/MenuContext'

//collecting all contexts to wrap the layout
export default function ContextProviders({ children }) {
  return (
    <SizeProvider>
      <MenuProvider>
        <IndexProvider>{children}</IndexProvider>
      </MenuProvider>
    </SizeProvider>
  )
}
