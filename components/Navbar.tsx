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
        'fixed left-0 top-0 z-50 m-4 flex w-[calc(100vw_-_2rem)] p-4 text-xs',
        { 'opacity-0': isInCarouselMode, 'mix-blend-overlay': isPlaying }
      )}
    >
      <div className="relative flex w-full justify-between font-light text-black">
        {/* <div className="max-w-52 uppercase">&nbsp;</div> */}
        <Link href="/">
          <h1
            className={cn(
              'text-xs font-black uppercase text-black md:text-base',
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
          information
        </div>
      </div>
    </div>
  )
}
