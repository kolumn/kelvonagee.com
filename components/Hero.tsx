'use client'
import Image from 'next/image'
import { createRef, useEffect, useState } from 'react'
import { cn } from '~/utils/cn'
import { useAtom } from 'jotai'
import { reelAtom } from '~/store'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { heroPhoto, heroText } from '~/data/info'

const variants = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: -16 },
}

const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60)
  const seconds = Math.floor(timeInSeconds % 60)
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

export default function Hero() {
  const router = useRouter()
  const videoRef = createRef<HTMLVideoElement>()
  const heroRef = createRef<HTMLDivElement>()
  const [hasPlayed, setHasPlayed] = useState<Boolean>(false)
  const [duration, setDuration] = useState(188)
  const [currentTime, setCurrentTime] = useState(0)
  const [{ isPlaying }, setReel] = useAtom(reelAtom)
  const [isLoaded, setIsLoaded] = useState(false)

  const isInCarouselMode = router.asPath.startsWith('/p')
  const year = new Date().getFullYear()

  useEffect(() => {
    if (isPlaying) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isPlaying])

  async function playMedia() {
    try {
      await videoRef?.current?.play()
    } catch (err) {}
  }

  const toggleVideo = () => {
    setHasPlayed(true)
    setReel({ isPlaying: !isPlaying })
    if (videoRef.current === null) return
    if (isPlaying === true) {
      videoRef.current.pause()
    } else {
      playMedia()
      videoRef.current.onended = function (e) {
        setReel({ isPlaying: false })
      }
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleScroll = () => {
    window.scrollTo({
      // @ts-ignore
      top: heroRef?.current?.clientHeight + 16,
      left: 0,
      behavior: 'smooth',
    })
  }

  if (isInCarouselMode) return <></>

  return (
    <div
      ref={heroRef}
      className={cn(
        'relative mx-2 mt-2 grid h-80 w-[calc(100vw_-_1rem)] grid-cols-2 bg-white sm:grid-cols-3 md:mx-4 md:mt-4 md:h-[calc(100vh_-_6rem)] md:w-[calc(100vw_-_2rem)] md:grid-cols-2 xl:h-[calc(100vh_-_2rem)]'
      )}
    >
      <div className="relative h-full w-full overflow-hidden">
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
      <div className="flex flex-col justify-between p-2 sm:col-span-2 md:col-span-1 md:p-4">
        <div>&nbsp;</div>
        <motion.div
          initial={false}
          animate={isLoaded ? 'open' : 'closed'}
          variants={variants}
          transition={{ delay: 1.5 }}
          className="-ml-10 mix-blend-difference will-change-transform md:-ml-16"
        >
          <h1 className="max-w-md text-base font-black uppercase leading-none text-gray-600 md:text-lg">
            {heroText}
          </h1>
        </motion.div>

        <motion.div
          initial={false}
          animate={isLoaded ? 'open' : 'closed'}
          variants={variants}
          transition={{ delay: 2 }}
          className="flex w-full justify-between will-change-transform"
        >
          <div
            className="cursor-pointer text-xs uppercase text-black sm:text-sm"
            onClick={() => toggleVideo()}
          >
            <div className="flex items-center gap-x-px">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="size-3 -translate-y-px"
              >
                <path d="M3 3.732a1.5 1.5 0 0 1 2.305-1.265l6.706 4.267a1.5 1.5 0 0 1 0 2.531l-6.706 4.268A1.5 1.5 0 0 1 3 12.267V3.732Z" />
              </svg>

              <div className="font-black">Play reel</div>
            </div>
            <div className="flex items-center gap-x-px">
              <div className="font-normal tracking-wider">
                {hasPlayed
                  ? `[${formatTime(currentTime)} / ${formatTime(duration)}]`
                  : `[${formatTime(duration)}]`}
              </div>
            </div>
          </div>
          <div className="hidden sm:flex sm:flex-col">
            <div className="text-right text-xs font-black uppercase sm:text-sm">
              Captured Frames
            </div>
            <div
              className="flex cursor-s-resize items-center justify-end gap-x-1 font-normal"
              onClick={() => handleScroll()}
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
                  d="m11.99 16.5-3.75 3.75m0 0L4.49 16.5m3.75 3.75V3.75h11.25"
                />
              </svg>
              <div className="cursor-s-resize text-xs uppercase sm:text-sm">
                [2012 - {year}]
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <video
        ref={videoRef}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onPlaying={() => setReel({ isPlaying: true })}
        controls
        playsInline
        src="//res.cloudinary.com/dpad3bstn/video/upload/f_auto:video,q_auto/kelvonagee-reel"
        className={cn(
          'fixed left-1/2 top-1/2 z-40 aspect-video max-w-[90vw] -translate-x-1/2 -translate-y-1/2 outline-none md:max-w-[80vw]',
          {
            'pointer-events-none z-[-1] !opacity-0': !isPlaying,
          }
        )}
      />
      {isPlaying && (
        <div
          onClick={() => toggleVideo()}
          className={cn(
            'fixed inset-0 z-20 bg-black/70 opacity-0 backdrop-blur-2xl transition-opacity',
            {
              'opacity-100': isPlaying,
            }
          )}
        >
          &nbsp;
        </div>
      )}
    </div>
  )
}
