import device from 'current-device'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'

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
import Loading from '@/components/Loading'

const Home: React.FC = () => {
  const [distance, setDistance] = useState(0)
  const [through, setThrough] = useState<string[]>([])
  const [resetFirst, setResetFirst] = useState(0)
  const [loading, setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const setTimerRef = useRef<number | null>(null)
  const bgRef = useRef<HTMLDivElement>(null)

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
    const isMobile = window.innerWidth < 640
    setIsMobile(isMobile)
    if (isMobile) return
    window.addEventListener('resize', () => {
      setIsMobile(window.innerWidth < 640)
      clearTimeout(setTimerRef.current || 0)
      resizeReset()
    })
  }, [])

  useEffect(() => {
    const useGsap = gsap.timeline()

    if (!loading) {
      useGsap
        .to(bgRef.current, {
          clipPath: 'circle(100%)',
          duration: 1.5,
        })
        .to(bgRef.current, {
          height: 'auto',
        })
    }
  }, [loading])

  return (
    <DistanceContext.Provider value={{ isMobile, distance, setDistance }}>
      <div className="bg-background">
        <div style={{ clipPath: 'circle(0%)' }} className="h-screen bg-background" ref={bgRef}>
          <div className="flex flex-col items-center overflow-hidden bg-background sm:h-[2900vh]">
            <HeaderSection />
            <FirstSection resetFirst={resetFirst} />
            {main.map((item) => (through.includes(item.tag) || isMobile) && <item.section key={item.distance} />)}
            <FooterSection />
            <MapSection />
          </div>
        </div>
      </div>
      {loading && <Loading setLoading={setLoading} />}
    </DistanceContext.Provider>
  )
}

export default Home
