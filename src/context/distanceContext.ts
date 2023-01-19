import { createContext } from 'react'

interface Context {
  distance: number
  setDistance: (val: number | React.SetStateAction<number>) => void
}

export const DistanceContext = createContext<Context>({
  distance: 0,
  setDistance: () => {},
})

export const useDistanceContext = () => {
  return useContext<Context>(DistanceContext)
}
