import Image from 'next/image'
import bgImage from '@/public/bg.png'

export const BackgroundImage = () => {
  return (
    <div className="fixed w-full h-screen bg-zinc-950 pointer-events-none z-[-1]">
      <Image
        src={bgImage}
        alt="Focus background image"
        className="w-full h-full object-cover object-center opacity-30"
        priority={false}
      />
    </div>
  )
}
