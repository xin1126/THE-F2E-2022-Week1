import { useDistanceContext } from '@/context/distanceContext'
import ScrollTarget, { ScrollTargetHandle } from '@/components/ScrollTarget'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import road from '@/assets/images/main/road.png'
import dog from '@/assets/images/character/character_f2e.gif'
import pig from '@/assets/images/character/character_team.gif'
import cat from '@/assets/images/character/character_ui.gif'
import joinHand from '@/assets/images/btn/btn_joinHand.gif'
import btnJoin from '@/assets/images/btn/btn_join.png'
import leftCloud from '@/assets/images/bg/bg_decorate_01.png'
import rightCloud from '@/assets/images/bg/bg_decorate_05.png'
import finishLineLeft from '@/assets/images/main/finishLine_l.png'
import finishLineRight from '@/assets/images/main/finishLine_r.png'
import finish from '@/assets/images/main/finish_1.png'

const Footer: React.FC = () => {
  const footerGroupRef = useRef<HTMLDivElement>(null)
  const catRef = useRef<HTMLImageElement>(null)
  const dogRef = useRef<HTMLImageElement>(null)
  const pigRef = useRef<HTMLImageElement>(null)
  const finishRef = useRef<HTMLImageElement>(null)
  const finishLineLeftRef = useRef<HTMLImageElement>(null)
  const finishLineRightRef = useRef<HTMLImageElement>(null)
  const cloudGroupRef = useRef<HTMLDivElement>(null)
  const tempGsap = useRef<ScrollTargetHandle>(null)

  const { distance, setDistance } = useDistanceContext()

  const mobile = () => {
    gsap.to(footerGroupRef.current, {
      'max-width': '250px',
    })
  }

  const pcBig = () => {
    ScrollTrigger.matchMedia({
      '(min-width: 640px)': () => {
        gsap.to(footerGroupRef.current, {
          'max-width': '600px',
        })
      },
      '(min-width: 1800px)': () => {
        gsap.to(footerGroupRef.current, {
          'max-width': '1050px',
        })
      },
    })
  }

  const pcSmall = () => {
    ScrollTrigger.matchMedia({
      '(min-width: 640px)': () => {
        gsap.to(footerGroupRef.current, {
          'max-width': '350px',
        })
      },
      '(min-width: 1800px)': () => {
        gsap.to(footerGroupRef.current, {
          'max-width': '800px',
        })
      },
    })
  }

  const finishLast = () => {
    const finishLast = {
      id: 'finishLast',
      dom: null,
      fc: () => setDistance(distance + 1),
      last: true,
    }
    const animalDom = [dogRef.current, pigRef.current, catRef.current]
    const useGsap = tempGsap.current?.handleGsap(finishLast)
    useGsap
      ?.to(animalDom, { scale: '1.6' }, '<')
      .to(cloudGroupRef.current, { padding: '0 30%', opacity: 0 }, '<')
      .to(animalDom, { scale: '1.8' })
      .to(finishLineLeftRef.current, { rotate: '-5deg' }, '<')
      .to(finishLineRightRef.current, { rotate: '10deg' }, '<')
      .to(animalDom, { scale: '2' })
      .to(finishLineLeftRef.current, { left: '-30%', opacity: 0 }, '<')
      .to(finishLineRightRef.current, { right: '-30%', opacity: 0 }, '<')
      .to(animalDom, { scale: '2.5' })
      .to(animalDom, { scale: '3', opacity: 0.5 }, '<')
      .to(animalDom, { scale: '4', opacity: 0 })
      .to(finishRef.current, { opacity: 0.5 })
      .to(finishRef.current, { opacity: 0 })
  }

  const finishFiret = () => {
    const finishFiret = {
      id: 'finishFiret',
      dom: null,
      fc: finishLast,
    }
    const animalDom = [dogRef.current, pigRef.current, catRef.current]
    const lineDom = [finishLineLeftRef.current, finishLineRightRef.current]
    const useGsap = tempGsap.current?.handleGsap(finishFiret)
    useGsap
      ?.to(lineDom, { y: 1000 })
      .to(cloudGroupRef.current, { opacity: 1 })
      .to(cloudGroupRef.current, { padding: '0 10%' })
      .to(lineDom, { display: 'block' })
      .to(animalDom, { scale: '1.2' }, '<')
      .to(lineDom, { y: 500 }, '<')
      .to(cloudGroupRef.current, { padding: '0 15%' })
      .to(finishRef.current, { display: 'block' }, '<')
      .to(animalDom, { scale: '1.4' }, '<')
      .to(lineDom, { y: 0 }, '<')
      .to(finishRef.current, { 'max-width': '1300px' }, '<')
      .to(cloudGroupRef.current, { padding: '0 20%', opacity: 0.8 })
  }

  useEffect(() => {
    switch (distance) {
      case 0:
        gsap.to(footerGroupRef.current, {
          'max-width': '1175px',
        })
        pcBig()
        break
      case 1:
        mobile()
        pcSmall()
        break
      case 2:
        mobile()
        pcBig()
        break
      case 3:
        mobile()
        pcSmall()
        break
      case 4:
        mobile()
        pcBig()
        break
      case 5:
        mobile()
        ScrollTrigger.matchMedia({
          '(min-width: 640px)': () => {
            gsap.to(footerGroupRef.current, {
              'max-width': '800px',
            })
          },
          '(min-width: 1800px)': () => {
            gsap.to(footerGroupRef.current, {
              'max-width': '1200px',
            })
          },
        })
        break
      case 6:
        mobile()
        pcSmall()
        ScrollTrigger.matchMedia({
          '(min-width: 640px)': () => {
            gsap.to(catRef.current, { padding: '0' })
          },
        })
        break
      case 7:
        mobile()
        pcSmall()
        ScrollTrigger.matchMedia({
          '(min-width: 640px)': () => {
            gsap.to(catRef.current, { padding: '0 20px' })
          },
        })
        break
      case 8:
        mobile()
        pcBig()
        ScrollTrigger.matchMedia({
          '(min-width: 640px)': () => {
            finishFiret()
          },
        })
        break
    }
  }, [distance])

  return (
    <>
      <ScrollTarget ref={tempGsap} />
      <div ref={footerGroupRef} className="fixed bottom-0 z-20">
        <div className="absolute bottom-0 mt-[50%] flex w-full justify-around px-10">
          <img className="w-[25%]" src={dog} alt="dog" ref={dogRef} />
          <img
            className={`w-[28%] ${distance && 'mx-8 sm:mx-0'} relative duration-200`}
            src={cat}
            alt="cat"
            ref={catRef}
          />
          <img
            className="relative -bottom-2 w-[25%] sm:-bottom-1 min-[1800px]:-bottom-8"
            src={pig}
            alt="pig"
            ref={pigRef}
          />
        </div>
        <img src={road} alt="road" />
      </div>
      <img className="fixed -top-[8%] z-10 hidden" src={finish} alt="finish" ref={finishRef} />
      <div className="fixed bottom-[20%] z-20 flex w-screen">
        <img
          className="relative left-2 hidden w-[52%]"
          src={finishLineLeft}
          alt="finishLineLeft"
          ref={finishLineLeftRef}
        />
        <img
          className="relative right-6 hidden w-[52%]"
          src={finishLineRight}
          alt="finishLineRight"
          ref={finishLineRightRef}
        />
      </div>
      <div className="fixed right-4 bottom-4 w-[80px] cursor-pointer">
        <p className="mb-2 text-center text-2xl text-primary">JOIN</p>
        <img src={joinHand} alt="joinHand" />
        <img src={btnJoin} alt="btnJoin" />
      </div>
      <div ref={cloudGroupRef} className="fixed top-[60%] flex w-full justify-between opacity-0 sm:top-[40%]">
        <img
          className="relative -left-[20%] w-[200px] sm:-left-[15%] sm:w-[300px] xl:w-[430px]"
          src={leftCloud}
          alt="leftCloud"
        />
        <img
          className="relative -right-[20%] w-[235px] sm:-right-[15] sm:w-[335px] xl:w-[485px]"
          src={rightCloud}
          alt="rightCloud"
        />
      </div>
    </>
  )
}
export default Footer
