import { FatherContext, Context } from '@/pages/home/index'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import road from '@/assets/images/main/road.png'
import dog from '@/assets/images/character/character_f2e.gif'
import pig from '@/assets/images/character/character_team.gif'
import cat from '@/assets/images/character/character_ui.gif'

const Footer: React.FC = () => {
  const footerGroupRef = useRef<HTMLDivElement>(null)

  const { distance } = useContext<Context>(FatherContext)

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
      '(min-width: 1700px)': () => {
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
      '(min-width: 1700px)': () => {
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

      default:
        break
    }
  }, [distance])

  return (
    <div ref={footerGroupRef} className="fixed bottom-0 z-10">
      <div className="absolute bottom-0 mt-[50%] flex w-full justify-around px-10">
        <img className="w-[25%]" src={dog} alt="dog" />
        <img className={`w-[28%] ${distance && 'mx-8 sm:mx-0'} duration-200`} src={cat} alt="cat" />
        <img className="relative -bottom-2 w-[25%] sm:-bottom-1 min-[1700px]:-bottom-8" src={pig} alt="pig" />
      </div>
      <img src={road} alt="road" />
    </div>
  )
}
export default Footer
