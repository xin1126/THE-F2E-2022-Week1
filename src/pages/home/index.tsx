import { createContext } from 'react'

import FirstSection from './components/FirstSection'
import TroubledSection from './components/TroubledSection'

export interface Context {
  troubledSectionStatus: boolean
  setTroubledSectionStatus: (str: boolean) => void
}

export const FatherContext = createContext<Context>({
  troubledSectionStatus: false,
  setTroubledSectionStatus: () => {},
})

const Home: React.FC = () => {
  const [troubledSectionStatus, setTroubledSectionStatus] = useState(false)

  return (
    <FatherContext.Provider
      value={{ troubledSectionStatus, setTroubledSectionStatus }}
    >
      <div className="flex h-[1000vh] flex-col items-center bg-[#ffc37d]">
        <FirstSection />
        {troubledSectionStatus && <TroubledSection />}
      </div>
    </FatherContext.Provider>
  )
}

export default Home
