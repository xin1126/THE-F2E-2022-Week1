import device from 'current-device'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { DistanceContext } from '@/context/distanceContext'

import HeaderSection from '@/components/Header'
import FirstSection from './components/FirstSection'
import TroubledSection from './components/TroubledSection'
import ThemeSection from './components/ThemeSection'
import PeriodSection from './components/PeriodSection'
import DateSection from './components/DateSection'
import PracticeSection from './components/PracticeSection'
import BonusSection from './components/BonusSection'
import SponsorSection from './components/SponsorSection'
import FinishSection from './components/FinishSection'
import FooterSection from '@/components/Footer'
import MapSection from '@/components/Map'

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
    {
      distance: 4,
      tag: 'date',
      section: DateSection,
    },
    {
      distance: 5,
      tag: 'practice',
      section: PracticeSection,
    },
    {
      distance: 6,
      tag: 'bonus',
      section: BonusSection,
    },
    {
      distance: 7,
      tag: 'sponsor',
      section: SponsorSection,
    },
    {
      distance: 9,
      tag: 'finish',
      section: FinishSection,
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
    <DistanceContext.Provider value={{ distance, setDistance }}>
      <div className="flex h-[2900vh] flex-col items-center overflow-hidden bg-background">
        <HeaderSection />
        <FirstSection resetFirst={resetFirst} />
        {main.map((item) => through.includes(item.tag) && <item.section key={item.tag} />)}
        <FooterSection />
        <MapSection />
      </div>
    </DistanceContext.Provider>
  )
}

export default Home
