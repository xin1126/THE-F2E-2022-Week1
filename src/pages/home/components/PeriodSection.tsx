import { FatherContext, Context } from '../index'
import ScrollTarget, { ScrollTargetHandle } from '@/components/ScrollTarget'
import device from 'current-device'

import talk from '@/assets/images/bg/bg_talking.png'
import talkMoble from '@/assets/images/bg/bg_talking_c.png'
import week1 from '@/assets/images/main/week_1.png'
import week2 from '@/assets/images/main/week_2.png'
import week3 from '@/assets/images/main/week_3.png'

const PeriodSection: React.FC = () => {
  const periodTalkRef = useRef<HTMLDivElement>(null)
  const week1Ref = useRef<HTMLLIElement>(null)
  const week2Ref = useRef<HTMLLIElement>(null)
  const week3Ref = useRef<HTMLLIElement>(null)
  const gsap = useRef<ScrollTargetHandle>(null)

  const { distance, setDistance } = useContext<Context>(FatherContext)

  const handleExit = () => {
    const periodExit = {
      id: 'periodExit',
      dom: null,
      fc: () => setDistance(distance + 1),
      last: true,
    }
    const useGsap = gsap.current?.handleGsap(periodExit)
    if (device.mobile()) return
    useGsap
      ?.to([periodTalkRef.current], {
        opacity: 0.5,
      })
      .to([periodTalkRef.current], {
        opacity: 0,
      })
  }

  const handleGsap = (useGsap: gsap.core.Timeline | void, dom: Element | null) => {
    useGsap
      ?.to(dom, {
        y: 200,
      })
      .to(dom, {
        opacity: 0.5,
      })
      .to(dom, {
        y: 0,
        opacity: 1,
      })
      .to(dom, {
        y: -200,
        opacity: 0.5,
      })
      .to(dom, {
        opacity: 0,
      })
  }

  const handleWeek3 = () => {
    const week3 = {
      id: 'week3',
      dom: device.mobile() ? week3Ref.current : null,
      fc: handleExit,
    }
    const useGsap = gsap.current?.handleGsap(week3)
    handleGsap(useGsap, week3Ref.current)
  }

  const handleWeek2 = () => {
    const week2 = {
      id: 'week2',
      dom: device.mobile() ? week2Ref.current : null,
      fc: handleWeek3,
    }
    const useGsap = gsap.current?.handleGsap(week2)
    handleGsap(useGsap, week2Ref.current)
  }

  const handleWeek1 = () => {
    const week1 = {
      id: 'week1',
      dom: device.mobile() ? week1Ref.current : null,
      fc: handleWeek2,
    }
    const useGsap = gsap.current?.handleGsap(week1)
    handleGsap(useGsap, week1Ref.current)
  }

  const handleTalk = () => {
    const periodTalk = {
      id: 'periodTalk',
      dom: device.mobile() ? periodTalkRef.current : null,
      fc: handleWeek1,
    }
    const useGsap = gsap.current?.handleGsap(periodTalk)
    useGsap?.to(periodTalkRef.current, { opacity: 1 })
  }

  useLayoutEffect(() => {
    handleTalk()
  }, [])

  return (
    <>
      <ScrollTarget ref={gsap} />
      <div className="top-10 z-20 mt-[400px] w-full max-w-[1200px] sm:fixed sm:mt-0">
        <div className="relative mx-auto mb-12 max-w-[800px] opacity-0" ref={periodTalkRef}>
          <img className="hidden h-[150px] w-full sm:block" src={talk} alt="talk" />
          <img className="h-[80px] object-fill sm:hidden" src={talkMoble} alt="talk" />
          <p className="absolute top-4 mb-6 w-full text-center text-2xl text-primary sm:top-10 sm:text-4xl">
            年度最強合作，三大主題來襲
          </p>
          <p className="text-center text-2xl text-info">
            各路廠商強強聯手 <br /> 共同設計出接地氣的網頁互動挑戰關卡
          </p>
        </div>
        <ul className="w-full">
          <li className="flex opacity-0" ref={week1Ref}>
            <img className="mr-10 w-[280px]" src={week1} alt="week1" />
            <div>
              <h2 className="mb-2 text-4xl text-secondary">WEEK1</h2>
              <p className="mb-2 text-3xl text-primary">The F2E 活動網站設計</p>
              <div className="mb-2 flex">
                <div className="mr-2 w-fit rounded-3xl border border-info px-4 py-1 text-info">Parallax Scrolling</div>
                <div className="w-fit rounded-3xl border border-info px-4 py-1 text-info">#版塊設計</div>
              </div>
              <div className="w-fit rounded-3xl bg-info px-4 py-1 text-white">觀看關卡細節</div>
            </div>
          </li>
          <li className="relative bottom-[180px] flex justify-end opacity-0" ref={week2Ref}>
            <img className="mr-10 w-[280px]" src={week2} alt="week2" />
            <div>
              <h2 className="mb-2 text-4xl text-secondary">WEEK2</h2>
              <p className="mb-2 text-3xl text-primary">今晚，我想來點點簽</p>
              <div className="mb-2 flex">
                <div className="mr-2 w-fit rounded-3xl border border-info px-4 py-1 text-info">Canvas</div>
                <div className="w-fit rounded-3xl border border-info px-4 py-1 text-info">#凱鈿行動科技</div>
              </div>
              <div className="w-fit rounded-3xl bg-info px-4 py-1 text-white">觀看關卡細節</div>
            </div>
          </li>
          <li className="relative bottom-[360px] flex opacity-0" ref={week3Ref}>
            <img className="mr-10 w-[280px]" src={week3} alt="week3" />
            <div>
              <h2 className="mb-2 text-4xl text-secondary">WEEK3</h2>
              <p className="mb-2 text-3xl text-primary">Scrum 新手村</p>
              <div className="mb-2 flex">
                <div className="mr-2 w-fit rounded-3xl border border-info px-4 py-1 text-info">JS draggable</div>
                <div className="w-fit rounded-3xl border border-info px-4 py-1 text-info">#鈦坦科技</div>
              </div>
              <div className="w-fit rounded-3xl bg-info px-4 py-1 text-white">觀看關卡細節</div>
            </div>
          </li>
        </ul>
      </div>
    </>
  )
}

export default PeriodSection
