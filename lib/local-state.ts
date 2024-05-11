import { atomWithStorage } from 'jotai/utils'
import { createId } from '@paralleldrive/cuid2'

const colors = [
  '#009E49',
  '#2A78EC',
  '#A52800',
  '#A5003C',
  '#D74D11',
  '#313131',
  '#009BA5',
  '#CA00EB',
  '#A67B6E',
  '#DF7A03',
  '#FF7151',
  '#0024A5',
  '#787878',
  '#792D15'
]

const pickRandom = <T>(array: T[]): T => {
  const randomIndex = Math.floor(Math.random() * array.length)
  const randomItem = array[randomIndex]
  if (!randomItem) throw new Error('Array is empty')
  return randomItem
}

const pickRandomColor = () => pickRandom(colors)

export const projectsAtom = atomWithStorage<Project[]>(
  'projects',
  [
    {
      id: createId(),
      name: 'Project 1',
      status: 'ACTIVE',
      focus: 50,
      color: pickRandomColor()
    },
    {
      id: createId(),
      name: 'Project 2',
      status: 'ACTIVE',
      focus: 20,
      color: pickRandomColor()
    },
    {
      id: createId(),
      name: 'Project 3',
      status: 'ACTIVE',
      focus: 50,
      color: pickRandomColor()
    }
  ],
  undefined,
  {
    getOnInit: true
  }
)
