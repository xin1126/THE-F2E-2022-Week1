import { useDistanceContext } from '@/context/distanceContext'
import ScrollTarget, { ScrollTargetHandle } from '@/components/ScrollTarget'

import { ScrollTrigger } from 'gsap/ScrollTrigger'

import start from '@/assets/images/main/start.png'
import logo from '@/assets/images/logo/logo.png'
import logoText from '@/assets/images/logo/logo_text.png'
import user from '@/assets/images/ic/ic_users.svg'
import leftCloud from '@/assets/images/bg/bg_decorate_01.png'
import rightCloud from '@/assets/images/bg/bg_decorate_05.png'
import readyFrame from '@/assets/images/main/ready_frame.png'
import ready1 from '@/assets/images/main/ready_1.png'
import ready2 from '@/assets/images/main/ready_2.png'
import ready3 from '@/assets/images/main/ready_3.png'

interface Props {
  resetFirst: number
}

const FirstSection: React.FC<Props> = ({ resetFirst }) => {
  const cloudGroupRef = useRef<HTMLDivElement>(null)
  const joinInfoGroupRef = useRef<HTMLUListElement>(null)
  const headerGroupRef = useRef<HTMLDivElement>(null)
  const readyFrameRef = useRef<HTMLDivElement>(null)
  const ready1Ref = useRef<HTMLImageElement>(null)
  const ready2Ref = useRef<HTMLImageElement>(null)
  const ready3Ref = useRef<HTMLImageElement>(null)
  const readyTextRef = useRef<HTMLParagraphElement>(null)
  const goTextRef = useRef<HTMLParagraphElement>(null)
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
    useGsap
      ?.to([readyFrameRef.current, joinInfoGroupRef.current], {
        opacity: 0.5,
      })
      .to(joinInfoGroupRef.current, { opacity: 0 })
      .to(readyFrameRef.current, {
        opacity: 0,
      })
  }

  const handleReadyFrame = () => {
    const readyFrame = {
      id: 'readyFrame',
      dom: null,
    }
    const useGsap = gsap.current?.handleGsap(readyFrame)
    useGsap
      ?.to([ready2Ref.current, ready1Ref.current, readyTextRef.current], {
        opacity: 0.5,
      })
      .to([ready2Ref.current, ready1Ref.current, readyTextRef.current], {
        opacity: 0,
      })
      .to(ready3Ref.current, {
        opacity: 1,
      })
      .to(ready3Ref.current, {
        opacity: 0,
      })
      .to(ready2Ref.current, {
        opacity: 1,
      })
      .to(ready2Ref.current, {
        opacity: 1,
      })
      .to(ready2Ref.current, {
        opacity: 0,
      })
      .to([ready1Ref.current, goTextRef.current], {
        opacity: 1,
      })
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
          handleReadyFrame()
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
        className="z-10 mt-12 flex w-full max-w-[1000px] flex-col items-center sm:fixed sm:mt-0 min-[1800px]:max-w-[1300px]
      "
      >
        <img className="mb-3 mt-12 w-[250px] sm:hidden" src={logo} alt="logo" />
        <img className="mt-10 hidden max-w-[500px] sm:block min-[1800px]:max-w-[680px]" src={logoText} alt="logoText" />
        <div className="mb-5 w-fit rounded-3xl bg-secondary px-4 py-2 text-xl text-white sm:mb-0 sm:px-10 sm:text-3xl">
          互動式網頁設計
        </div>
        <ul ref={joinInfoGroupRef} className="mt-5 w-full justify-around px-10 text-2xl sm:flex">
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
      <div ref={readyFrameRef} className="fixed top-[40%] right-0 z-10 hidden xl:block">
        <p className="mr-4 text-center text-3xl text-secondary" ref={readyTextRef}>
          READY?
        </p>
        <p className="absolute left-[85px] top-0 mr-4 text-center text-3xl text-secondary opacity-0" ref={goTextRef}>
          GO!!
        </p>
        <img className="w-[275px]" src={readyFrame} alt="readyFrame" />
        <div className="absolute top-[68px] left-[36px] -z-10 flex w-[46px]">
          <img ref={ready3Ref} className="mr-[18px]" src={ready3} alt="ready3" />
          <img ref={ready2Ref} className="mr-[18px]" src={ready2} alt="ready2" />
          <img ref={ready1Ref} src={ready1} alt="ready1" />
        </div>
      </div>
    </>
  )
}
export default FirstSection
