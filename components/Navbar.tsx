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
        {
          'pointer-events-none z-[-5] opacity-0': isInCarouselMode || isPlaying,
        }
      )}
    >
      <div className="relative flex w-full justify-between font-light text-black">
        <div className="max-w-52 uppercase">&nbsp;</div>
        <Link href="/">
          <h1 className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-black uppercase text-black mix-blend-overlay md:text-base">
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
