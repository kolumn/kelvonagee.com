'use client'
import Image from 'next/image'
import { createRef, useState } from 'react'
import { cn } from '~/utils/cn'
import { useAtom } from 'jotai'
import { reelAtom } from '~/store'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

// const hiddenMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 30px, rgba(0,0,0,1) 30px, rgba(0,0,0,1) 30px)`
// const visibleMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 0px, rgba(0,0,0,1) 30px)`

function HeroImage({ src, ...rest }: { src: string; [key: string]: any }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)

  return (
    <motion.div
      className={cn('relative h-full w-full')}
      initial={false}
      // animate={
      //   isLoaded && isInView
      //     ? { WebkitMaskImage: visibleMask, maskImage: visibleMask }
      //     : { WebkitMaskImage: hiddenMask, maskImage: hiddenMask }
      // }
      animate={
        isLoaded && isInView
          ? { filter: 'blur(0px)', opacity: 1 } // Ends with no blur
          : { filter: 'blur(8px)', opacity: 0 } // Starts with a blur
      }
      transition={{ duration: 1, delay: 1 }}
      viewport={{ once: true }}
      onViewportEnter={() => setIsInView(true)}
    >
      <Image src={src} alt="" onLoad={() => setIsLoaded(true)} {...rest} />
    </motion.div>
  )
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
  const isInCarouselMode = router.asPath.startsWith('/p')
  const year = new Date().getFullYear()

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
      <div className="relative h-full w-full">
        <HeroImage
          src="/kelvon.jpeg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />

        <div
          className="absolute right-0 top-1/2 z-40 -translate-y-1/2 translate-x-full cursor-pointer text-white mix-blend-difference"
          onClick={() => toggleVideo()}
        >
          {!isPlaying && (
            <div className="flex flex-col gap-y-1 px-2 text-[9px] uppercase leading-none mix-blend-difference md:px-4 md:text-xs">
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
                <div className="tracking-wider">
                  {hasPlayed
                    ? `[${formatTime(currentTime)} / ${formatTime(duration)}]`
                    : `[${formatTime(duration)}]`}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col p-2 sm:col-span-2 md:col-span-1 md:p-4">
        <div className="flex-1">&nbsp;</div>
        <div className="flex w-full justify-between">
          <h1 className="max-w-60 text-[9px] font-black uppercase leading-none text-black md:text-xs">
            5x Emmy Nominated Producer &amp; Director based in Los Angeles
          </h1>
          <div
            className="items-ends hidden cursor-s-resize justify-end gap-x-2 sm:flex"
            onClick={() => handleScroll()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.99 16.5-3.75 3.75m0 0L4.49 16.5m3.75 3.75V3.75h11.25"
              />
            </svg>
            <div className="text-right text-[9px] font-black uppercase leading-none text-black md:text-xs">
              Selected work <br />
              (2012—{year})
            </div>
          </div>
        </div>
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
          'absolute left-1/2 top-1/2 z-20 aspect-video max-w-[80vw] -translate-x-1/2 -translate-y-1/2 outline-none',
          {
            'pointer-events-none z-[1] !opacity-0': !isPlaying,
          }
        )}
      />
      {isPlaying && (
        <div
          onClick={() => toggleVideo()}
          className={cn(
            'duration-50 absolute inset-0 h-full w-full bg-black opacity-0 transition-opacity',
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
