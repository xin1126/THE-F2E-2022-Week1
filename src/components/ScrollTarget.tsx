import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { FatherContext, Context } from '@/pages/home/index'

gsap.registerPlugin(ScrollTrigger)

export interface ScrollTargetHandle {
  handleGsap: (id: string, fc?: () => void, last?: boolean) => gsap.core.Timeline | void
}

const ScrollTarget: React.ForwardRefRenderFunction<ScrollTargetHandle> = (props, forwardedRef) => {
  const trigger = useRef<HTMLDivElement | null>(null)
  const [top, setTop] = useState('')

  const { setDistance } = useContext<Context>(FatherContext)

  useImperativeHandle(forwardedRef, () => ({
    handleGsap(id: string, fc?: () => void, last?: boolean) {
      if (ScrollTrigger.getById(id)) return

      const useGsap = gsap.timeline({
        scrollTrigger: {
          trigger: trigger.current,
          start: top,
          scrub: true,
        },
      })

      ScrollTrigger.create({
        id,
        trigger: trigger.current,
        onLeave() {
          if (fc) fc()
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
      setTop('top 45%')
    } else {
      setTop('top 70%')
    }
  }

  useEffect(() => {
    handleTop()
    window.onresize = () => {
      handleTop()
    }
  }, [])

  return <div ref={trigger} className="fixed bottom-[55%] sm:bottom-[30%]"></div>
}

export default forwardRef(ScrollTarget)
