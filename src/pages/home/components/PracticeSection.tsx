import { useDistanceContext } from '@/context/distanceContext'
import ScrollTarget, { ScrollTargetHandle } from '@/components/ScrollTarget'

import { bg } from '@/lib/images'
const { leftHollowCloud, rightHollowCloud } = bg

const PracticeSection: React.FC = () => {
  const cloudGroupRef = useRef<HTMLDivElement>(null)
  const practiceTextRef = useRef<HTMLParagraphElement>(null)
  const gsap = useRef<ScrollTargetHandle>(null)

  const { isMobile, distance, setDistance } = useDistanceContext()

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
      dom: isMobile ? practiceTextRef.current : null,
      fc: handleExit,
    }
    const useGsap = gsap.current?.handleGsap(practiceText)
    useGsap?.to(practiceTextRef.current, {
      opacity: 1,
      fontSize: isMobile ? '28' : '48px',
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
    if (isMobile) {
      handlePracticeText()
    } else {
      handleCloudGroup()
    }
  }, [])

  return (
    <>
      <ScrollTarget ref={gsap} />
      <div className="top-[25%] z-20 w-full sm:fixed">
        <p
          className="right-1/2 -top-16 z-10 whitespace-nowrap text-center text-6xl text-secondary opacity-0 sm:absolute lg:translate-x-[50%] lg:text-[100px]"
          ref={practiceTextRef}
        >
          區區修煉 <br className="lg:hidden" />
          已經無法滿足了嗎？
        </p>
        <div className="hidden justify-between opacity-0 lg:flex" ref={cloudGroupRef}>
          <img className="relative -left-20 w-[360px]" src={leftHollowCloud} alt="leftHollowCloud" />
          <img className="relative -right-20 w-[450px]" src={rightHollowCloud} alt="rightHollowCloud" />
        </div>
      </div>
    </>
  )
}

export default PracticeSection
