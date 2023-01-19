import { createContext } from 'react'
import device from 'current-device'

import { ScrollTrigger } from 'gsap/ScrollTrigger'

import HeaderSection from '@/components/Header'
import FirstSection from './components/FirstSection'
import TroubledSection from './components/TroubledSection'
import ThemeSection from './components/ThemeSection'
import PeriodSection from './components/PeriodSection'
import FooterSection from '@/components/Footer'

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
  const [resetFirst, setResetFirst] = useState(0)
  const setTimerRef = useRef<number | null>(null)

  const resizeReset = useCallback(() => {
    setTimerRef.current = setTimeout(() => {
      ScrollTrigger.killAll()
      setThrough([])
      setDistance(0)
      setResetFirst((num) => num + 1)
    }, 250)
  }, [])

  const main = [
    {
      distance: 1,
      tag: 'troubled',
      section: TroubledSection,
    },
    {
      distance: 2,
      tag: 'theme',
      section: ThemeSection,
    },
    {
      distance: 3,
      tag: 'period',
      section: PeriodSection,
    },
  ]

  useEffect(() => {
    if (!distance) return

    main.forEach((item) => {
      if (item.distance === distance && !through.includes(item.tag)) {
        setThrough((data) => [...data, item.tag])
      }
    })
  }, [distance])

  useEffect(() => {
    if (device.mobile()) return
    window.addEventListener('resize', () => {
      clearTimeout(setTimerRef.current || 0)
      resizeReset()
    })
  }, [])

  return (
    <FatherContext.Provider value={{ distance, setDistance }}>
      <div className="flex h-[1500vh] flex-col items-center overflow-hidden bg-background">
        <HeaderSection />
        <FirstSection resetFirst={resetFirst} />
        {main.map((item) => through.includes(item.tag) && <item.section />)}
        <FooterSection />
      </div>
    </FatherContext.Provider>
  )
}

export default Home
