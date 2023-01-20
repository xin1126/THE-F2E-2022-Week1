import { useDistanceContext } from '@/context/distanceContext'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import road from '@/assets/images/main/road.png'
import dog from '@/assets/images/character/character_f2e.gif'
import pig from '@/assets/images/character/character_team.gif'
import cat from '@/assets/images/character/character_ui.gif'
import joinHand from '@/assets/images/btn/btn_joinHand.gif'
import btnJoin from '@/assets/images/btn/btn_join.png'

const Footer: React.FC = () => {
  const footerGroupRef = useRef<HTMLDivElement>(null)

  const { distance } = useDistanceContext()

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
          'max-width': '1175px',
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

      default:
        break
    }
  }, [distance])

  return (
    <>
      <div ref={footerGroupRef} className="fixed bottom-0 z-10">
        <div className="absolute bottom-0 mt-[50%] flex w-full justify-around px-10">
          <img className="w-[25%]" src={dog} alt="dog" />
          <img className={`w-[28%] ${distance && 'mx-8 sm:mx-0'} duration-200`} src={cat} alt="cat" />
          <img className="relative -bottom-2 w-[25%] sm:-bottom-1 min-[1800px]:-bottom-8" src={pig} alt="pig" />
        </div>
        <img src={road} alt="road" />
      </div>
      <div className="fixed right-4 bottom-4 w-[80px] cursor-pointer">
        <p className="mb-2 text-center text-2xl text-primary">JOIN</p>
        <img src={joinHand} alt="joinHand" />
        <img src={btnJoin} alt="btnJoin" />
      </div>
    </>
  )
}
export default Footer
