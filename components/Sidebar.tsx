import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { sidebarAtom } from '~/store'
import { cn } from '~/utils/cn'
import Image from 'next/image'

export default function Sidebar() {
  const [{ isOpen }, setSidebar] = useAtom(sidebarAtom)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  return (
    <>
      <div
        className={cn(
          'fixed right-0 top-0 z-50 h-screen w-full translate-x-full bg-black text-white transition-all duration-200 md:w-1/2',
          {
            'translate-x-0': isOpen,
          }
        )}
      >
        <div className="flex h-full scroll-pb-10 flex-col overflow-auto p-4">
          <div
            className="m-4 cursor-pointer self-end text-xs font-black uppercase md:text-base"
            onClick={() => setSidebar({ isOpen: false })}
          >
            close
          </div>

          <div className="flex flex-col gap-y-6 p-4 text-sm font-black lg:flex-row">
            <div className="flex w-full flex-col gap-y-4 px-2.5 lg:w-1/2">
              <p>
                I am a Producer/Director/DP with a documentary background, who
                specializes in capturing authentic narratives with a cinematic
                lens. Building my career in career in Documentary stoytelling, I
                have produced over 200 and directed over 100 hours of
                programming, including Deadliest Catch, Sprint: World’s Fastest
                Humans, Maritime Masters: Expedition Antartica, Swamp People,
                Worlds Toughest Race: Eco Challenge Fiji, and Life Below Zero;
                while garnering 5 Prime Time Emmy Nominations for
                Cinematography. I have also shot a wide range of campaigns, ads,
                and organic content for clients such as Chris Paul, Seal
                (Leica), Cotrini Beauty, The Big 10 Network and Logitech.
              </p>
              <p>
                My personal mission is to authentically bring your story to
                screen, and tell the narratives that need to be told. Equal
                parts problem solver, creative and compassionate, I always push
                my clients and colleagues alike to create dynamic, purposeful
                content.
              </p>
              <div className="flex flex-col gap-y-1.5 text-xs font-black uppercase">
                <span>Contact</span>
                <div className="flex flex-col">
                  <div>
                    Email:
                    <a href="mailto:kelvon@kelvonagee.com">
                      kelvon@kelvonagee.com
                    </a>
                  </div>
                  <div>
                    <a href="https://instagram.com/lordkelvon">Instagram</a>{' '}
                    &bull;{' '}
                    <a href="https://www.imdb.com/name/nm5559286/">IMDB</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full px-2.5 lg:order-first lg:w-1/2">
              <div className="relative aspect-[4/6] w-full">
                <Image fill src="/kelvon.jpeg" alt="Kelvon Agee" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={cn(
          'visible fixed left-0 top-0 z-40 h-screen w-screen bg-black/[.10]',
          { 'pointer-events-none invisible z-[-1] opacity-0': !isOpen }
        )}
        onClick={() => setSidebar({ isOpen: false })}
      >
        &nbsp;
      </div>
    </>
  )
}
