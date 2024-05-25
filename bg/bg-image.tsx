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

// export const BgImage = () => {
//   const {
//     settings: { bgImage }
//   } = useFocus()
//
//   return (
//     <div className="fixed top-0 left-0 w-full h-full bg-zinc-950 pointer-events-none">
//       <Image
//         key={bgImage}
//         src={bgTrain}
//         alt="Focus background image"
//         className="w-full h-auto object-cover object-center"
//         quality={100}
//         // className="w-full h-full object-cover opacity-60 blur-lg"
//         // className={cn(
//         //   'w-full h-full object-cover opacity-60 blur-lg'
//         //   // bgImage === 'sky' ? 'object-bottom' : 'object-center',
//         //   // 'opacity-10 blur-lg'
//         // )}
//       />
//     </div>
//   )
// }

export const BgImage = () => {
  const {
    settings: { bgImage }
  } = useFocus()

  return (
    <div className="fixed top-0 left-0 h-full w-full bg-zinc-950">
      <div
        className="fixed top-0 left-0 w-full h-full"
        style={{
          backgroundImage: `url(/${bgImage}.jpg)`,
          backgroundPosition: bgImage === 'sky' ? '50% bottom' : '50% center',
          backgroundSize: 'cover',
          opacity: '0.6',
          filter: 'blur(16px)'
          // zIndex: -10
        }}
      />
    </div>
  )
}
