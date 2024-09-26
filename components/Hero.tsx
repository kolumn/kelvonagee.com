'use client'
import { createRef, useEffect, useState } from 'react'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import {
  aboutRefAtom,
  activeSectionAtom,
  reelPlayerAtom,
  reelRefAtom,
} from '~/store'
import { useRouter } from 'next/router'
import { motion, useInView } from 'framer-motion'
import { heroPhoto, heroText, contact } from '~/data/info'
import Image from 'next/image'
import formatTime from '~/utils/formatTime'

const variants = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: -16 },
}

export default function Hero() {
  const router = useRouter()
  const localAboutRef = createRef<HTMLDivElement>()
  const setAboutRef = useSetAtom(aboutRefAtom)
  const setActiveSection = useSetAtom(activeSectionAtom)
  const reelRef = useAtomValue(reelRefAtom)
  const [{ isPlaying, duration, currentTime }, setReel] =
    useAtom(reelPlayerAtom)
  // hero image
  const [isLoaded, setIsLoaded] = useState(false)
  const isInView = useInView(localAboutRef, { margin: '-200px' })
  const isInCarouselMode = router.asPath.startsWith('/p')

  useEffect(() => {
    // Set the ref in the atom on mount
    setAboutRef(localAboutRef?.current)
  }, [])

  useEffect(() => {
    if (isInView) setActiveSection('about')
  }, [isInView])

  const toggleVideo = () => {
    setReel({ duration, currentTime, isPlaying: !isPlaying })
    if (reelRef === null) return
    if (isPlaying === true) {
      reelRef.pause()
    } else {
      reelRef?.play()
      reelRef.onended = function (e) {
        setReel({ duration, currentTime, isPlaying: false })
      }
    }
  }

  if (isInCarouselMode) return <></>

  return (
    <div
      ref={localAboutRef}
      id="about"
      className="relative flex min-h-[calc(100dvh_-_65px)] scroll-mt-[65px] flex-col bg-white md:h-[calc(100dvh_-_65px)] md:flex-row"
    >
      <div className="flex flex-col p-2 md:col-span-3 md:w-1/2 md:justify-between md:p-4">
        <div>&nbsp;</div>
        <motion.div
          initial={false}
          animate={isLoaded ? 'open' : 'closed'}
          variants={variants}
          transition={{ delay: 2 }}
          className="flex w-full justify-between will-change-transform"
        >
          <div className="text-sm text-black sm:text-base">
            <div className="flex max-w-sm flex-col gap-y-4">
              <div className="flex flex-col gap-y-1">
                <h4 className="font-bold text-black/30">About</h4>
                <div className="flex flex-col gap-y-4">
                  <div
                    className="min-w-2xl flex flex-col gap-y-4"
                    dangerouslySetInnerHTML={{ __html: heroText }}
                  />
                  <div className="cursor-pointer" onClick={toggleVideo}>
                    <div className="flex items-center gap-x-1 font-medium">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="size-3 -translate-y-px"
                      >
                        <path d="M3 3.732a1.5 1.5 0 0 1 2.305-1.265l6.706 4.267a1.5 1.5 0 0 1 0 2.531l-6.706 4.268A1.5 1.5 0 0 1 3 12.267V3.732Z" />
                      </svg>
                      Play Cinematography Reel
                    </div>
                    <span className="text-xs tracking-wider">
                      {' '}
                      {currentTime && currentTime > 0
                        ? `${formatTime(currentTime)} / ${formatTime(duration)}`
                        : `${formatTime(duration)}`}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-y-1">
                <h4 className="font-bold text-black/30">Socials</h4>
                <div className="flex flex-col">
                  {contact.map(({ label, text, href }, idx) => (
                    <a
                      key={idx}
                      href={href}
                      className="flex w-max items-center gap-x-2 pr-1 font-medium transition-all hover:bg-white hover:text-black"
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
        </motion.div>
      </div>
      <div className="relative col-span-4 aspect-[5/8] overflow-hidden p-2 md:col-span-3 md:w-1/2 md:p-0 md:pb-4 md:pr-4">
        <motion.div
          className="relative h-full w-full will-change-transform"
          initial={{ opacity: 0, scale: 1.2 }}
          animate={
            isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.2 }
          }
          transition={{ duration: 1, delay: 1 }}
        >
          <Image
            className="object-cover"
            src={heroPhoto}
            alt=""
            onLoad={() => setIsLoaded(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill
            priority
          />
        </motion.div>
      </div>
    </div>
  )
}
