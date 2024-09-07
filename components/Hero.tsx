'use client'
import Image from 'next/image'
import { createRef, useState } from 'react'
import { cn } from '~/utils/cn'
import { useAtom } from 'jotai'
import { reelAtom } from '~/store'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

const hiddenMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 30px, rgba(0,0,0,1) 30px, rgba(0,0,0,1) 30px)`
const visibleMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 0px, rgba(0,0,0,1) 30px)`

function FanImage({ src, ...rest }: { src: string; [key: string]: any }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)

  return (
    <motion.div
      className={cn('relative h-full w-full')}
      initial={false}
      animate={
        isLoaded && isInView
          ? { WebkitMaskImage: visibleMask, maskImage: visibleMask }
          : { WebkitMaskImage: hiddenMask, maskImage: hiddenMask }
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
    console.log('videoRef.currentTime', videoRef.current.currentTime)
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
        'relative mx-2 mt-2 grid h-80 w-[calc(100vw_-_1rem)] grid-cols-2 bg-white p-2 md:mx-4 md:mt-4 md:h-[calc(100vh_-_6rem)] md:w-[calc(100vw_-_2rem)] md:p-4 xl:h-[calc(100vh_-_2rem)]'
      )}
    >
      <div className="relative h-full w-full">
        <FanImage
          src="/kelvon.jpeg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />

        <div
          className="absolute left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2 cursor-pointer text-white mix-blend-difference transition duration-200 hover:scale-125"
          onClick={() => toggleVideo()}
        >
          {!isPlaying && (
            <div className="flex flex-col gap-y-1 text-center text-xs font-black uppercase leading-none mix-blend-difference">
              <div>Play reel</div>{' '}
              <div>
                {hasPlayed
                  ? `[${formatTime(currentTime)} / ${formatTime(duration)}]`
                  : `[${formatTime(duration)}]`}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col pl-2 md:pl-4">
        <div className="flex-1">&nbsp;</div>
        <div className="flex w-full justify-between">
          <h1 className="text-xs font-black uppercase leading-none text-black">
            5x Emmy Nominated Producer <br />
            &amp; Director based in Los Angeles
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
            <div className="text-right text-xs font-black uppercase leading-none text-black">
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
