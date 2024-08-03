import type { AppProps } from 'next/app'
import '~/styles/index.css'
//import '~/app/global.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
