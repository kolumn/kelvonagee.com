import { useAtom, useSetAtom } from 'jotai'
import Link from 'next/link'
import Image from 'next/image'
import { createRef, useEffect } from 'react'
import { activeSectionAtom, photosRefAtom } from '~/store'
import { useInView } from 'framer-motion'

export default function PhotoGrid({
  images,
  lastViewedPhoto,
  lastViewedPhotoRef,
}) {
  const photosRef = createRef<HTMLDivElement>()
  const setPhotosRef = useSetAtom(photosRefAtom)
  const [activeSection, setActiveSection] = useAtom(activeSectionAtom)
  const isInView = useInView(photosRef, { margin: '-200px' })

  useEffect(() => {
    setActiveSection(isInView ? 'photos' : activeSection)
  }, [isInView])

  useEffect(() => {
    // Set the ref in the atom on mount
    setPhotosRef(photosRef?.current)

    const handleContextmenu = (e) => {
      e.preventDefault()
    }
    document.addEventListener('contextmenu', handleContextmenu)
    return function cleanup() {
      document.removeEventListener('contextmenu', handleContextmenu)
    }
  }, [])

  return (
    <div
      ref={photosRef}
      id="photos"
      className="scroll-mt-[65px] columns-2 gap-2 sm:columns-3 md:gap-4 xl:columns-6 2xl:columns-8"
    >
      {images.map(
        ({ id, public_id, format, blurDataUrl, topLevelDirectory }) => (
          <Link
            key={id}
            href={`/?photoId=${id}`}
            as={`/p/${id}`}
            // @ts-ignore
            ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
            shallow
            className="relative mb-2 block w-full cursor-zoom-in after:pointer-events-none hover:opacity-100 sm:scale-[.80] sm:opacity-80 sm:transition-all sm:duration-300 sm:hover:scale-100 md:mb-4"
          >
            <>
              <Image
                alt=""
                className="transform brightness-90 transition will-change-auto group-hover:brightness-110"
                style={{ transform: 'translate3d(0, 0, 0)' }}
                placeholder="blur"
                blurDataURL={blurDataUrl}
                src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
                width={720}
                height={480}
                sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
              />
              {/* <p className="mt-1.5 text-xs font-normal uppercase tracking-wider text-black/10">
                    {topLevelDirectory}
                  </p> */}
            </>
          </Link>
        )
      )}
    </div>
  )
}
