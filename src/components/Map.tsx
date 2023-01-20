import { useDistanceContext } from '@/context/distanceContext'

import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

import map from '@/assets/images/main/map.svg'
import mapFinish from '@/assets/images/main/map_finish.svg'
import mapNow from '@/assets/images/main/map_now.gif'

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

  const distance4 = () => {
    handleGsap(
      [
        { x: 220, ease: 'sine.out' },
        { y: -32, ease: 'sine.in' },
      ],
      'distance4-1'
    )
    handleGsap([{ x: 180 }, { y: 10 }], 'distance4-2')
  }

  const distance5 = () => {
    handleGsap([{ x: 147 }, { y: 30 }], 'distance5-1')
    handleGsap([{ y: -22 }], 'distance5-2')
    handleGsap([{ x: 138 }], 'distance5-3')
    handleGsap([{ x: 126 }, { y: 36 }], 'distance5-4')
  }

  const distance6 = () => {
    handleGsap([{ x: 82 }, { y: 70 }], 'distance6')
  }

  const distance7 = () => {
    handleGsap([{ x: 70 }, { y: 85 }], 'distance7-1')
    handleGsap([{ x: 26.5 }, { y: 55 }], 'distance7-2')
  }

  useEffect(() => {
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
        distance3()
        break
      case 4:
        distance4()
        break
      case 5:
        distance5()
        break
      case 6:
        distance6()
        break
      case 7:
        distance7()
        break
    }
  }, [distance])
  return (
    <div className="fixed left-2 bottom-4">
      <img src={map} alt="map" ref={mapRef} />
      <img className="absolute top-[50px] w-[34px]" src={mapNow} alt="mapNow" ref={mapNowRef} />
    </div>
  )
}

export default Map
