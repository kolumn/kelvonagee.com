import { atom } from 'jotai'

export const carouselAtom = atom({ isOpen: false })
export const activeSectionAtom = atom<string | null>(null)
export const aboutRefAtom = atom<HTMLDivElement | null>(null)
export const photosRefAtom = atom<HTMLDivElement | null>(null)
export const reelRefAtom = atom<HTMLVideoElement | null>(null)
export const reelPlayerAtom = atom<{
  isPlaying: boolean
  duration: number
  currentTime: number
}>({
  isPlaying: false,
  duration: 188, // DEFAULT REEL DURATION
  currentTime: 0,
})
