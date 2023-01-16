import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { FatherContext, Context } from '@/pages/home/index'

gsap.registerPlugin(ScrollTrigger)

export interface ScrollTargetHandle {
  handleGsap: (id: string, fc?: () => void, last?: boolean) => gsap.core.Timeline
}

const ScrollTarget: React.ForwardRefRenderFunction<ScrollTargetHandle> = (props, forwardedRef) => {
  const trigger = useRef<HTMLDivElement | null>(null)

  const { setDistance } = useContext<Context>(FatherContext)

  useImperativeHandle(forwardedRef, () => ({
    handleGsap(id: string, fc?: () => void, last?: boolean) {
      if (ScrollTrigger.getById(id)) return

      const useGsap = gsap.timeline({
        scrollTrigger: {
          trigger: trigger.current,
          start: 'top 90%',
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

  return <div ref={trigger} className="fixed bottom-0 z-50"></div>
}

export default forwardRef(ScrollTarget)
