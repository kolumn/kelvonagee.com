import { cn } from '~/utils/cn'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAtom } from 'jotai'
import { reelAtom } from '~/store'

export default function Navbar() {
  const [{ isPlaying }, setReel] = useAtom(reelAtom)
  const router = useRouter()
  const isInCarouselMode = router.asPath.startsWith('/p')

  return (
    <div
      className={cn(
        'fixed left-0 top-0 z-50 m-4 flex w-[calc(100vw_-_2rem)] p-4 text-xs',
        { 'opacity-0': isInCarouselMode, 'mix-blend-overlay': isPlaying }
      )}
    >
      <div className="relative flex w-full justify-between font-light text-black">
        <div className="max-w-52 uppercase">&nbsp;</div>
        <Link href="/">
          <h1
            className={cn(
              'z-100 pointer-events-none absolute left-1/2 top-2 -translate-x-1/2 text-right text-xl font-black uppercase leading-[80%] text-black transition-opacity duration-1000 md:text-2xl',
              {
                'mix-blend-overlay': isPlaying,
              }
            )}
          >
            Kelvon Agee
          </h1>
        </Link>
        <div className="cursor-pointer font-bold uppercase">information</div>
      </div>
    </div>
  )
}
