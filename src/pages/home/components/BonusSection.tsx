import { useDistanceContext } from '@/context/distanceContext'
import ScrollTarget, { ScrollTargetHandle } from '@/components/ScrollTarget'

import { main, bg } from '@/lib/images'
const { talk, talkMobile } = bg
const { awardTrophy, awardLight } = main

const PracticeSection: React.FC = () => {
  const bonusTalkRef = useRef<HTMLDivElement>(null)
  const bonusContentRef = useRef<HTMLDivElement>(null)
  const awardLightRef = useRef<HTMLImageElement>(null)

  const gsap = useRef<ScrollTargetHandle>(null)

  const { isMobile, distance, setDistance } = useDistanceContext()

  const handleExit = () => {
    setTimeout(() => {
      const bonusExit = {
        id: 'bonusExit',
        dom: null,
        fc: () => setDistance(distance + 1),
        last: true,
      }
      const useGsap = gsap.current?.handleGsap(bonusExit)
      if (isMobile) return
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
      dom: isMobile ? bonusContentRef.current : null,
      fc: handleExit,
    }
    const useGsap = gsap.current?.handleGsap(bonusContent)
    if (isMobile) {
      useGsap
        ?.to(bonusContentRef.current, { y: 80 })
        .to(awardLightRef.current, { rotate: '-90deg', repeat: 2 })
        .to(bonusContentRef.current, { y: 0, opacity: 1 }, '<')
      return
    }

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
    if (isMobile) {
      hondleBonusContent()
    }
  }, [])

  return (
    <>
      <ScrollTarget ref={gsap} />
      <div className="top-10 z-10 mt-[200px] w-full sm:fixed sm:mt-0">
        <div className="relative mx-auto mb-12 max-w-[700px] opacity-0" ref={bonusTalkRef}>
          <img className="hidden h-[160px] w-full sm:block" src={talk} alt="talk" />
          <img className="h-[80px] object-fill sm:hidden" src={talkMobile} alt="talk" />
          <p className="absolute top-4 mb-6 w-full text-center text-2xl text-primary sm:top-10 sm:text-5xl">
            ????????????????????????
          </p>
        </div>
        <div className="justify-center px-5 opacity-0 sm:flex sm:px-0" ref={bonusContentRef}>
          <div className="relative mr-14 mb-12 w-[335px] sm:mb-0 lg:w-[375px]">
            <img src={awardTrophy} alt="awardTrophy" />
            <img className="absolute top-0 -z-10" src={awardLight} alt="awardLight" ref={awardLightRef} />
          </div>
          <div>
            <h3 className="mb-3 text-3xl text-secondary">????????????</h3>
            <ul className="mb-8 text-lg text-primary sm:text-xl">
              <li className="mb-2">????????? ???????????????????????????UI ??????????????????????????????</li>
              <li>????????? ?????????????????????????????????????????????????????????????????? 12/30(???) ????????????????????????????????????</li>
            </ul>
            <h3 className="mb-3 text-3xl text-secondary">?????? </h3>
            <ul className="text-lg text-primary sm:text-xl">
              <li>1. ???????????? ??????????????????????????</li>
              <li>
                2. ??????????????? ???????????NTD <span className="text-xl text-secondary sm:text-4xl">3,000</span> /???
              </li>
              <li className="mb-2">
                3. ??????????????? ???????????NTD <span className="text-xl text-secondary sm:text-4xl">10,000</span> /???
              </li>
              <li>4. ?????????????????????????????????</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default PracticeSection
