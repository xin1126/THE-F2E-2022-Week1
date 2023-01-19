import { useDistanceContext } from '@/context/distanceContext'
import ScrollTarget, { ScrollTargetHandle } from '@/components/ScrollTarget'

import { ScrollTrigger } from 'gsap/ScrollTrigger'

import start from '@/assets/images/main/start.png'
import logo from '@/assets/images/logo/logo.png'
import logoText from '@/assets/images/logo/logo_text.png'
import user from '@/assets/images/ic/ic_users.svg'
import leftCloud from '@/assets/images/bg/bg_decorate_01.png'
import rightCloud from '@/assets/images/bg/bg_decorate_05.png'

interface Props {
  resetFirst: number
}

const FirstSection: React.FC<Props> = ({ resetFirst }) => {
  const cloudGroupRef = useRef<HTMLDivElement>(null)
  const joinInfoGroupRef = useRef<HTMLUListElement>(null)
  const headerGroupRef = useRef<HTMLDivElement>(null)
  const gsap = useRef<ScrollTargetHandle>(null)

  const { distance, setDistance } = useDistanceContext()

  const handleHeader = () => {
    const header = {
      id: 'header',
      dom: null,
      fc: () => setDistance(distance + 1),
      last: true,
    }
    const useGsap = gsap.current?.handleGsap(header)
    useGsap?.to(headerGroupRef.current, { opacity: 0 })
  }

  const handleJoinInfo = () => {
    const joinInfo = {
      id: 'joinInfo',
      dom: null,
      fc: handleHeader,
    }
    const useGsap = gsap.current?.handleGsap(joinInfo)
    useGsap?.to(joinInfoGroupRef.current, { opacity: 0 })
  }

  const handleCloud = () => {
    const cloud = {
      id: 'cloud',
      dom: null,
      fc: handleJoinInfo,
    }
    const useGsap = gsap.current?.handleGsap(cloud)
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

  const handleMoble = () => {
    const firstMobile = {
      id: 'firstMobile',
      dom: null,
      fc: () => setDistance(distance + 1),
    }
    const useGsap = gsap.current?.handleGsap(firstMobile)
    useGsap?.to([headerGroupRef.current, cloudGroupRef.current], { opacity: 0 })
  }

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0)
      ScrollTrigger.matchMedia({
        '(min-width: 640px)': () => {
          handleCloud()
        },
        '(max-width: 640px)': () => {
          handleMoble()
        },
      })
    }, 500)
  }, [resetFirst])

  return (
    <>
      <ScrollTarget ref={gsap} />
      <div
        ref={headerGroupRef}
        className="z-10 mt-12 flex w-full max-w-[1300px] flex-col items-center sm:fixed sm:mt-0
      "
      >
        <img className="mb-3 mt-12 w-[250px] sm:hidden" src={logo} alt="logo" />
        <img className="mt-10 hidden max-w-[680px] sm:block" src={logoText} alt="logoText" />
        <div className="-top-4 mb-5 w-fit rounded-3xl bg-secondary px-4 py-2 text-xl text-white sm:relative sm:mb-0 sm:px-10 sm:text-3xl">
          互動式網頁設計
        </div>
        <ul ref={joinInfoGroupRef} className="w-full justify-around text-2xl sm:flex">
          <li className="mb-4 flex flex-col items-center sm:mb-0">
            <p className="mb-2 text-primary">前端工程師</p>
            <div className="relative flex w-fit rounded-3xl bg-primary px-7 py-1 text-white">
              <img className="mr-3 w-5" src={user} alt="user" />
              920
            </div>
          </li>
          <li className="mb-4 flex flex-col items-center sm:mb-0">
            <p className="mb-2 text-primary">UI設計師</p>
            <div className="relative flex w-fit rounded-3xl bg-primary px-7 py-1 text-white">
              <img className="mr-3 w-5" src={user} alt="user" />
              110
            </div>
          </li>
          <li className="mb-4 flex flex-col items-center sm:mb-0">
            <p className="mb-2 text-primary">團體組</p>
            <div className="relative flex w-fit rounded-3xl bg-primary px-7 py-1 text-white">
              <img className="mr-3 w-5" src={user} alt="user" />
              41
            </div>
          </li>
        </ul>
        <img className="absolute top-0 -z-10 hidden max-w-[1430px] xl:block" src={start} alt="start" />
      </div>
      <div ref={cloudGroupRef} className="fixed top-[60%] flex w-full justify-between sm:top-[40%] xl:px-[5%]">
        <img
          className="relative -left-[20%] w-[200px] sm:left-0 sm:w-[300px] xl:w-[430px]"
          src={leftCloud}
          alt="leftCloud"
        />
        <img
          className="relative -right-[20%] w-[235px] sm:right-0 sm:w-[335px] xl:w-[485px]"
          src={rightCloud}
          alt="rightCloud"
        />
      </div>
    </>
  )
}
export default FirstSection
