import ScrollTarget, { ScrollTargetHandle } from '@/components/ScrollTarget'

import { btn, logoGroup } from '@/lib/images'
const { joinHand, btnJoin } = btn
const { logo } = logoGroup

const FinishSection: React.FC = () => {
  const logoRef = useRef<HTMLImageElement>(null)
  const joinRef = useRef<HTMLDivElement>(null)

  const gsap = useRef<ScrollTargetHandle>(null)

  useLayoutEffect(() => {
    const finish = {
      id: 'finish',
      dom: null,
    }
    const tempDom = [logoRef.current, joinRef.current]
    const useGsap = gsap.current?.handleGsap(finish)
    useGsap?.to(tempDom, { y: 200 }).to(tempDom, { y: 0, opacity: 1 })
  }, [])

  return (
    <>
      <ScrollTarget ref={gsap} />
      <div className="fixed top-[10%] z-30 flex flex-col items-center">
        <img className="mb-4 w-[520px] opacity-0" src={logo} alt="logo" ref={logoRef} />
        <div className="flex flex-col items-center opacity-0" ref={joinRef}>
          <a href="https://2022.thef2e.com/" target="_blank" className="w-[120px]" rel="noreferrer">
            <img src={joinHand} alt="joinHand" />
            <img className="mb-4 " src={btnJoin} alt="btnJoin" />
          </a>
          <p className="whitespace-normal text-5xl text-secondary">立即報名</p>
        </div>
      </div>
    </>
  )
}

export default FinishSection
