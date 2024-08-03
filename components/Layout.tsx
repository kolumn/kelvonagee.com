import Head from 'next/head'
import type { Metadata } from 'next'
import { Inter as FontSans, PT_Mono } from 'next/font/google'
import { cn } from '~/utils/cn'
import { PlayIcon } from '@heroicons/react/24/outline'
import Hero from './Hero'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Kelvon Agee',
  description: 'multi-disciplinary photographer based in Los Angeles',
}

// video reel url
// https://res.cloudinary.com/dpad3bstn/video/upload/v1722708337/kelvonagee.com/kelvon-agee-cine-reel_qmpfvz.mp4

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{metadata.title as string}</title>
        <meta name="description" content={metadata.description as string} />
        <meta property="og:site_name" content={metadata.title as string} />
        <meta
          property="og:description"
          content={metadata.description as string}
        />
        <meta property="og:title" content={metadata.title as string} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title as string} />
        <meta
          name="twitter:description"
          content={metadata.description as string}
        />
      </Head>
      <div className={cn('bg-black font-sans antialiased', fontSans.variable)}>
        <div className=" flex min-h-screen flex-col">
          <div className="fixed left-0 top-0 z-40 m-4 flex w-[calc(100vw_-_2rem)] justify-between p-4 text-xs font-light text-white mix-blend-difference">
            <div className="max-w-52">
              multi-disciplinary photographer based in los angeles
            </div>
            <div>information</div>
          </div>
          <Hero />

          {/* <MainNav items={siteConfig.mainNav} /> */}
          <main className="flex-1 bg-black">{children}</main>
          <footer className="flex justify-between p-6 text-center text-xs text-white/80 sm:p-12">
            <div>&copy; copyright 2016 — 2024. kelvon agee</div>
            <div>—</div>
          </footer>
        </div>
      </div>
    </>
  )
}
