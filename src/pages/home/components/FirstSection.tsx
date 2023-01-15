import { FatherContext, Context } from '../index'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import road from '@/assets/images/main/road.png'
import start from '@/assets/images/main/start.png'
import logoText from '@/assets/images/logo/logo_text.png'
import dog from '@/assets/images/character/character_f2e.gif'
import pig from '@/assets/images/character/character_team.gif'
import cat from '@/assets/images/character/character_ui.gif'
import user from '@/assets/images/ic/ic_users.svg'
import leftCloud from '@/assets/images/bg/bg_decorate_01.png'
import rightCloud from '@/assets/images/bg/bg_decorate_05.png'

gsap.registerPlugin(ScrollTrigger)

const FirstSection: React.FC = () => {
  const leftCloudRef = useRef<HTMLImageElement>(null)
  const rightCloudRef = useRef<HTMLImageElement>(null)
  const cloudGroupRef = useRef<HTMLDivElement>(null)
  const joinInfoGroupRef = useRef<HTMLUListElement>(null)
  const headerGroupRef = useRef<HTMLDivElement>(null)
  const footerGroupRef = useRef<HTMLDivElement>(null)

  const { setTroubledSectionStatus } = useContext<Context>(FatherContext)

  const handleGsap = () => {
    // 雲區塊
    const gsapCloudGroup = gsap.timeline({
      scrollTrigger: {
        trigger: cloudGroupRef.current,
        scrub: true,
      },
    })

    gsapCloudGroup
      .to(cloudGroupRef.current, {
        padding: '0 10%',
      })
      .to(cloudGroupRef.current, {
        padding: '0 25%',
      })

    // 雲朵
    const gsapCloudSection = gsap.timeline({
      scrollTrigger: {
        trigger: cloudGroupRef.current,
        scrub: true,
      },
    })

    gsapCloudSection
      .to([leftCloudRef.current, rightCloudRef.current], {
        width: '20%',
      })
      .to([leftCloudRef.current, rightCloudRef.current], {
        opacity: 0,
      })

    ScrollTrigger.create({
      trigger: cloudGroupRef.current,
      onLeave() {
        handleJoinInfo()
      },
    })
  }

  const handleJoinInfo = () => {
    if (ScrollTrigger.getById('joinInfo')) return

    const gsapJoinInfoGroup = gsap.timeline({
      scrollTrigger: {
        id: 'joinInfo',
        trigger: joinInfoGroupRef.current,
        start: 'top 40%',
        scrub: true,
      },
    })

    gsapJoinInfoGroup.to(joinInfoGroupRef.current, {
      opacity: 0,
    })

    ScrollTrigger.create({
      trigger: joinInfoGroupRef.current,
      onLeave() {
        handleHeader()
      },
    })
  }

  const handleHeader = () => {
    if (ScrollTrigger.getById('header')) return

    const gsapHeader = gsap.timeline({
      scrollTrigger: {
        id: 'header',
        trigger: joinInfoGroupRef.current,
        start: 'top 40%',
        scrub: true,
      },
    })

    gsapHeader.to(headerGroupRef.current, {
      opacity: 0,
    })

    ScrollTrigger.create({
      trigger: joinInfoGroupRef.current,
      onLeave() {
        handleFooter()
        setTroubledSectionStatus(true)
      },

      onEnterBack() {
        setTroubledSectionStatus(false)
      },
    })
  }

  const handleFooter = () => {
    if (ScrollTrigger.getById('footer')) return

    const gsapFooter = gsap.timeline({
      scrollTrigger: {
        id: 'footer',
        trigger: joinInfoGroupRef.current,
        start: 'top 40%',
        scrub: true,
      },
    })

    gsapFooter.to(footerGroupRef.current, {
      width: '800px',
    })

    ScrollTrigger.create({
      trigger: joinInfoGroupRef.current,
      onLeave() {
        handleFooter()
      },
    })
  }

  useLayoutEffect(() => {
    handleGsap()
  }, [])

  return (
    <>
      <div
        ref={headerGroupRef}
        className="fixed z-10 flex w-full max-w-[1300px] flex-col items-center
      "
      >
        <img className="mt-10 max-w-[680px]" src={logoText} alt="start" />
        <div className="relative -top-4 w-fit rounded-3xl bg-secondary px-10 py-2 text-3xl text-white">
          互動式網頁設計
        </div>
        <ul
          ref={joinInfoGroupRef}
          className="flex w-full justify-around text-2xl"
        >
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
        <img
          className="absolute top-0 -z-10 max-w-[1430px]"
          src={start}
          alt="start"
        />
      </div>
      <div ref={footerGroupRef} className="fixed bottom-0 z-10 max-w-[1175px]">
        <div className="absolute bottom-0 flex w-full justify-around px-10">
          <img className="w-[25%]" src={dog} alt="dog" />
          <img className="w-[28%]" src={cat} alt="cat" />
          <img className="mt-20 w-[25%]" src={pig} alt="pig" />
        </div>
        <img src={road} alt="road" />
      </div>
      <div
        ref={cloudGroupRef}
        className="fixed top-[40%] flex w-full justify-between px-[5%]"
      >
        <img
          className="w-[430px]"
          src={leftCloud}
          ref={leftCloudRef}
          alt="leftCloud"
        />
        <img
          className="w-[485px]"
          src={rightCloud}
          ref={rightCloudRef}
          alt="rightCloud"
        />
      </div>
    </>
  )
}
export default FirstSection
