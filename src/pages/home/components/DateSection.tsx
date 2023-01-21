import { useDistanceContext } from '@/context/distanceContext'
import ScrollTarget, { ScrollTargetHandle } from '@/components/ScrollTarget'

import dateLine from '@/assets/images/main/date_line.png'
import weekLine from '@/assets/images/main/date_weekLine.png'
import start from '@/assets/images/main/date_start.png'
import upload from '@/assets/images/main/date_upload.png'
import joinHand from '@/assets/images/btn/btn_joinHand.gif'
import btnJoin from '@/assets/images/btn/btn_join.png'

const DateSection: React.FC = () => {
  const DateSectionRef = useRef<HTMLDivElement>(null)

  const hiddenLineRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLImageElement>(null)

  const singupSectionRef = useRef<HTMLDivElement>(null)
  const singupContentRef = useRef<HTMLDivElement>(null)
  const singupLineRef = useRef<HTMLImageElement>(null)

  const startSectionRef = useRef<HTMLDivElement>(null)
  const startContentRef = useRef<HTMLDivElement>(null)
  const startLineRef = useRef<HTMLImageElement>(null)

  const uploaSectionRef = useRef<HTMLDivElement>(null)
  const uploaContentRef = useRef<HTMLDivElement>(null)
  const uploadLineRef = useRef<HTMLImageElement>(null)

  const gsap = useRef<ScrollTargetHandle>(null)

  const { distance, setDistance } = useDistanceContext()

  const handleExit = () => {
    const dateExit = {
      id: 'dateExit',
      dom: null,
      fc: () => setDistance(distance + 1),
      last: true,
    }

    const tempDom = [
      singupSectionRef.current,
      singupLineRef.current,
      startSectionRef.current,
      startLineRef.current,
      uploaSectionRef.current,
      uploadLineRef.current,
    ]

    const useGsap = gsap.current?.handleGsap(dateExit)

    useGsap
      ?.to(tempDom, {
        y: -50,
        opacity: 0.5,
      })
      .to([...tempDom, lineRef.current], {
        opacity: 0,
      })
  }

  const handleUpload = () => {
    const upload = {
      id: 'upload',
      dom: null,
      fc: handleExit,
    }
    const useGsap = gsap.current?.handleGsap(upload)
    useGsap
      ?.to(uploaSectionRef.current, {
        y: 50,
      })
      .to([uploaSectionRef.current, uploaContentRef.current, uploadLineRef.current], {
        y: 0,
        opacity: 1,
      })
  }

  const handleStart = () => {
    const start = {
      id: 'start',
      dom: null,
      fc: handleUpload,
    }
    const useGsap = gsap.current?.handleGsap(start)
    useGsap
      ?.to(startSectionRef.current, {
        y: 50,
      })
      .to([startSectionRef.current, startContentRef.current, startLineRef.current], {
        y: 0,
        opacity: 1,
      })
  }

  const handleSingup = () => {
    const singup = {
      id: 'singup',
      dom: null,
      fc: handleStart,
    }
    const useGsap = gsap.current?.handleGsap(singup)
    useGsap
      ?.to(singupSectionRef.current, {
        y: 50,
      })
      .to([singupSectionRef.current, singupContentRef.current, singupLineRef.current], {
        y: 0,
        opacity: 1,
      })
  }

  const handleLine = () => {
    const line = {
      id: 'line',
      dom: null,
      fc: handleSingup,
    }
    const useGsap = gsap.current?.handleGsap(line)
    useGsap
      ?.to(DateSectionRef.current, {
        display: 'block',
      })
      .to(hiddenLineRef.current, {
        x: 500,
      })
      .to(lineRef.current, {
        opacity: 0.5,
      })
      .to(hiddenLineRef.current, {
        x: 1000,
      })
      .to(lineRef.current, {
        opacity: 0.8,
      })
      .to(hiddenLineRef.current, {
        x: 2000,
      })
      .to(lineRef.current, {
        opacity: 1,
      })
  }

  useLayoutEffect(() => {
    handleLine()
  }, [])

  return (
    <>
      <ScrollTarget ref={gsap} />
      <div className="fixed top-[45%] z-10 hidden max-w-[1440px]" ref={DateSectionRef}>
        <div ref={hiddenLineRef} className="absolute top-0 z-10 h-[300px] w-full bg-background"></div>
        <img ref={lineRef} className="opacity-0" src={dateLine} alt="line" />
        <ul className="relative top-[-480px] flex w-full justify-around pb-[350px]">
          <li>
            <div className="relative z-10 bg-background" ref={singupSectionRef}>
              <div className="flex flex-col items-center opacity-0" ref={singupContentRef}>
                <div className="mb-4 w-[80px] cursor-pointer">
                  <img src={joinHand} alt="joinHand" />
                  <img src={btnJoin} alt="btnJoin" />
                </div>
                <p className="mb-2 text-5xl text-secondary">SIGN UP</p>
                <div className="mb-2 w-fit rounded-3xl bg-primary px-8 py-1 text-2xl text-white">10/13 - 11/6</div>
                <p className="mb-2 text-lg text-info">截止前可修改報名組別</p>
              </div>
            </div>
            <img className="h-[140px] opacity-0" src={weekLine} alt="weekLine" ref={singupLineRef} />
          </li>
          <li className="relative top-[-14px]">
            <div className="relative top-16 z-10 bg-background" ref={startSectionRef}>
              <div className="flex flex-col items-center opacity-0" ref={startContentRef}>
                <img className="w-[140px]" src={start} alt="start" />
                <p className="mb-2 text-5xl text-secondary">START</p>
                <div className="mb-2 w-fit rounded-3xl bg-primary px-8 py-1 text-2xl text-white">10/31 - 11/28</div>
                <p className="mb-2 text-center text-lg text-info">
                  10/31(一) UI、團體組開賽 <br /> 11/7(一) 前端組開賽
                </p>
              </div>
            </div>
            <div className="relative  opacity-0" ref={startLineRef}>
              <div className="absolute right-1/2 z-10 h-[60px] w-[10px] translate-x-[50%] bg-background"></div>
              <img className="h-[140px]" src={weekLine} alt="weekLine" />
            </div>
          </li>
          <li className="relative top-[10px]">
            <div className="relative top-10 z-10 bg-background" ref={uploaSectionRef}>
              <div className="flex flex-col items-center opacity-0" ref={uploaContentRef}>
                <img className="w-[140px]" src={upload} alt="upload" />
                <p className="mb-2 text-5xl text-secondary">UPLOAD</p>
                <div className="mb-2 w-fit rounded-3xl bg-primary px-8 py-1 text-2xl text-white">10/31 - 11/28</div>
                <p className="mb-2 text-lg text-info">依賽程登錄作品</p>
                <p className="mb-2 text-lg text-secondary">額外競賽： 主題豐厚獎金等著你</p>
              </div>
            </div>
            <div className="relative  opacity-0" ref={uploadLineRef}>
              <div className="absolute right-1/2 z-10 h-[40px] w-[10px] translate-x-[50%] bg-background"></div>
              <img className="h-[140px]" src={weekLine} alt="weekLine" />
            </div>
          </li>
        </ul>
      </div>
    </>
  )
}
export default DateSection