import { createContext } from 'react'

interface Context {
  isMobile: boolean
  distance: number
  setDistance: (val: number | React.SetStateAction<number>) => void
}

export const DistanceContext = createContext<Context>({
  isMobile: false,
  distance: 0,
  setDistance: () => {},
})

export const useDistanceContext = () => {
  return useContext<Context>(DistanceContext)
}
