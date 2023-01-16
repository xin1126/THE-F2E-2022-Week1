import { createContext } from 'react'

import FirstSection from './components/FirstSection'
import TroubledSection from './components/TroubledSection'
import ThemeSection from './components/ThemeSection'
import FooterSection from '@/components/Footer'

export interface Context {
  distance: number
  setDistance: (str: number | Function) => void
}

export const FatherContext = createContext<Context>({
  distance: 0,
  setDistance: () => {},
})

const Home: React.FC = () => {
  const [distance, setDistance] = useState(0)
  const [tempDistance, setTempDistance] = useState(0)

  useEffect(() => {
    if (!distance) return
    setTempDistance((data) => data + 1)
  }, [distance])

  return (
    <FatherContext.Provider value={{ distance, setDistance }}>
      <div className="flex h-[1500vh] flex-col items-center bg-[#ffc37d]">
        <FirstSection />
        {tempDistance > 0 && <TroubledSection />}
        {tempDistance > 1 && <ThemeSection />}
        <FooterSection />
      </div>
    </FatherContext.Provider>
  )
}

export default Home
