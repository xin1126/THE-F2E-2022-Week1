import { FatherContext, Context } from '../index'
import ScrollTarget, { ScrollTargetHandle } from '@/components/ScrollTarget'

import start from '@/assets/images/main/start.png'
import logoText from '@/assets/images/logo/logo_text.png'
import user from '@/assets/images/ic/ic_users.svg'
import leftCloud from '@/assets/images/bg/bg_decorate_01.png'
import rightCloud from '@/assets/images/bg/bg_decorate_05.png'

const FirstSection: React.FC = () => {
  const cloudGroupRef = useRef<HTMLDivElement>(null)
  const joinInfoGroupRef = useRef<HTMLUListElement>(null)
  const headerGroupRef = useRef<HTMLDivElement>(null)
  const gsap = useRef<ScrollTargetHandle>(null)

  const { distance, setDistance } = useContext<Context>(FatherContext)

  const handleHeader = () => {
    const useGsap = gsap.current.handleGsap('header', () => setDistance(distance + 1), true)
    useGsap?.to(headerGroupRef.current, { opacity: 0 })
  }

  const handleJoinInfo = () => {
    const useGsap = gsap.current.handleGsap('joinInfo', handleHeader)
    useGsap?.to(joinInfoGroupRef.current, { opacity: 0 })
  }

  const handleCloud = () => {
    const useGsap = gsap.current.handleGsap('cloud', handleJoinInfo)
    useGsap
      ?.to(cloudGroupRef.current, {
        padding: '0 10%',
        scale: '0.8',
      })
      .to(cloudGroupRef.current, {
        padding: '0 15%',
        scale: '0.5',
        opacity: 0.5,
      })
      .to(cloudGroupRef.current, {
        padding: '0 25%',
        opacity: 0,
      })
  }

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0)
      handleCloud()
    }, 500)
  }, [])

  return (
    <>
      <ScrollTarget ref={gsap} />
      <div
        ref={headerGroupRef}
        className="fixed z-10 flex w-full max-w-[1300px] flex-col items-center
      "
      >
        <img className="mt-10 max-w-[680px]" src={logoText} alt="start" />
        <div className="relative -top-4 w-fit rounded-3xl bg-secondary px-10 py-2 text-3xl text-white">
          互動式網頁設計
        </div>
        <ul ref={joinInfoGroupRef} className="flex w-full justify-around text-2xl">
          <li className="flex flex-col items-center">
            <p className="mb-2 text-primary">前端工程師</p>
            <div className="relative flex w-fit rounded-3xl bg-primary px-7 py-1 text-white">
              <img className="mr-3 w-5" src={user} alt="user" />
              920
            </div>
          </li>
          <li className="flex flex-col items-center">
            <p className="mb-2 text-primary">UI設計師</p>
            <div className="relative flex w-fit rounded-3xl bg-primary px-7 py-1 text-white">
              <img className="mr-3 w-5" src={user} alt="user" />
              110
            </div>
          </li>
          <li className="flex flex-col items-center">
            <p className="mb-2 text-primary">團體組</p>
            <div className="relative flex w-fit rounded-3xl bg-primary px-7 py-1 text-white">
              <img className="mr-3 w-5" src={user} alt="user" />
              41
            </div>
          </li>
        </ul>
        <img className="absolute top-0 -z-10 max-w-[1430px]" src={start} alt="start" />
      </div>
      <div ref={cloudGroupRef} className="fixed top-[40%] flex w-full justify-between px-[5%]">
        <img className="w-[430px]" src={leftCloud} alt="leftCloud" />
        <img className="w-[485px]" src={rightCloud} alt="rightCloud" />
      </div>
    </>
  )
}
export default FirstSection
