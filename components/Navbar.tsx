import { cn } from '~/utils/cn'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAtom } from 'jotai'
import { reelAtom, sidebarAtom } from '~/store'

export default function Navbar() {
  const [{ isPlaying }, setReel] = useAtom(reelAtom)
  const [{ isOpen }, setSidebar] = useAtom(sidebarAtom)
  const router = useRouter()
  const isInCarouselMode = router.asPath.startsWith('/p')

  return (
    <div
      className={cn(
        'fixed left-0 top-0 z-50 m-2 flex w-[calc(100vw_-_1rem)] p-2 text-xs md:m-4 md:w-[calc(100vw_-_2rem)] md:p-4',
        { 'opacity-0': isInCarouselMode, 'mix-blend-overlay': isPlaying }
      )}
    >
      <div className="relative flex w-full justify-between font-light text-black">
        <div className="max-w-52 uppercase">&nbsp;</div>
        <Link href="/">
          <h1
            className={cn(
              'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-black uppercase text-black md:left-2 md:-translate-x-0 md:text-base',
              {
                'mix-blend-overlay': isPlaying,
              }
            )}
          >
            Kelvon Agee
          </h1>
        </Link>
        <div
          className="cursor-pointer text-xs font-black uppercase md:text-base"
          onClick={() => setSidebar({ isOpen: !isOpen })}
        >
          info
        </div>
      </div>
    </div>
  )
}
