import { useDistanceContext } from '@/context/distanceContext'
import ScrollTarget, { ScrollTargetHandle } from '@/components/ScrollTarget'

import { btn, logoGroup } from '@/lib/images'
const { joinHand, btnJoin } = btn
const { logo } = logoGroup

const FinishSection: React.FC = () => {
  const logoRef = useRef<HTMLImageElement>(null)
  const joinRef = useRef<HTMLDivElement>(null)

  const gsap = useRef<ScrollTargetHandle>(null)

  const { isMobile } = useDistanceContext()

  useLayoutEffect(() => {
    const finish = {
      id: 'finish',
      dom: isMobile ? logoRef.current : null,
    }
    const tempDom = [logoRef.current, joinRef.current]
    const useGsap = gsap.current?.handleGsap(finish)
    useGsap?.to(tempDom, { y: 200 }).to(tempDom, { y: 0, opacity: 1 })
  }, [])

  return (
    <>
      <ScrollTarget ref={gsap} />
      <div className="top-[10%] z-30 my-[250px] flex flex-col items-center sm:fixed sm:my-0">
        <img
          className="mb-4 w-[200px] opacity-0 sm:w-[350px] min-[1800px]:w-[520px]"
          src={logo}
          alt="logo"
          ref={logoRef}
        />
        <div className="flex flex-col items-center opacity-0" ref={joinRef}>
          <a href="https://2022.thef2e.com/" target="_blank" className="w-[60px] sm:w-[120px]" rel="noreferrer">
            <img src={joinHand} alt="joinHand" />
            <img className="mb-4 " src={btnJoin} alt="btnJoin" />
          </a>
          <p className="whitespace-normal text-3xl text-secondary sm:text-5xl">立即報名</p>
        </div>
      </div>
    </>
  )
}

export default FinishSection
