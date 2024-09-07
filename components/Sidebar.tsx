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
          't fixed right-0 top-0 z-50 h-dvh w-full translate-x-full bg-black text-white transition-all duration-500 ease-in-out md:w-1/2',
          {
            'translate-x-0': isOpen,
          }
        )}
      >
        <div className="flex h-full flex-col overflow-auto p-2 md:p-4">
          <div
            className="m-2 cursor-pointer self-end text-xs font-black uppercase sm:text-sm md:m-4"
            onClick={() => setSidebar({ isOpen: false })}
          >
            close
          </div>
          <div className="flex flex-col gap-8 p-2 text-sm font-black md:p-4 lg:flex-row">
            <div className="flex w-full flex-col gap-y-8">
              <div className="w-full lg:w-2/3">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    fill
                    src={sidebarPhoto}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    alt=""
                  />
                </div>
              </div>

              <div
                className="flex w-full flex-col gap-y-4 text-base lg:max-w-[calc(100%-10rem)]"
                dangerouslySetInnerHTML={{ __html: bio }}
              />
              <div className="flex flex-col gap-y-1.5 text-xs font-black uppercase">
                <div className="text-base">Contact</div>
                <div className="flex flex-col">
                  {contact.map(({ label, text, href }, idx) => (
                    <a
                      key={idx}
                      href={href}
                      className="flex items-center gap-x-2 transition-all hover:bg-white hover:text-black w-max pr-1"
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
