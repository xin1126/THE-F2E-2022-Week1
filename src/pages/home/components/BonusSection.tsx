import { useDistanceContext } from '@/context/distanceContext'
import ScrollTarget, { ScrollTargetHandle } from '@/components/ScrollTarget'

import talk from '@/assets/images/bg/bg_talking.png'
import talkMoble from '@/assets/images/bg/bg_talking_c.png'
import awardTrophy from '@/assets/images/main/award_trophy.png'
import awardLight from '@/assets/images/main/award_light.png'

const PracticeSection: React.FC = () => {
  const bonusTalkRef = useRef<HTMLDivElement>(null)
  const bonusContentRef = useRef<HTMLDivElement>(null)
  const awardLightRef = useRef<HTMLImageElement>(null)

  const gsap = useRef<ScrollTargetHandle>(null)

  const { distance, setDistance } = useDistanceContext()

  const handleExit = () => {
    setTimeout(() => {
      const bonusExit = {
        id: 'bonusExit',
        dom: null,
        fc: () => setDistance(distance + 1),
        last: true,
      }
      const useGsap = gsap.current?.handleGsap(bonusExit)
      useGsap
        ?.to(awardLightRef.current, { rotate: '-300deg' }, '<')
        .to(bonusContentRef.current, { x: 150 }, '<')
        .to(bonusContentRef.current, { opacity: 0.5 }, '<')
        .to(bonusTalkRef.current, { opacity: 0.5 }, '<')
        .to(awardLightRef.current, { rotate: '-300deg' }, '<')
        .to(bonusContentRef.current, { x: 300 }, '<')
        .to(bonusTalkRef.current, { opacity: 0 }, '<')
        .to(bonusContentRef.current, { opacity: 0 })
    }, 500)
  }

  const hondleBonusContent = () => {
    const bonusContent = {
      id: 'bonusContent',
      dom: null,
      fc: handleExit,
    }
    const useGsap = gsap.current?.handleGsap(bonusContent)
    useGsap
      ?.to(bonusContentRef.current, { x: -300 })
      .to(awardLightRef.current, { rotate: '-150deg' })
      .to(bonusContentRef.current, { x: 0, opacity: 1 }, '<')
      .to(awardLightRef.current, { rotate: '-150deg' })
  }

  const handleTalk = () => {
    const bonusTalk = {
      id: 'bonusTalk',
      dom: null,
      fc: hondleBonusContent,
    }
    const useGsap = gsap.current?.handleGsap(bonusTalk)
    useGsap?.to(bonusTalkRef.current, { opacity: 1 })
  }

  useLayoutEffect(() => {
    handleTalk()
  }, [])

  return (
    <>
      <ScrollTarget ref={gsap} />
      <div className="fixed top-10 z-10 w-full">
        <div className="relative mx-auto mb-12 max-w-[700px] opacity-0" ref={bonusTalkRef}>
          <img className="hidden h-[160px] w-full sm:block" src={talk} alt="talk" />
          <img className="h-[80px] object-fill sm:hidden" src={talkMoble} alt="talk" />
          <p className="absolute top-4 mb-6 w-full text-center text-2xl text-primary sm:top-10 sm:text-5xl">
            還有比賽等著你！
          </p>
        </div>
        <div className="flex justify-center opacity-0" ref={bonusContentRef}>
          <div className="relative mr-14 w-[375px]">
            <img src={awardTrophy} alt="awardTrophy" />
            <img className="absolute top-0 -z-10" src={awardLight} alt="awardLight" ref={awardLightRef} />
          </div>
          <div>
            <h3 className="mb-3 text-3xl text-secondary">評審機制</h3>
            <ul className="mb-8 text-xl text-primary">
              <li>初選： 將由六角學院前端、UI 評審進行第一波篩選。</li>
              <li>決選： 由六角學院與贊助廠商討論，進行最後篩選，並於 12/30(五) 由評審進行直播公布名單！</li>
            </ul>
            <h3 className="mb-3 text-3xl text-secondary">獎項 </h3>
            <ul className="text-xl text-primary">
              <li>1. 初選佳作 共六十位 數位獎狀</li>
              <li>
                2. 個人企業獎 共六位 NTD <span className="text-4xl text-secondary">3,000</span> /位
              </li>
              <li>
                3. 團體企業獎 共三組 NTD <span className="text-4xl text-secondary">10,000</span> /組
              </li>
              <li>4. 以上皆提供完賽數位獎狀</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default PracticeSection
