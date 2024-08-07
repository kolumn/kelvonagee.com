import { createRef } from 'react'
import { cn } from '~/utils/cn'
import { useAtom } from 'jotai'
import { reelAtom } from '~/store'
import { useRouter } from 'next/router'

export default function Hero() {
  const router = useRouter()
  const videoRef = createRef<HTMLVideoElement>()
  const heroRef = createRef<HTMLDivElement>()
  const [{ isPlaying }, setReel] = useAtom(reelAtom)
  const isInCarouselMode = router.asPath.startsWith('/p')

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
      videoRef.current.onended = function (e) {
        setReel({ isPlaying: false })
      }
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
        'relative mx-2 mt-2 flex aspect-video md:h-[calc(100vh_-_6rem)] w-[calc(100vw_-_1rem)] flex-col justify-between bg-white p-2 md:mx-4 md:mt-4 md:w-[calc(100vw_-_2rem)] md:p-4 xl:h-[calc(100vh_-_2rem)]'
      )}
    >
      <video
        controls
        playsInline
        ref={videoRef}
        src="//res.cloudinary.com/dpad3bstn/video/upload/f_auto:video,q_auto/kelvon-agee-cine-reel_qmpfvz"
        onPlaying={() => setReel({ isPlaying: true })}
        className={cn(
          'object-fit absolute left-0 top-0 z-10 h-full w-full object-cover outline-none',
          { 'z-[1] !opacity-0': !isPlaying }
        )}
      />
      <div
        className={cn(
          'duration-50 absolute bottom-2 left-2 z-20 flex w-[calc(100vw_-_2rem)] items-end justify-between transition-opacity md:bottom-4 md:left-4 md:w-[calc(100vw_-_4rem)]',
          { 'pointer-events-none !opacity-0': isPlaying }
        )}
      >
        <h1 className="text-xs font-black uppercase leading-none text-black mix-blend-difference md:text-5xl lg:text-[3.5vw] lg:leading-[88%]">
          multi-disciplinary <br />
          photographer based <br />
          in los angeles, ca
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
          <span className="text-right text-xs font-black uppercase leading-none text-black">
            Selected work <br />
            (2016—2024)
          </span>
        </div>
      </div>

      <div
        className="absolute left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2 cursor-pointer text-white mix-blend-difference"
        onClick={() => handleVideo()}
      >
        {isPlaying ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-8 w-8 opacity-0 transition-opacity duration-200 hover:opacity-100 md:h-12 md:w-12"
          >
            <path
              fillRule="evenodd"
              d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557Z"
              clipRule="evenodd"
            />
            <path d="m10.748 13.93 2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-8 w-8 md:h-12 md:w-12"
          >
            <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z" />
          </svg>
        )}
      </div>
    </div>
  )
}
