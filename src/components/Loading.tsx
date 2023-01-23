import { gsap } from 'gsap'

import images from '@/lib/images'

type Key = 'bg' | 'btn' | 'character' | 'logo' | 'main'

type Action = { type: 'imgComplete'; payload: boolean } | { type: 'gsapComplete'; payload: boolean }

type State = {
  loadImg: boolean
  gsapComplete: boolean
}

interface Props {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const initialState = { loadImg: false, gsapComplete: false }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'imgComplete':
      return {
        ...state,
        loadImg: action.payload,
      }
    case 'gsapComplete':
      return {
        ...state,
        gsapComplete: action.payload,
      }
    default:
      throw new Error('error')
  }
}

const Loading: React.FC<Props> = ({ setLoading }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const loadingRef = useRef<HTMLDivElement>(null)

  const { dog, pig, cat } = images.character

  let tempImages: string[] = []

  Object.keys(images).forEach((item) => {
    tempImages = [...tempImages, ...Object.values(images[item as Key])]
  })

  useEffect(() => {
    gsap.to(loadingRef.current, {
      x: 470,
      duration: 2.5,
      onComplete() {
        dispatch({ type: 'gsapComplete', payload: true })
      },
    })

    const imgID = document.querySelectorAll('#img')
    const loadImg: number[] = []
    imgID.forEach((item, index) => {
      const ImgItem = item as HTMLImageElement
      const img = new Image()
      img.src = ImgItem.src
      img.addEventListener('load', () => {
        if (!loadImg.includes(index)) loadImg.push(index)
        if (loadImg.length === tempImages.length) dispatch({ type: 'imgComplete', payload: true })
      })
    })
  }, [])

  useEffect(() => {
    if (Object.values(state).every((e) => e === true)) {
      window.scrollTo(0, 0)
      setLoading(false)
    }
  }, [state])

  return (
    <div className="fixed top-0 z-50 flex h-full w-full flex-col items-center justify-center bg-background">
      <div className="relative flex w-[250px] flex-col items-center">
        <div className="absolute bottom-0 flex w-full justify-center px-10">
          <img className="w-[25%]" src={dog} alt="dog" />
          <img className="mx-4 w-[30%]" src={cat} alt="cat" />
          <img className="mt-2 w-[25%]" src={pig} alt="pig" />
        </div>
        <img src={images.main.road} alt="road" />
      </div>
      <div className="relative h-[10px] w-[465px] rounded-3xl border-2 border-primary">
        <div className="relative top-[-1px] -z-20 h-[8px] w-full rounded-3xl bg-primary"></div>
        <div className="absolute top-0 left-0 -z-10 h-[8px] w-full rounded-3xl bg-background" ref={loadingRef}></div>
      </div>
      {tempImages.map((item) => (
        <img className="hidden" src={item} alt="img" key={item} id="img" />
      ))}
    </div>
  )
}

export default Loading
