import { useDistanceContext } from '@/context/distanceContext'
import ScrollTarget, { ScrollTargetHandle } from '@/components/ScrollTarget'

import Parallax from 'parallax-js'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { main, character, btn, bg } from '@/lib/images'
const { dog, pig, cat } = character
const { joinHand, btnJoin } = btn
const { leftSolidCloud, rightSolidCloud, grass, treeLeft, treeRight } = bg
const { road, finishLineLeft, finishLineRight, finish } = main

const Footer: React.FC = () => {
  const footerGroupRef = useRef<HTMLDivElement>(null)
  const cloudGroupRef = useRef<HTMLDivElement>(null)

  const catRef = useRef<HTMLImageElement>(null)
  const dogRef = useRef<HTMLImageElement>(null)
  const pigRef = useRef<HTMLImageElement>(null)

  const finishRef = useRef<HTMLImageElement>(null)
  const finishLineLeftRef = useRef<HTMLImageElement>(null)
  const finishLineRightRef = useRef<HTMLImageElement>(null)

  const joinRef = useRef<HTMLDivElement>(null)

  const grassLeftRef = useRef<HTMLImageElement>(null)
  const grassRightRef = useRef<HTMLImageElement>(null)

  const treeLeftRef = useRef<HTMLImageElement>(null)
  const treeRightRef = useRef<HTMLImageElement>(null)

  const animalRef = useRef<any>(null)
  const parallaxRef = useRef<any>(null)

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

  const animalDom = [dogRef.current, pigRef.current, catRef.current]
  const finishLast = () => {
    const finishLast = {
      id: 'finishLast',
      dom: null,
      fc: () => setDistance(distance + 1),
      last: true,
    }
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

  const finishFirst = () => {
    const finishFirst = {
      id: 'finishFirst',
      dom: null,
      fc: finishLast,
    }
    const lineDom = [finishLineLeftRef.current, finishLineRightRef.current]
    const useGsap = tempGsap.current?.handleGsap(finishFirst)
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

  const handleGrassLast = () => {
    const grassLast = {
      id: 'grassLast',
      dom: null,
    }
    const useGsap = tempGsap.current?.handleGsap(grassLast)
    useGsap
      ?.to(grassLeftRef.current, { x: 150, y: -45, width: '90px' }, '<')
      .to(grassRightRef.current, { x: -150, y: -45, width: '90px' })
      .to(grassLeftRef.current, { x: 200, y: -60, opacity: 0, width: '70px' }, '<')
      .to(grassRightRef.current, { x: -200, y: -60, opacity: 0, width: '70px' })
  }

  const handleGrassTransitions = () => {
    const grassTransitions = {
      id: 'grassTransitions',
      dom: null,
      fc: handleGrassLast,
    }
    const useGsap = tempGsap.current?.handleGsap(grassTransitions)
    useGsap
      ?.to([grassLeftRef.current, grassRightRef.current], { y: 0, opacity: 1 })
      .to(grassLeftRef.current, { x: 50, y: -15, width: '130px' }, '<')
      .to(grassRightRef.current, { x: -50, y: -15, width: '130px' })
      .to(grassLeftRef.current, { x: 100, y: -30, width: '110px' }, '<')
      .to(grassRightRef.current, { x: -100, y: -15, width: '110px' })
  }

  const handleGrassFirst = () => {
    const grassFirst = {
      id: 'grassFirst',
      dom: null,
      fc: handleGrassTransitions,
    }
    const useGsap = tempGsap.current?.handleGsap(grassFirst)
    useGsap?.to([grassLeftRef.current, grassRightRef.current], { y: 100 })
  }

  const handleTreeLast = () => {
    const treeLast = {
      id: 'treeLast',
      dom: null,
    }
    const useGsap = tempGsap.current?.handleGsap(treeLast)
    useGsap
      ?.to(treeLeftRef.current, { x: 100, y: -15, width: '230px' }, '<')
      .to(treeRightRef.current, { x: -100, y: -15, width: '230px' }, '<')
      .to(treeLeftRef.current, { x: 200, y: -30, width: '210px', opacity: 0 }, '<')
      .to(treeRightRef.current, { x: -200, y: -30, width: '210px', opacity: 0 })
  }

  const handleTransitions = () => {
    const treeTransitions = {
      id: 'treeTransitions',
      dom: null,
      fc: handleTreeLast,
    }
    const useGsap = tempGsap.current?.handleGsap(treeTransitions)
    useGsap
      ?.to([treeLeftRef.current, treeRightRef.current], { y: 0, opacity: 1 }, '<')
      .to(treeLeftRef.current, { x: 0, width: '300px' }, '<')
      .to(treeRightRef.current, { x: 0, width: '300px' })
  }

  const handleTreeFirst = () => {
    const treeFirst = {
      id: 'treeFirst',
      dom: null,
      fc: handleTransitions,
    }
    const useGsap = tempGsap.current?.handleGsap(treeFirst)
    useGsap
      ?.to([treeLeftRef.current, treeRightRef.current], { y: 200 }, '<')
      .to(treeLeftRef.current, { x: -50 }, '<')
      .to(treeRightRef.current, { x: 50 })
  }

  useEffect(() => {
    parallaxRef.current?.enable()
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
        handleGrassFirst()
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
        handleTreeFirst()
        break
      case 8:
        parallaxRef.current?.disable()
        mobile()
        pcBig()
        ScrollTrigger.matchMedia({
          '(min-width: 640px)': () => {
            finishFirst()
          },
        })
        break
      default:
        const join = {
          id: 'join',
          dom: null,
        }
        const useGsap = tempGsap.current?.handleGsap(join)
        useGsap?.to(joinRef.current, { opacity: 0 })
        break
    }
  }, [distance])

  useEffect(() => {
    if (!parallaxRef.current) {
      parallaxRef.current = new Parallax(animalRef.current, { pointerEvents: false })
    }
  }, [])

  return (
    <>
      <ScrollTarget ref={tempGsap} />
      <div ref={footerGroupRef} className="fixed bottom-0 z-20">
        <div className="absolute bottom-0 mt-[50%] flex w-full justify-around px-10" ref={animalRef} data-limit-y="0">
          <img data-depth="0.5" className="w-[25%]" src={dog} alt="dog" ref={dogRef} />
          <img
            data-depth="0.5"
            className={`w-[28%] ${distance && 'mx-8 sm:mx-0'} !relative duration-200`}
            src={cat}
            alt="cat"
            ref={catRef}
          />
          <img
            data-depth="0.5"
            className="!relative mt-2 w-[25%] sm:mt-1 min-[1800px]:mt-14"
            src={pig}
            alt="pig"
            ref={pigRef}
          />
        </div>
        <img src={road} alt="road" />
        <img
          style={{ transform: 'rotateY(180deg)' }}
          className="absolute -bottom-[30%] -left-[10%] -z-10 w-[150px] opacity-0"
          src={grass}
          alt="grass"
          ref={grassLeftRef}
        />
        <img
          className="absolute -bottom-[30%] -right-[10%] -z-10 w-[150px] opacity-0"
          src={grass}
          alt="grass"
          ref={grassRightRef}
        />
        <img
          className="absolute -bottom-[40%] -left-[30%] -z-10 w-[250px] opacity-0"
          src={treeLeft}
          alt="treeLeft"
          ref={treeLeftRef}
        />
        <img
          className="absolute -bottom-[40%] -right-[30%] -z-10 w-[250px] opacity-0"
          src={treeRight}
          alt="treeLeft"
          ref={treeRightRef}
        />
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
      <div className="fixed right-4 bottom-4 w-[80px] cursor-pointer" ref={joinRef}>
        <p className="mb-2 text-center text-2xl text-primary">JOIN</p>
        <img src={joinHand} alt="joinHand" />
        <img src={btnJoin} alt="btnJoin" />
      </div>
      <div ref={cloudGroupRef} className="fixed top-[60%] flex w-full justify-between opacity-0 sm:top-[40%]">
        <img
          className="relative -left-[20%] w-[200px] sm:-left-[15%] sm:w-[300px] xl:w-[430px]"
          src={leftSolidCloud}
          alt="leftSolidCloud"
        />
        <img
          className="relative -right-[20%] w-[235px] sm:-right-[15] sm:w-[335px] xl:w-[485px]"
          src={rightSolidCloud}
          alt="rightSolidCloud"
        />
      </div>
    </>
  )
}
export default Footer
