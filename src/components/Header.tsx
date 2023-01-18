import { FatherContext, Context } from '@/pages/home/index'

import { gsap } from 'gsap'

import logo from '@/assets/images/logo/logo.png'
import logoText from '@/assets/images/logo/logo_text.png'
import user from '@/assets/images/btn/btn_user_h.png'
import btn from '@/assets/images/btn/btn_burger_open_h.png'

const Header: React.FC = () => {
  const logoRef = useRef<HTMLImageElement>(null)

  const { distance } = useContext<Context>(FatherContext)

  useEffect(() => {
    if (!distance) {
      gsap.to(logoRef.current, {
        opacity: 0,
      })
      return
    }

    gsap.to(logoRef.current, {
      opacity: 1,
    })
  })
  return (
    <div className="fixed top-0 z-50 flex w-full justify-between bg-background p-2 sm:z-10 sm:items-start">
      <img className="hidden w-[100px] sm:block xl:w-[200px]" src={logo} alt="user" ref={logoRef} />
      <img className="relative -left-2 w-[40px] cursor-pointer sm:hidden" src={btn} alt="btn" />
      <img className="mt-2 w-[135px] sm:hidden" src={logoText} alt="logoText" />
      <img className="w-[40px] sm:w-[80px]" src={user} alt="user" />
    </div>
  )
}

export default Header
