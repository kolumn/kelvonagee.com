import Link from 'next/link'
import { cn } from '~/utils/cn'
import { useRouter } from 'next/router'
import { useAtom, useAtomValue } from 'jotai'
import {
  aboutRefAtom,
  photosRefAtom,
  reelPlayerAtom,
  reelRefAtom,
  activeSectionAtom,
} from '~/store'

const links = [
  { id: 'about', text: 'About' },
  { id: 'photos', text: 'Photos' },
  { id: 'reel', text: 'Reel' },
]

export default function Navbar() {
  const [activeSection, setActiveSection] = useAtom(activeSectionAtom)
  const aboutRef = useAtomValue(aboutRefAtom)
  const photosRef = useAtomValue(photosRefAtom)
  const reelRef = useAtomValue(reelRefAtom)
  const [{ isPlaying, duration, currentTime }, setReel] =
    useAtom(reelPlayerAtom)

  const router = useRouter()
  const isInCarouselMode = router.asPath.startsWith('/p')

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

  const handleClick = (id: string) => {
    switch (id) {
      case 'about':
        aboutRef?.scrollIntoView({ behavior: 'smooth' })
        setActiveSection('about')
        break
      case 'photos':
        photosRef?.scrollIntoView({ behavior: 'smooth' })
        setActiveSection('photos')
        break
      case 'reel':
        toggleVideo()
        break
      default:
        break
    }
  }

  return (
    <div
      className={cn(
        'fixed left-0 top-0 z-40 flex w-full bg-white p-2 text-xs md:p-4',
        {
          'pointer-events-none bg-transparent opacity-20':
            isInCarouselMode || isPlaying,
        }
      )}
    >
      <div className="relative flex w-full justify-between font-light">
        <div className="flex flex-col gap-y-px">
          <h5 className="text-sm font-semibold">Visual Storyteller</h5>
          <h1 className="text-sm font-semibold">Kelvon Agee</h1>
        </div>
        <Link
          href="/"
          className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-black/90 sm:block"
        >
          {/* <svg
            width="50"
            // height="201"
            viewBox="0 0 344 201"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M67.2137 110.102L95.5824 147.267C97.2164 149.411 96.8066 152.472 94.6652 154.106C92.5188 155.74 89.4578 155.328 87.826 153.188L62.8744 120.498L39.8034 144.013V180.808C39.8034 191.784 30.8768 200.71 19.9017 200.71C8.9266 200.71 0 191.783 0 180.808V21.0015C0 10.0262 8.9266 1.09987 19.9017 1.09987C30.8768 1.09987 39.8034 10.0265 39.8034 21.0015C39.8034 23.6941 37.6181 25.8796 34.9254 25.8796C32.2326 25.8796 30.0473 23.6943 30.0473 21.0015C30.0473 15.5015 25.4009 10.8553 19.9011 10.8553C14.4013 10.8553 9.75486 15.5018 9.75486 21.0015V180.808C9.75486 186.403 14.306 190.954 19.9008 190.954C25.4956 190.954 30.0468 186.403 30.0468 180.808V142.019C30.0468 140.743 30.5468 139.516 31.442 138.604L59.851 109.649C60.8412 108.64 62.185 108.101 63.6363 108.196C65.0484 108.283 66.3551 108.977 67.2137 110.102ZM91.1142 92.1971L149.07 168.172C152.462 172.14 154.06 177.192 153.572 182.423C153.082 187.713 150.411 192.655 146.243 196.006C142.77 199.084 138.38 200.711 133.533 200.711C127.919 200.711 122.482 198.091 118.611 193.523C118.56 193.46 118.509 193.394 118.458 193.331L98.0533 166.595C96.4192 164.451 96.829 161.39 98.9704 159.756C101.112 158.119 104.175 158.529 105.809 160.673L126.133 187.305C128.138 189.627 130.83 190.956 133.535 190.956C136.055 190.956 138.113 190.205 139.83 188.659C139.908 188.588 139.988 188.52 140.069 188.456C142.227 186.749 143.608 184.22 143.861 181.52C144.103 178.915 143.301 176.405 141.603 174.452C141.535 174.371 141.466 174.291 141.405 174.208L80.7629 94.7162C79.2799 92.77 79.4652 90.0263 81.1994 88.3018L141.298 28.4772C145.134 24.4551 145.17 17.9577 141.29 14.0776C137.317 10.1071 130.856 10.1022 126.883 14.0779L38.3803 102.851C36.9829 104.251 34.8853 104.666 33.0634 103.917C31.239 103.161 30.0487 101.383 30.0487 99.4076V46.5179C30.0487 43.8254 32.234 41.6399 34.9267 41.6399C37.6195 41.6399 39.8048 43.8252 39.8048 46.5179V87.6057L119.979 7.18401C123.811 3.34767 128.818 1.24014 134.084 1.24014C139.352 1.24014 144.359 3.34997 148.186 7.17911C155.783 14.7717 155.82 27.3889 148.264 35.3015L91.1142 92.1971ZM342.62 173.633C346.306 184.32 341.081 195.662 330.77 199.572C328.304 200.555 325.372 200.708 323.848 200.708C315.553 200.708 308.112 195.577 305.333 187.938L293.157 155.637H233.526L221.331 187.992C218.153 195.771 210.804 200.712 202.562 200.712C200.16 200.712 198.021 200.373 195.83 199.644C185.328 195.663 180.102 184.323 183.745 173.759L244.157 12.7428C247.364 4.89903 255.193 -0.203329 263.206 0.0138173C271.399 -0.3009 278.997 4.78671 282.196 12.6086L300.585 61.6046C301.531 64.1266 300.253 66.9362 297.731 67.8826C295.207 68.8289 292.397 67.551 291.451 65.0291L273.117 16.1656C271.471 12.1486 267.656 9.54635 263.417 9.76552C263.273 9.77283 263.129 9.76805 262.983 9.76552C258.978 9.57764 254.866 12.3288 253.242 16.3018L192.922 177.059C191.053 182.483 193.749 188.425 199.1 190.454C200.092 190.781 201.219 190.956 202.558 190.956C206.822 190.956 210.624 188.393 212.249 184.424L225.585 149.039C226.303 147.139 228.12 145.88 230.151 145.88H296.53C298.562 145.88 300.382 147.139 301.096 149.039L314.481 184.554C315.881 188.405 319.637 190.956 323.847 190.956C325.471 190.956 326.686 190.702 327.23 190.485C332.661 188.422 335.357 182.483 333.442 176.936L298.845 84.7357C297.899 82.2137 299.177 79.4041 301.699 78.4577C304.223 77.5088 307.033 78.7893 307.979 81.3111L342.62 173.633ZM248.476 101.061C250.998 102.01 252.271 104.825 251.322 107.347L248.122 115.835H278.278L263.2 75.8181L258.456 88.4108C257.505 90.9302 254.693 92.1985 252.171 91.2573C249.649 90.3084 248.373 87.4916 249.324 84.9722L258.631 60.2625C259.348 58.3625 261.166 57.1038 263.197 57.1038C265.229 57.1038 267.048 58.3624 267.763 60.2625L289.889 118.993C290.453 120.49 290.248 122.171 289.336 123.488C288.424 124.805 286.926 125.59 285.324 125.59H241.071C239.468 125.59 237.968 124.805 237.058 123.488C236.149 122.171 235.941 120.49 236.505 118.993L242.19 103.905C243.139 101.38 245.954 100.108 248.476 101.061Z"
              fill="currentColor"
            />
          </svg> */}
          <svg
            width="44"
            //height="178"
            viewBox="0 0 344 178"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M142.595 0V1.01491L63.6855 86.0134L149.191 175.579V177.609H107.834L33.4919 98.9535V177.609H0V0H33.4919V75.1032L100.983 0H142.595ZM307.263 177.609L292.293 144.117H199.429L184.206 177.609H147.923L227.593 0H264.13L343.8 177.609H307.263ZM278.846 112.908L245.861 37.2978L212.877 112.908H278.846Z"
              fill="currentColor"
            />
          </svg>
        </Link>
        <div className="flex flex-col gap-y-px text-right">
          <div className="text-sm font-semibold text-black">
            <a href="mailto:kelvon@kelvonagee.com">kelvon@kelvonagee.com</a>
          </div>
          <div className="flex justify-end gap-x-1">
            {links.map(({ id, text }, idx) => {
              return (
                <div
                  key={idx}
                  className="flex text-sm font-semibold text-black/30"
                >
                  <a
                    className={cn('', {
                      'text-black/90':
                        (!isPlaying && activeSection === id) ||
                        (isPlaying && id === 'reel'),
                    })}
                    href={`#${id}`}
                    onClick={() => handleClick(id)}
                  >
                    {text}
                  </a>
                  {idx < links.length - 1 && ', '}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
