import { createContext } from 'react'

import FirstSection from './components/FirstSection'
import TroubledSection from './components/TroubledSection'
import ThemeSection from './components/ThemeSection'

export interface Context {
  distance: number
  footerDom: HTMLDivElement | null
  setDistance: (str: number) => void
  setfooterDom: (dom: HTMLDivElement | null) => void
}

export const FatherContext = createContext<Context>({
  distance: 0,
  footerDom: null,
  setDistance: () => {},
  setfooterDom: () => {},
})

const Home: React.FC = () => {
  const [distance, setDistance] = useState(0)
  const [footerDom, setfooterDom] = useState<HTMLDivElement | null>(null)

  return (
    <FatherContext.Provider
      value={{ distance, footerDom, setDistance, setfooterDom }}
    >
      <div className="flex h-[1000vh] flex-col items-center bg-[#ffc37d]">
        <FirstSection />
        {distance > 0 && <TroubledSection />}
        {distance > 1 && <ThemeSection />}
      </div>
    </FatherContext.Provider>
  )
}

export default Home
