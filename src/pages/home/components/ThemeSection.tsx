import { useDistanceContext } from '@/context/distanceContext'
import ScrollTarget, { ScrollTargetHandle } from '@/components/ScrollTarget'
import device from 'current-device'

import talk from '@/assets/images/bg/bg_talking.png'
import talkMoble from '@/assets/images/bg/bg_talking_c.png'
import btn from '@/assets/images/btn/btn_join.png'
import joinHand from '@/assets/images/btn/btn_joinHand.gif'
import dog from '@/assets/images/character/character_f2e.png'
import pig from '@/assets/images/character/character_team.png'
import cat from '@/assets/images/character/character_ui.png'

const ThemeSection: React.FC = () => {
  const themeTalkRef = useRef<HTMLDivElement>(null)
  const dogRef = useRef<HTMLDivElement>(null)
  const catRef = useRef<HTMLDivElement>(null)
  const pigRef = useRef<HTMLDivElement>(null)
  const btnGroupRef = useRef<HTMLDivElement>(null)
  const gsap = useRef<ScrollTargetHandle>(null)

  const { distance, setDistance } = useDistanceContext()

  const handleExit = () => {
    const themeExit = {
      id: 'themeExit',
      dom: null,
      fc: () => setDistance(distance + 1),
      last: true,
    }
    const useGsap = gsap.current?.handleGsap(themeExit)
    if (device.mobile()) return
    useGsap
      ?.to([btnGroupRef.current, themeTalkRef.current], {
        opacity: 0.5,
      })
      .to([btnGroupRef.current, themeTalkRef.current], {
        opacity: 0,
      })
  }

  const handleBtn = () => {
    const themeBtn = {
      id: 'themeBtn',
      dom: null,
      fc: handleExit,
    }
    const useGsap = gsap.current?.handleGsap(themeBtn)

    if (device.mobile()) {
      useGsap
        ?.to(dogRef.current, {
          x: 200,
        })
        .to(dogRef.current, {
          opacity: 1,
          x: 0,
        })
        .to(catRef.current, {
          opacity: 0,
          x: -200,
        })
        .to(catRef.current, {
          opacity: 1,
          x: 0,
        })
        .to(pigRef.current, {
          opacity: 0,
          x: 200,
        })
        .to(pigRef.current, {
          opacity: 1,
          x: 0,
        })
      return
    }

    useGsap
      ?.to(btnGroupRef.current, {
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

  const handleTalk = () => {
    const fc = device.mobile() ? handleBtn : handleBtn
    const themeTalk = {
      id: 'themeTalk',
      dom: device.mobile() ? themeTalkRef.current : null,
      fc,
    }
    const useGsap = gsap.current?.handleGsap(themeTalk)
    useGsap?.to(themeTalkRef.current, { opacity: 1 })
  }

  useLayoutEffect(() => {
    handleTalk()
  }, [])

  return (
    <>
      <ScrollTarget ref={gsap} />
      <div className="top-10 z-20 mt-12 w-full sm:fixed sm:mt-0 sm:w-auto">
        <div className="relative mx-auto mb-12 max-w-[700px] opacity-0" ref={themeTalkRef}>
          <img className="hidden h-[160px] w-full sm:block" src={talk} alt="talk" />
          <img className="h-[80px] object-fill sm:hidden" src={talkMoble} alt="talk" />
          <p className="absolute top-4 mb-6 w-full text-center text-2xl text-primary sm:top-10 sm:text-5xl">
            本屆主題：互動式網頁設計
          </p>
          <p className="text-center text-2xl text-info">以下兩個角色進行攜手合作</p>
        </div>
        <div className="max-w-[900px] justify-between sm:flex sm:opacity-0" ref={btnGroupRef}>
          <div
            className="group mb-5 flex items-center justify-center opacity-0 sm:mb-0 sm:flex-col sm:opacity-100"
            ref={dogRef}
          >
            <img className="mr-4 w-[100px] sm:hidden" src={dog} alt="dog" />
            <div className="flex flex-col items-center">
              <img className="w-[60px] group-hover:opacity-100 sm:opacity-0" src={joinHand} alt="joinHand" />
              <img className="w-[100px] cursor-pointer" src={btn} alt="btn" />
              <p className="text-3xl text-primary">前端工程師</p>
            </div>
          </div>
          <div
            className="group mb-5 flex items-center justify-center opacity-0 sm:mb-0 sm:flex-col sm:opacity-100"
            ref={catRef}
          >
            <div className="flex flex-col items-center">
              <img className="w-[60px] group-hover:opacity-100 sm:opacity-0" src={joinHand} alt="joinHand" />
              <img className="w-[100px] cursor-pointer" src={btn} alt="btn" />
              <p className="text-3xl text-primary">ＵＩ設計師</p>
            </div>
            <img className="ml-4 w-[100px] sm:hidden" src={cat} alt="cat" />
          </div>
          <div
            className="group mb-5 flex items-center justify-center opacity-0 sm:mb-0 sm:flex-col sm:opacity-100"
            ref={pigRef}
          >
            <img className="mr-4 w-[100px] sm:hidden" src={pig} alt="pig" />
            <div className="flex flex-col items-center">
              <img className="w-[60px] group-hover:opacity-100 sm:opacity-0" src={joinHand} alt="joinHand" />
              <img className="w-[100px] cursor-pointer" src={btn} alt="btn" />
              <p className="text-3xl text-primary">團體組(UI+前端)</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ThemeSection
