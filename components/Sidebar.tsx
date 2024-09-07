import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { sidebarAtom } from '~/store'
import { cn } from '~/utils/cn'
import { bio, sidebarPhoto, contact } from '~/data/info'
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
          'fixed right-0 top-0 z-50 h-dvh w-full translate-x-full bg-black text-white transition-all duration-200 ease-in-out md:w-1/2',
          {
            'translate-x-0': isOpen,
          }
        )}
      >
        <div className="mt-2 flex h-full items-start overflow-auto p-2 md:mt-4 md:p-4">
          <div className="grid grid-cols-7">
            <div className="col-span-4 flex flex-col gap-y-4 px-2">
              <div className="text-xs font-black uppercase sm:text-sm">
                About
              </div>
              <div
                className="flex w-full flex-col gap-y-4 text-base font-black"
                dangerouslySetInnerHTML={{ __html: bio }}
              />
            </div>

            <div className="col-span-2 flex flex-col gap-y-4 text-xs font-black uppercase sm:text-sm">
              <div>Contact</div>
              <div className="flex flex-col">
                {contact.map(({ label, text, href }, idx) => (
                  <a
                    key={idx}
                    href={href}
                    className="flex w-max items-center gap-x-2 pr-1 transition-all hover:bg-white hover:text-black"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-2.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                      />
                    </svg>
                    {text}
                  </a>
                ))}
              </div>
            </div>
            <div
              className="cursor-pointer text-right text-xs font-black uppercase sm:text-sm"
              onClick={() => setSidebar({ isOpen: false })}
            >
              close
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
