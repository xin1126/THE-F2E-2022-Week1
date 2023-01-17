import { FatherContext, Context } from '../index'
import ScrollTarget, { ScrollTargetHandle } from '@/components/ScrollTarget'

import talk from '@/assets/images/bg/bg_talking.png'
import talkMoble from '@/assets/images/bg/bg_talking_c.png'
import question1 from '@/assets/images/main/question_1.png'
import question2 from '@/assets/images/main/question_2.png'
import question3 from '@/assets/images/main/question_3.png'

const TroubledSection: React.FC = () => {
  const troubledTalkRef = useRef<HTMLDivElement>(null)
  const question1Ref = useRef<HTMLDivElement>(null)
  const question2Ref = useRef<HTMLDivElement>(null)
  const question3Ref = useRef<HTMLDivElement>(null)
  const gsap = useRef<ScrollTargetHandle>(null)

  const { distance, setDistance } = useContext<Context>(FatherContext)

  const handleExit = () => {
    const useGsap = gsap.current?.handleGsap('troubledExit', () => setDistance(distance + 1), true)
    useGsap
      ?.to([question1Ref.current, question2Ref.current, question3Ref.current, troubledTalkRef.current], {
        opacity: 0.5,
      })
      .to([question1Ref.current, question2Ref.current, question3Ref.current, troubledTalkRef.current], {
        opacity: 0,
      })
  }

  const handleQuestion3 = () => {
    const useGsap = gsap.current?.handleGsap('question3', handleExit)
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
    const useGsap = gsap.current?.handleGsap('question2', handleQuestion3)
    useGsap?.to(question2Ref.current, { opacity: 1 })
  }

  const handleQuestion1 = () => {
    const useGsap = gsap.current?.handleGsap('question1', handleQuestion2)
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
    const useGsap = gsap.current?.handleGsap('troubledTalk', handleQuestion1)
    useGsap?.to(troubledTalkRef.current, { opacity: 1 })
  }

  useLayoutEffect(() => {
    handleTalk()
  }, [])

  return (
    <>
      <ScrollTarget ref={gsap} />
      <div className="top-10 z-20 mt-[400px] w-full sm:fixed sm:mt-0 sm:w-auto">
        <div className="relative mx-auto mb-16 w-full opacity-0 sm:max-w-[600px]" ref={troubledTalkRef}>
          <img className="hidden sm:block" src={talk} alt="talk" />
          <img className="h-[80px] object-fill sm:hidden" src={talkMoble} alt="talk" />
          <p className="absolute top-4 w-full text-center text-2xl text-primary sm:top-10 sm:text-5xl">
            你是否也有以下困擾
          </p>
        </div>
        <div className="justify-between sm:flex">
          <div ref={question1Ref} className="flex max-w-[400px] flex-col items-center opacity-0 sm:mr-5">
            <p className="mb-4 text-3xl text-secondary">羨慕別人的酷酷網頁動畫？</p>
            <img className="h-[300px]" src={question1} alt="question1" />
          </div>
          <div ref={question2Ref} className="flex max-w-[400px] flex-col items-center opacity-0 sm:mr-5">
            <p className="mb-4 text-3xl text-secondary">滿足不了同事的許願？</p>
            <img className="h-[300px]" src={question2} alt="question2" />
          </div>
          <div ref={question3Ref} className="flex max-w-[400px] flex-col items-center opacity-0">
            <p className="mb-4 text-3xl text-secondary">動畫技能樹太雜無從下手？</p>
            <img className="h-[300px]" src={question3} alt="question3" />
          </div>
        </div>
      </div>
    </>
  )
}

export default TroubledSection
