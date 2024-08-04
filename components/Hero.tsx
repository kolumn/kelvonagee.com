import { PlayIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { createRef, useEffect, useState } from 'react'
import { cn } from '~/utils/cn'
import { useAtom } from 'jotai'
import { reelAtom } from '~/store'
import { useRouter } from 'next/router'

export default function Hero() {
  const router = useRouter()
  const videoRef = createRef<HTMLVideoElement>()
  const [{ isPlaying }, setReel] = useAtom(reelAtom)
  const isInCarouselMode = router.asPath.startsWith('/p')

  // useEffect(() => {
  //   window.addEventListener('unhandledrejection', (event) => {
  //     console.log(event.reason)
  //   })
  // }, [])

  async function playMedia() {
    try {
      await videoRef?.current?.play()
    } catch (err) {}
  }

  const handleVideo = () => {
    setReel({ isPlaying: !isPlaying })
    if (videoRef.current === null) return
    if (isPlaying === true) {
      videoRef.current.pause()
    } else {
      playMedia()
      // videoRef.current.currentTime = 0.1
      // videoRef.current.play()
    }
  }

  if (isInCarouselMode) return <></>

  return (
    <div className="relative m-4 flex aspect-video w-[calc(100vw_-_2rem)] flex-col justify-between bg-white p-4 xl:min-h-[calc(100vh_-_6rem)]">
      <video
        controls
        playsInline
        ref={videoRef}
        src="//res.cloudinary.com/dpad3bstn/video/upload/f_auto:video,q_auto/kelvon-agee-cine-reel_qmpfvz"
        className={cn(
          'absolute left-0 top-0 z-10 h-full w-full object-cover outline-none',
          { 'z-[1] !opacity-0': !isPlaying }
        )}
      />

      {/* <video
        ref={videoRef}
        controls
        autoPlay
        loop
        playsInline
        poster="/og-image.png"
        src="//res.cloudinary.com/dpad3bstn/video/upload/v1722708337/kelvon-agee-cine-reel_qmpfvz.mp4"
        className={cn(
          'pointer-events-none absolute left-0 top-0 z-10 h-full w-full object-cover outline-none',
          { '!z-[-10] !opacity-0': !isPlaying }
        )}
      >
        <source
          src="//res.cloudinary.com/dpad3bstn/video/upload/f_auto:video,q_auto/kelvon-agee-cine-reel_qmpfvz"
          type="video/mp4"
        />
        <source
          src="//res.cloudinary.com/dpad3bstn/video/upload/v1722708337/kelvon-agee-cine-reel_qmpfvz.mp4"
          type="video/mp4"
        />
        <source
          src="//res.cloudinary.com/dpad3bstn/video/upload/v1722727479/kelvon-agee-cine-reel_noxmw1.webm"
          type="video/webm"
        />
        Your browser does not support the video tag.
      </video> */}
      <h1
        className={cn(
          'pointer-events-none absolute bottom-2 left-4 z-20 text-xl font-black uppercase leading-[80%] text-white mix-blend-difference transition-opacity duration-50 md:text-7xl lg:text-[3vw]',
          { '!opacity-0': isPlaying }
        )}
      >
        multi-disciplinary <br />
        photographer based <br />
        in los angeles, ca.
      </h1>
      <div
        className="absolute left-1/2 top-1/2 z-40 h-16 w-16 -translate-x-1/2 -translate-y-1/2 cursor-pointer text-white mix-blend-difference"
        onClick={() => handleVideo()}
      >
        {isPlaying ? (
          <EyeSlashIcon className="opacity-0 transition-opacity duration-200 hover:opacity-100" />
        ) : (
          <PlayIcon />
        )}
      </div>
    </div>
  )
}
