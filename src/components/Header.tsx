import { useDistanceContext } from '@/context/distanceContext'

import { gsap } from 'gsap'

import { btn, logoGroup } from '@/lib/images'
const { logo, logoText } = logoGroup
const { user, btnOpen } = btn

const Header: React.FC = () => {
  const logoRef = useRef<HTMLImageElement>(null)

  const { distance } = useDistanceContext()

  useEffect(() => {
    if (!distance || distance === 9) {
      gsap.to(logoRef.current, {
        opacity: 0,
      })
      return
    }

    gsap.to(logoRef.current, {
      opacity: 1,
    })
  }, [distance])
  return (
    <div className="fixed top-0 z-50 flex w-full justify-between bg-background p-2 sm:z-10 sm:items-start">
      <img className="hidden w-[100px] sm:block xl:w-[200px]" src={logo} alt="user" ref={logoRef} />
      <img className="relative -left-2 w-[40px] cursor-pointer opacity-0 sm:hidden" src={btnOpen} alt="btnOpen" />
      <img className="mt-2 w-[135px] sm:hidden" src={logoText} alt="logoText" />
      <img className="w-[40px] sm:w-[80px]" src={user} alt="user" />
    </div>
  )
}

export default Header
