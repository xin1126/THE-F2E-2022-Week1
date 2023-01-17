import { createContext } from 'react'

import FirstSection from './components/FirstSection'
import TroubledSection from './components/TroubledSection'
import ThemeSection from './components/ThemeSection'
import FooterSection from '@/components/Footer'
import HeaderSection from '@/components/Header'

export interface Context {
  distance: number
  setDistance: (val: number | React.SetStateAction<number>) => void
}

export const FatherContext = createContext<Context>({
  distance: 0,
  setDistance: () => {},
})

const Home: React.FC = () => {
  const [distance, setDistance] = useState(0)
  const [through, setThrough] = useState<string[]>([])

  useEffect(() => {
    if (!distance) return
    switch (distance) {
      case 1:
        if (through.includes('troubled')) return
        setThrough((data) => [...data, 'troubled'])
        break
      case 2:
        if (through.includes('theme')) return
        setThrough((data) => [...data, 'theme'])
        break
    }
  }, [distance])

  return (
    <FatherContext.Provider value={{ distance, setDistance }}>
      <div className="flex h-[1500vh] flex-col items-center overflow-hidden bg-[#ffc37d]">
        <HeaderSection />
        <FirstSection />
        {through.includes('troubled') && <TroubledSection />}
        {through.includes('theme') && <ThemeSection />}
        <FooterSection />
      </div>
    </FatherContext.Provider>
  )
}

export default Home
