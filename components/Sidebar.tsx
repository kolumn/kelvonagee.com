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
        <div className="flex h-full flex-col overflow-auto p-4">
          <div
            className="m-4 cursor-pointer self-end text-xs font-black uppercase md:text-base"
            onClick={() => setSidebar({ isOpen: false })}
          >
            close
          </div>

          <div className="flex flex-col gap-y-5 p-4 text-sm font-black">
            <p>
              Kelvon Agee is an Emmy Award-winning camera operator and a
              five-time Emmy nominee as a Director of Photography for
              Discovery’s Deadliest Catch. With a career spanning over 12 years,
              Kelvon has filmed some of the most iconic moments of unscripted
              television. He is credited with over 200 hours of television as a
              Producer and over 100 hours as a Director of Photography.
            </p>
            <p>
              Kelvon’s work has taken him across the globe, filming in Alaska,
              Hawaii, Canada, Mexico, El Salvador, Guatemala, Costa Rica, Chile,
              Argentina, Antarctica, Norway, and Fiji. His portfolio includes
              work on Deadliest Catch, its spin-offs Bloodline and The Viking
              Returns, Ice Road Truckers, Maritime Masters: Expedition
              Antarctica, Swamp People, World's Toughest Race: Eco-Challenge
              Fiji, Bering Sea Gold, and Life Below Zero.
            </p>
            <p>
              Most recently Kelvon shot the Netflix documentary Sprint: World's
              Fastest Humans for docu-series powerhouse Box to Box Films and has
              produced on two other upcoming series by the same company. Beyond
              his on-set experience, Kelvon brings over five years of
              post-production expertise, is proficient with AVID, and has
              written five episodes of unscripted television.
            </p>
            <p>
              Kelvon has also made his mark in branded content, creating
              captivating visuals for Chris Paul's company 'Ohh Dip' and the
              beauty brand 'Cotrini.'{' '}
            </p>
            <p>
              His client list includes Discovery Channel, History Channel,
              Netflix, Apple TV, National Geographic, Amazon Prime, and A&E.
            </p>
            <p>
              Born near the powerful cataracts of Niagara Falls, NY, Kelvon is
              also an avid gardener when he is not capturing beautiful stories
              through his lens. Kelvon Agee’s dedication to his craft and his
              ability to bring compelling stories to life make him a
              distinguished professional in the world of television and
              documentary filmmaking.
            </p>
            <div className="relative aspect-[4/6] w-full">
              <Image fill src="/kelvon.jpeg" alt="Kelvon Agee" />
            </div>
            <div className="flex flex-col gap-y-2 font-black uppercase">
              <span>Contact:</span>
              <div>
                <a href="mailto:kelvon@kelvonagee.com">kelvon@kelvonagee.com</a>{' '}
                &bull; <a href="https://instagram.com/lordkelvon">Instagram</a>
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
