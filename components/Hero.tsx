import { PlayIcon, PauseIcon } from '@heroicons/react/24/outline'
import { createRef, useState } from 'react'
import { cn } from '~/utils/cn'

export default function Hero() {
  const videoRef = createRef<HTMLVideoElement>()
  const [isPlaying, setIsPlaying] = useState(false)

  const handleVideo = () => {
    setIsPlaying(!isPlaying)
    if (videoRef.current === null) return
    if (isPlaying === true) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
  }

  return (
    <div
      className="relative m-4 flex aspect-video flex-col justify-between bg-white p-4 md:min-h-[calc(100vh_-_6rem)]"
      onClick={() => handleVideo()}
    >
      <video
        ref={videoRef}
        // controls
        loop
        className={cn(
          'pointer-events-none absolute left-0 top-0 z-10 h-full w-full object-cover outline-none',
          { '!z-[-10] !opacity-0': !isPlaying }
        )}
      >
        <source
          src="https://res.cloudinary.com/dpad3bstn/video/upload/v1722708337/kelvon-agee-cine-reel_qmpfvz.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <h1
        className={cn(
          'pointer-events-none absolute bottom-2 left-4 z-20 max-w-64 text-xl font-black uppercase leading-none text-white mix-blend-difference transition-opacity duration-1000 md:text-7xl lg:text-[8vw]',
          { '!opacity-0': isPlaying }
        )}
      >
        Kelvon Agee
      </h1>
      <div className="absolute left-1/2 top-1/2 z-40 h-10 w-10 -translate-x-1/2 -translate-y-1/2 text-white mix-blend-difference">
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </div>
    </div>
  )
}
