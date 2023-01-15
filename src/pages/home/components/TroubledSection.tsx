import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import talk from '@/assets/images/bg/bg_talking.png'
import question1 from '@/assets/images/main/question_1.png'
import question2 from '@/assets/images/main/question_2.png'
import question3 from '@/assets/images/main/question_3.png'

gsap.registerPlugin(ScrollTrigger)

const TroubledSection: React.FC = () => {
  const talkRef = useRef<HTMLDivElement>(null)
  const question1Ref = useRef<HTMLDivElement>(null)
  const question2Ref = useRef<HTMLDivElement>(null)
  const question3Ref = useRef<HTMLDivElement>(null)

  const handleQuestion = () => {
    const gsapRef = gsap.timeline({
      scrollTrigger: {
        id: 'questionRef',
        trigger: question1Ref.current,
        end: '+=3000',
        scrub: true,
      },
    })

    gsapRef
      .to(question1Ref.current, {
        x: -200,
      })
      .to(question1Ref.current, {
        opacity: 1,
        x: 0,
      })
      .to(question2Ref.current, {
        opacity: 1,
      })
      .to(question3Ref.current, {
        x: 200,
      })
      .to(question3Ref.current, {
        opacity: 1,
        x: 0,
      })
  }

  useLayoutEffect(() => {
    gsap.fromTo(talkRef.current, { opacity: 0 }, { opacity: 1 })

    ScrollTrigger.create({
      id: 'talkRef',
      trigger: talkRef.current,
      onLeave() {
        handleQuestion()
      },
    })

    return () => {
      if (ScrollTrigger.getById('questionRef')) {
        ScrollTrigger.getById('questionRef')?.kill()
      }

      if (ScrollTrigger.getById('talkRef')) {
        ScrollTrigger.getById('talkRef')?.kill()
      }
    }
  }, [])

  return (
    <div className="fixed top-10">
      <div className="relative mx-auto mb-16 max-w-[600px]" ref={talkRef}>
        <img src={talk} alt="talk" />
        <p className="absolute top-10 w-full text-center text-5xl text-primary">
          你是否也有以下困擾
        </p>
      </div>
      <div className="flex">
        <div
          ref={question1Ref}
          className="flex w-[420px] flex-col items-center opacity-0"
        >
          <p className="mb-4 text-3xl text-secondary">
            羨慕別人的酷酷網頁動畫？
          </p>
          <img className="h-[300px]" src={question1} alt="question1" />
        </div>
        <div
          ref={question2Ref}
          className="flex w-[420px] flex-col items-center opacity-0"
        >
          <p className="mb-4 text-3xl text-secondary">滿足不了同事的許願？</p>
          <img className="h-[300px]" src={question2} alt="question2" />
        </div>
        <div
          ref={question3Ref}
          className="flex w-[420px] flex-col items-center opacity-0"
        >
          <p className="mb-4 text-3xl text-secondary">
            動畫技能樹太雜無從下手？
          </p>
          <img className="h-[300px]" src={question3} alt="question3" />
        </div>
      </div>
    </div>
  )
}

export default TroubledSection
