'use client'

import Image from 'next/image'
import bgSky from '@/public/sky.jpg'
import bgSpace from '@/public/space.jpg'
import bgTrain from '@/public/train.jpg'
import bgFlowers from '@/public/flowers.jpg'
import { useFocus } from '@/lib/use-focus'
import { BgImage as BgImageType } from '@/lib/types'
import { cn } from '@/lib/utils'

const getBgImage = (image: BgImageType) => {
  switch (image) {
    case 'sky':
      return bgSky
    case 'space':
      return bgSpace
    case 'train':
      return bgTrain
    case 'flowers':
      return bgFlowers
  }
}

export const BgImage = () => {
  const {
    settings: { bgImage: backgoundImage }
  } = useFocus()

  return (
    <div className="fixed w-full h-full bg-zinc-950 blur-lg pointer-events-none z-[-1]">
      <Image
        key={backgoundImage}
        src={getBgImage(backgoundImage)}
        alt="Focus background image"
        className={cn(
          'w-full h-full opacity-60 object-cover',
          backgoundImage === 'sky' ? 'object-bottom' : 'object-center'
        )}
        priority={false}
      />
    </div>
  )
}
