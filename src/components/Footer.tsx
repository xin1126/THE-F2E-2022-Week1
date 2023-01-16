import { FatherContext, Context } from '@/pages/home/index'

import { gsap } from 'gsap'

import road from '@/assets/images/main/road.png'
import dog from '@/assets/images/character/character_f2e.gif'
import pig from '@/assets/images/character/character_team.gif'
import cat from '@/assets/images/character/character_ui.gif'

const Footer: React.FC = () => {
  const footerGroupRef = useRef<HTMLDivElement>(null)

  const { distance } = useContext<Context>(FatherContext)

  useEffect(() => {
    switch (distance) {
      case 0:
        gsap.to(footerGroupRef.current, {
          width: '1300px',
        })
        break
      case 1:
        gsap.to(footerGroupRef.current, {
          width: '800px',
        })
        break
      case 2:
        gsap.to(footerGroupRef.current, {
          width: '1300px',
        })
        break

      default:
        break
    }
  }, [distance])

  return (
    <div ref={footerGroupRef} className="fixed bottom-0 z-10 max-w-[1175px]">
      <div className="absolute bottom-0 flex w-full justify-around px-10">
        <img className="w-[25%]" src={dog} alt="dog" />
        <img className="w-[28%]" src={cat} alt="cat" />
        <img className="mt-20 w-[25%]" src={pig} alt="pig" />
      </div>
      <img src={road} alt="road" />
    </div>
  )
}
export default Footer
