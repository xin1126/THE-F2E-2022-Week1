import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { useDistanceContext } from '@/context/distanceContext'

gsap.registerPlugin(ScrollTrigger)

interface HandleGsap {
  id: string
  dom: Element | null
  fc?: () => void | null
  last?: boolean
}

export interface ScrollTargetHandle {
  handleGsap: (val: HandleGsap) => gsap.core.Timeline | void
}

const ScrollTarget: React.ForwardRefRenderFunction<ScrollTargetHandle> = (props, forwardedRef) => {
  const trigger = useRef<HTMLDivElement | null>(null)
  const [top, setTop] = useState('')

  const { isMobile, setDistance } = useDistanceContext()

  useImperativeHandle(forwardedRef, () => ({
    handleGsap(val: HandleGsap) {
      const { id, dom, fc, last } = val
      if (ScrollTrigger.getById(id)) return
      const useGsap = gsap.timeline({
        scrollTrigger: {
          trigger: dom || trigger.current,
          start: top,
          end: dom ? 'top 20%' : 0,
          scrub: true,
        },
      })

      ScrollTrigger.create({
        id,
        trigger: trigger.current,
        onLeave() {
          if (fc && !isMobile) fc()
        },
        onEnterBack() {
          if (last) setDistance((data: number) => data - 1)
        },
      })

      return useGsap
    },
  }))

  const handleTop = () => {
    if (window.innerWidth < 640) {
      setTop('top 40%')
    } else {
      setTop('top 70%')
    }
  }

  useEffect(() => {
    handleTop()
  }, [])

  return <div ref={trigger} className="fixed bottom-[55%] sm:bottom-[30%]"></div>
}

export default forwardRef(ScrollTarget)
