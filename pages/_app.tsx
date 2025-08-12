import { AppProps } from 'next/app'
import './studio.css';

export default function App({ Component, pageProps }: AppProps) {
  //this is a fix to a bug ocurring with css modules + Next.js + Framer Motion Page Transitions

  return (
    <Component {...pageProps} />
  )
}
