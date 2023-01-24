import { useDistanceContext } from '@/context/distanceContext'
import ScrollTarget, { ScrollTargetHandle } from '@/components/ScrollTarget'

import { main, bg } from '@/lib/images'
const { talk, talkMobile } = bg
const { question1, question2, question3, question1M, question3M } = main

const TroubledSection: React.FC = () => {
  const troubledTalkRef = useRef<HTMLDivElement>(null)
  const question1Ref = useRef<HTMLDivElement>(null)
  const question2Ref = useRef<HTMLDivElement>(null)
  const question3Ref = useRef<HTMLDivElement>(null)
  const gsap = useRef<ScrollTargetHandle>(null)

  const { isMobile, distance, setDistance } = useDistanceContext()

  const handleExit = () => {
    const troubledExit = {
      id: 'troubledExit',
      dom: null,
      fc: () => setDistance(distance + 1),
      last: true,
    }
    const useGsap = gsap.current?.handleGsap(troubledExit)
    if (isMobile) return
    useGsap
      ?.to([question1Ref.current, question2Ref.current, question3Ref.current, troubledTalkRef.current], {
        opacity: 0.5,
      })
      .to([question1Ref.current, question2Ref.current, question3Ref.current, troubledTalkRef.current], {
        opacity: 0,
      })
  }

  const handleQuestion3 = () => {
    const question3 = {
      id: 'question3',
      dom: isMobile ? question3Ref.current : null,
      fc: handleExit,
    }
    const useGsap = gsap.current?.handleGsap(question3)
    useGsap
      ?.to(question3Ref.current, {
        x: 200,
      })
      .to(question3Ref.current, {
        opacity: 1,
        x: 0,
      })
  }

  const handleQuestion2 = () => {
    const question2 = {
      id: 'question2',
      dom: isMobile ? question2Ref.current : null,
      fc: handleQuestion3,
    }
    const useGsap = gsap.current?.handleGsap(question2)
    useGsap?.to(question2Ref.current, { opacity: 1 })
  }

  const handleQuestion1 = () => {
    const question1 = {
      id: 'question1',
      dom: isMobile ? question1Ref.current : null,
      fc: handleQuestion2,
    }
    const useGsap = gsap.current?.handleGsap(question1)
    useGsap
      ?.to(question1Ref.current, {
        x: -200,
      })
      .to(question1Ref.current, {
        opacity: 1,
        x: 0,
      })
  }

  const handleTalk = () => {
    const troubledTalk = {
      id: 'troubledTalk',
      dom: isMobile ? troubledTalkRef.current : null,
      fc: handleQuestion1,
    }
    const useGsap = gsap.current?.handleGsap(troubledTalk)
    useGsap?.to(troubledTalkRef.current, { opacity: 1 })
  }

  useLayoutEffect(() => {
    handleTalk()
    if (isMobile) {
      handleQuestion1()
      handleQuestion2()
      handleQuestion3()
    }
  }, [])

  return (
    <>
      <ScrollTarget ref={gsap} />
      <div className="top-10 z-20 mt-[400px] w-full sm:fixed sm:mt-0 sm:w-auto">
        <div className="relative mx-auto mb-16 w-full opacity-0 sm:max-w-[600px]" ref={troubledTalkRef}>
          <img className="hidden sm:block" src={talk} alt="talk" />
          <img className="h-[80px] object-fill sm:hidden" src={talkMobile} alt="talk" />
          <p className="absolute top-4 w-full text-center text-2xl text-primary sm:top-10 sm:text-5xl">
            你是否也有以下困擾
          </p>
        </div>
        <div className="flex flex-col items-center px-5 sm:flex-row sm:justify-between sm:px-0">
          <div ref={question1Ref} className="flex max-w-[400px] flex-col items-center opacity-0 sm:mr-5">
            <p className="text-xl text-secondary sm:mb-4 sm:text-3xl">羨慕別人的酷酷網頁動畫？</p>
            <img className="h-[300px]" src={isMobile ? question1M : question1} alt="question1" />
          </div>
          <div ref={question2Ref} className="flex max-w-[400px] flex-col items-center opacity-0 sm:mr-5">
            <p className="text-xl text-secondary sm:mb-4 sm:text-3xl">滿足不了同事的許願？</p>
            <img className="h-[300px]" src={question2} alt="question2" />
          </div>
          <div ref={question3Ref} className="flex max-w-[400px] flex-col items-center opacity-0">
            <p className="text-xl text-secondary sm:mb-4 sm:text-3xl">動畫技能樹太雜無從下手？</p>
            <img className="h-[300px]" src={isMobile ? question3M : question3} alt="question3" />
          </div>
        </div>
      </div>
    </>
  )
}

export default TroubledSection
