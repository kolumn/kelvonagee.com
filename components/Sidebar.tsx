import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { sidebarAtom } from '~/store'
import { cn } from '~/utils/cn'
import { bio, image, contact } from '~/data/info'
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
          'fixed right-0 top-0 z-50 h-dvh w-full translate-x-full bg-black text-white transition-all duration-200 md:w-1/2',
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
          <div className="flex flex-col gap-6 p-4 text-sm font-black lg:flex-row">
            <div className="flex w-full flex-col gap-y-4 lg:w-1/2">
              <div
                className="flex w-full flex-col gap-y-4"
                dangerouslySetInnerHTML={{ __html: bio }}
              />
              <div className="flex flex-col gap-y-1 text-xs font-black uppercase">
                <span>Contact</span>
                <div className="flex flex-col">
                  {contact.map(({ label, text, href }, idx) => (
                    <a key={idx} href={href}>
                      {text}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative aspect-[4/6] w-full">
                <Image fill src={image} alt="Kelvon Agee" />
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
