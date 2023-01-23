import { useDistanceContext } from '@/context/distanceContext'
import ScrollTarget, { ScrollTargetHandle } from '@/components/ScrollTarget'

import { bg } from '@/lib/images'
const { leftHollowCloud, rightHollowCloud } = bg

const PracticeSection: React.FC = () => {
  const cloudGroupRef = useRef<HTMLDivElement>(null)
  const practiceTextRef = useRef<HTMLParagraphElement>(null)
  const gsap = useRef<ScrollTargetHandle>(null)

  const { distance, setDistance } = useDistanceContext()

  const handleExit = () => {
    const practicExit = {
      id: 'practicExit',
      dom: null,
      fc: () => setDistance(distance + 1),
      last: true,
    }
    const useGsap = gsap.current?.handleGsap(practicExit)
    useGsap?.to([practiceTextRef.current, cloudGroupRef.current], {
      opacity: 0,
    })
  }

  const handlePracticeText = () => {
    const practiceText = {
      id: 'practiceText',
      dom: null,
      fc: handleExit,
    }
    const useGsap = gsap.current?.handleGsap(practiceText)
    useGsap?.to(practiceTextRef.current, {
      opacity: 1,
      fontSize: '48px',
    })
  }

  const handleCloudGroup = () => {
    const cloudSection = {
      id: 'cloudSection',
      dom: null,
      fc: handlePracticeText,
    }
    const useGsap = gsap.current?.handleGsap(cloudSection)
    useGsap
      ?.to(cloudGroupRef.current, {
        opacity: 1,
      })
      .to(cloudGroupRef.current, {
        padding: '0 20%',
        y: -80,
      })
  }

  useLayoutEffect(() => {
    handleCloudGroup()
  }, [])

  return (
    <>
      <ScrollTarget ref={gsap} />
      <div className="fixed top-[25%] z-20 w-full">
        <p
          className="absolute right-1/2 -top-16 z-10 translate-x-[50%] whitespace-nowrap text-[100px] text-secondary opacity-0"
          ref={practiceTextRef}
        >
          區區修煉已經無法滿足了嗎？
        </p>
        <div className="flex justify-between opacity-0" ref={cloudGroupRef}>
          <img className="relative -left-20 w-[360px]" src={leftHollowCloud} alt="leftHollowCloud" />
          <img className="relative -right-20 w-[450px]" src={rightHollowCloud} alt="rightHollowCloud" />
        </div>
      </div>
    </>
  )
}

export default PracticeSection
