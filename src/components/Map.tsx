import { useDistanceContext } from '@/context/distanceContext'

import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

import { main } from '@/lib/images'
const { map, mapFinish, mapNow } = main

interface GsapTO {
  x?: number
  y?: number
  ease?: string
  duration?: number
}

gsap.registerPlugin(MotionPathPlugin)

const Map: React.FC = () => {
  const mapRef = useRef<HTMLImageElement>(null)
  const mapNowRef = useRef<HTMLImageElement>(null)
  const mapFinishRef = useRef<HTMLImageElement>(null)
  const tempDistance = useRef<number>(0)

  const { distance } = useDistanceContext()

  const useGsap = gsap.timeline()

  const handleGsap = (data: Array<GsapTO>, id: string) => {
    data.forEach((item: GsapTO) => {
      item.duration = 1
      useGsap.to(mapNowRef.current, item, id)
    })
  }

  const distance1 = (back?: boolean) => {
    if (back) {
      handleGsap(
        [
          { x: 0, ease: 'sine.out' },
          { y: 0, ease: 'sine.in' },
        ],
        'distance1'
      )
      return
    }

    handleGsap(
      [
        { y: -50, ease: 'sine.out' },
        { x: 40, ease: 'sine.in' },
      ],
      'distance1'
    )
  }

  const distance2 = () => {
    handleGsap(
      [
        { x: 112, ease: 'sine.out' },
        { y: -40, ease: 'sine.in' },
      ],
      'distance2'
    )
  }

  const distance3 = () => {
    handleGsap([{ x: 192 }], 'distance3')
  }

  const distance4 = (back?: boolean) => {
    if (back) {
      handleGsap([{ x: 220 }, { y: -40 }], 'distance4-1-back')
      handleGsap([{ x: 192 }], 'distance4-2-back')
      return
    }

    handleGsap(
      [
        { x: 220, ease: 'sine.out' },
        { y: -32, ease: 'sine.in' },
      ],
      'distance4-1'
    )
    handleGsap([{ x: 180 }, { y: 10 }], 'distance4-2')
  }

  const distance5 = (back?: boolean) => {
    if (back) {
      handleGsap([{ x: 138 }, { y: -22 }], 'distance5-1-back')
      handleGsap([{ x: 147 }], 'distance5-2-back')
      handleGsap([{ y: 30 }], 'distance5-3-back')
      handleGsap([{ x: 180 }, { y: 10 }], 'distance5-4-back')
      return
    }

    handleGsap([{ x: 147 }, { y: 30 }], 'distance5-1')
    handleGsap([{ y: -22 }], 'distance5-2')
    handleGsap([{ x: 138 }], 'distance5-3')
    handleGsap([{ x: 126 }, { y: 36 }], 'distance5-4')
  }

  const distance6 = (back?: boolean) => {
    if (back) {
      handleGsap([{ x: 126 }, { y: 36 }], 'distance6-back')
      return
    }
    handleGsap([{ x: 82 }, { y: 70 }], 'distance6')
  }

  const distance7 = (back?: boolean) => {
    if (back) {
      useGsap.to(mapFinishRef.current, { display: 'none' })
      useGsap.to(mapRef.current, { display: 'block' })
      handleGsap([{ x: 70 }, { y: 85 }], 'distance7-1-back')
      handleGsap([{ x: 82 }, { y: 70 }], 'distance7-2-back')
      return
    }
    handleGsap([{ x: 70 }, { y: 85 }], 'distance7-1')
    handleGsap([{ x: 26.5 }, { y: 55 }], 'distance7-2')
    useGsap.to(mapRef.current, { display: 'none' })
    useGsap.to(mapFinishRef.current, { display: 'block' })
  }

  useEffect(() => {
    const isBack = tempDistance.current === distance + 1
    const mapDom = [mapFinishRef.current, mapNowRef.current]

    gsap.to(mapDom, {
      opacity: 1,
    })

    switch (distance) {
      case 0:
        distance1(true)
        break
      case 1:
        distance1()
        break
      case 2:
        distance2()
        break
      case 3:
        if (isBack) {
          distance4(true)
          break
        }
        distance3()
        break
      case 4:
        if (isBack) {
          distance5(true)
          break
        }
        distance4()
        break
      case 5:
        if (isBack) break
        distance5()
        break
      case 6:
        if (isBack) {
          distance6(true)
          break
        }
        break
      case 7:
        if (isBack) {
          distance7(true)
          break
        }
        distance6()
        break
      case 8:
        if (isBack) break
        distance7()
        break
      case 9:
        gsap.to(mapDom, {
          opacity: 0,
        })
        break
    }
    tempDistance.current = distance
  }, [distance])
  return (
    <div className="fixed left-2 bottom-4 z-40">
      <img src={map} alt="map" ref={mapRef} />
      <img className="hidden" src={mapFinish} alt="mapFinish" ref={mapFinishRef} />
      <img className="absolute top-[50px] w-[34px]" src={mapNow} alt="mapNow" ref={mapNowRef} />
    </div>
  )
}

export default Map
