import { useDistanceContext } from '@/context/distanceContext'
import ScrollTarget, { ScrollTargetHandle } from '@/components/ScrollTarget'

import { main, bg, btn } from '@/lib/images'
const { talk, talkMobile } = bg
const { btnSponsor, btnSponsorHover } = btn
const { blockstudio, kdanmobile, titansoft } = main

const SponsorSection: React.FC = () => {
  const sponsorTalkRef = useRef<HTMLDivElement>(null)
  const blockstudioRef = useRef<HTMLLIElement>(null)
  const titansoftRef = useRef<HTMLLIElement>(null)
  const kdanmobileRef = useRef<HTMLLIElement>(null)

  const gsap = useRef<ScrollTargetHandle>(null)

  const { isMobile, distance, setDistance } = useDistanceContext()

  const handleExit = () => {
    const sponsorExit = {
      id: 'sponsorExit',
      dom: null,
      fc: () => setDistance(distance + 1),
      last: true,
    }
    const useGsap = gsap.current?.handleGsap(sponsorExit)
    if (isMobile) return
    useGsap
      ?.to(sponsorTalkRef.current, { opacity: 0 }, '<')
      .to([blockstudioRef.current, titansoftRef.current, kdanmobileRef.current], { opacity: 0, y: 80 })
  }

  const hondleMobile = (id: string, dom: Element | null) => {
    const data = {
      id,
      dom: dom,
    }
    const useGsap = gsap.current?.handleGsap(data)
    useGsap?.to(dom, { y: 80 }).to(dom, { y: 0, opacity: 1 })
  }

  const hondleSponsor = () => {
    const sponsor = {
      id: 'sponsor',
      dom: isMobile ? blockstudioRef.current : null,
      fc: handleExit,
    }
    const useGsap = gsap.current?.handleGsap(sponsor)
    useGsap
      ?.to(blockstudioRef.current, { y: 80 })
      .to(blockstudioRef.current, { y: 0, opacity: 1 })
      .to(titansoftRef.current, { y: 80 })
      .to(titansoftRef.current, { y: 0, opacity: 1 })
      .to(kdanmobileRef.current, { y: 80 })
      .to(kdanmobileRef.current, { y: 0, opacity: 1 })
  }

  const handleTalk = () => {
    const sponsorTalk = {
      id: 'sponsorTalk',
      dom: null,
      fc: hondleSponsor,
    }
    const useGsap = gsap.current?.handleGsap(sponsorTalk)
    useGsap?.to(sponsorTalkRef.current, { opacity: 1 })
  }

  useLayoutEffect(() => {
    handleTalk()
    if (isMobile) {
      hondleMobile('blockstudio', blockstudioRef.current)
      hondleMobile('titansoft', titansoftRef.current)
      hondleMobile('kdanmobile', kdanmobileRef.current)
    }
  }, [])

  return (
    <>
      <ScrollTarget ref={gsap} />
      <div className="top-10 z-20 mt-12 w-full sm:fixed sm:mt-0">
        <div className="relative mx-auto mb-12 max-w-[450px] opacity-0" ref={sponsorTalkRef}>
          <img className="hidden h-[145px] w-full sm:block" src={talk} alt="talk" />
          <img className="h-[80px] object-fill sm:hidden" src={talkMobile} alt="talk" />
          <p className="absolute top-4 mb-6 w-full text-center text-2xl text-primary sm:top-10 sm:text-5xl">贊助單位</p>
        </div>
        <ul className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-between sm:flex-row">
          <li
            className="group relative mb-11 flex w-[315px] flex-col items-center opacity-0 sm:mb-0"
            ref={blockstudioRef}
          >
            <img className="mb-4 group-hover:hidden" src={btnSponsor} alt="btnSponsor" />
            <img className="mb-4 hidden group-hover:block" src={btnSponsorHover} alt="btnSponsorHover" />
            <img
              className="absolute top-4 left-4 w-[85%] group-hover:top-8 group-hover:left-8 group-hover:w-[82%]"
              src={blockstudio}
              alt="blockstudio"
            />
            <div className="w-fit rounded-3xl border border-info px-6 py-1 text-2xl text-info">#版塊設計</div>
          </li>
          <li
            className="group relative mb-11 flex w-[315px] flex-col items-center opacity-0 sm:mb-0"
            ref={titansoftRef}
          >
            <img className="mb-4 group-hover:hidden" src={btnSponsor} alt="btnSponsor" />
            <img className="mb-4 hidden group-hover:block" src={btnSponsorHover} alt="btnSponsorHover" />
            <img
              className="absolute top-8 left-4 w-[85%] px-4  group-hover:top-12 group-hover:left-8 group-hover:w-[82%]"
              src={titansoft}
              alt="titansoft"
            />
            <div className="w-fit rounded-3xl border border-info px-6 py-1 text-2xl text-info">#鈦坦科技</div>
          </li>
          <li
            className="group relative mb-11 flex w-[315px] flex-col items-center opacity-0 sm:mb-0"
            ref={kdanmobileRef}
          >
            <img className="mb-4 group-hover:hidden" src={btnSponsor} alt="btnSponsor" />
            <img className="mb-4 hidden group-hover:block" src={btnSponsorHover} alt="btnSponsorHover" />
            <img
              className="absolute top-8 left-4 w-[85%] px-4  group-hover:top-12 group-hover:left-8 group-hover:w-[82%]"
              src={kdanmobile}
              alt="kdanmobile"
            />
            <div className="w-fit rounded-3xl border border-info px-6 py-1 text-2xl text-info">#凱鈿科技</div>
          </li>
        </ul>
      </div>
    </>
  )
}

export default SponsorSection
