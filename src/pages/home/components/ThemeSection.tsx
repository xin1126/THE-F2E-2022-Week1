import { FatherContext, Context } from '../index'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import talk from '@/assets/images/bg/bg_talking.png'
import btn from '@/assets/images/btn/btn_join.png'
import joinHand from '@/assets/images/btn/btn_joinHand.gif'

gsap.registerPlugin(ScrollTrigger)

const ThemeSection: React.FC = () => {
  const themeTalkRef = useRef<HTMLDivElement>(null)
  const btnGroupRef = useRef<HTMLDivElement>(null)

  const { footerDom, distance, setDistance } =
    useContext<Context>(FatherContext)

  const handleQuestion = () => {
    const gsapRef = gsap.timeline({
      scrollTrigger: {
        id: 'btnGroupRef',
        trigger: btnGroupRef.current,
        scrub: true,
      },
      onComplete() {
        setDistance(distance + 1)
      },
    })

    gsapRef
      .to(btnGroupRef.current, {
        y: 200,
      })
      .to(btnGroupRef.current, {
        opacity: 0.5,
        y: 150,
      })
      .to(btnGroupRef.current, {
        opacity: 1,
        y: 0,
      })
  }

  useLayoutEffect(() => {
    gsap.fromTo(themeTalkRef.current, { opacity: 0 }, { opacity: 1 })
    gsap.to(footerDom, { width: '1300px' })

    ScrollTrigger.create({
      id: 'themeTalkRef',
      trigger: themeTalkRef.current,
      onLeave() {
        handleQuestion()
      },
      onEnterBack() {
        gsap.to(footerDom, { width: '800px' })
      },
    })

    return () => {
      if (ScrollTrigger.getById('btnGroupRef')) {
        ScrollTrigger.getById('btnGroupRef')?.kill()
      }

      if (ScrollTrigger.getById('themeTalkRef')) {
        ScrollTrigger.getById('themeTalkRef')?.kill()
      }
    }
  }, [])

  return (
    <div className="fixed top-10 z-10">
      <div className="relative mx-auto mb-12 max-w-[700px]" ref={themeTalkRef}>
        <img src={talk} alt="talk" className="h-[160px] w-full" />
        <p className="absolute top-10 mb-6 w-full text-center text-5xl text-primary">
          本屆主題：互動式網頁設計
        </p>
        <p className="text-center text-2xl text-info">
          以下兩個角色進行攜手合作
        </p>
      </div>
      <div
        className="flex w-[900px] justify-between opacity-0"
        ref={btnGroupRef}
      >
        <div className="group flex flex-col items-center">
          <img
            className="w-[60px] opacity-0 group-hover:opacity-100"
            src={joinHand}
            alt="joinHand"
          />
          <img className="w-[100px] cursor-pointer" src={btn} alt="btn" />
          <p className="text-3xl text-primary">前端工程師</p>
        </div>
        <div className="group flex flex-col items-center">
          <img
            className="w-[60px] opacity-0 group-hover:opacity-100"
            src={joinHand}
            alt="joinHand"
          />
          <img className="w-[100px] cursor-pointer" src={btn} alt="btn" />
          <p className="text-3xl text-primary">ＵＩ設計師</p>
        </div>
        <div className="group flex flex-col items-center">
          <img
            className="w-[60px] opacity-0 group-hover:opacity-100"
            src={joinHand}
            alt="joinHand"
          />
          <img className="w-[100px] cursor-pointer" src={btn} alt="btn" />
          <p className="text-3xl text-primary">團體組(UI+前端)</p>
        </div>
      </div>
    </div>
  )
}

export default ThemeSection
