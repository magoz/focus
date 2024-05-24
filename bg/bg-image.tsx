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
    settings: { bgImage }
  } = useFocus()

  return (
    <div className="fixed w-full h-full bg-zinc-950 pointer-events-none z-[-1]">
      <Image
        key={bgImage}
        src={getBgImage(bgImage)}
        alt="Focus background image"
        className={cn(
          'w-full h-full object-cover',
          bgImage === 'sky' ? 'object-bottom' : 'object-center',
          'opacity-60 blur-lg'
        )}
        priority={false}
      />
    </div>
  )
}

// export const BgImage = () => {
//   const {
//     settings: { bgImage }
//   } = useFocus()
//
//   return (
//     <div
//       className={cn(
//         'fixed w-full h-full bg-zinc-950 pointer-events-none z-[-1] bg-cover bg-no-repeat',
//         bgImage === 'sky' ? 'bg-bottom' : 'bg-center',
//         'opacity-60 blur-lg'
//       )}
//       style={{ backgroundImage: `url(/${bgImage}.jpg)` }}
//     ></div>
//   )
// }
