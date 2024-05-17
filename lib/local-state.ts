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

export const pickRandomColor = () => pickRandom(colors)

export const projectsAtom = atomWithStorage<Project[]>(
  'projects',
  [
    {
      id: '1',
      name: 'Project 1',
      status: 'ACTIVE',
      focus: 30,
      color: colors[0]
    },
    {
      id: '2',
      name: 'Project 2',
      status: 'ACTIVE',
      focus: 30,
      color: colors[1]
    },
    {
      id: '3',
      name: 'Project 3',
      status: 'ACTIVE',
      focus: 30,
      color: colors[2]
    },
    {
      id: '4',
      name: 'Project 4',
      status: 'INACTIVE',
      focus: 10,
      color: colors[3]
    }
  ],
  undefined,
  { getOnInit: true }
)

export const focusPeriodsAtom = atomWithStorage<FocusPeriod[]>(
  'focus-periods',
  [
    {
      periodStart: '2021-01-01',
      projects: [
        {
          projectId: '1',
          focus: 30
        },
        {
          projectId: '2',
          focus: 70
        }
      ]
    }
  ],
  undefined,
  { getOnInit: true }
)
