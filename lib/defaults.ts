import { FocusPeriod, Project } from './types'

export const colors = [
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

export const defaultProjects = [
  {
    id: '1',
    name: 'Project 1',
    color: colors[0]
  },
  {
    id: '2',
    name: 'Project 2',
    color: colors[1]
  },
  {
    id: '3',
    name: 'Project 3',
    color: colors[8]
  },
  {
    id: '4',
    name: 'Project 4',
    color: colors[3]
  },
  {
    id: '5',
    name: 'Project 5',
    color: colors[4],
    isArchived: true
  }
] satisfies Project[]

export const defaultFocusPeriods = [
  {
    id: '1',
    periodStart: '2024-04-29',
    periodEnd: '2024-05-06',
    projects: [
      {
        projectId: '3',
        focus: 90
      },
      {
        projectId: '4',
        focus: 10
      }
    ]
  },
  {
    id: '2',
    periodStart: '2024-05-06',
    projects: [
      {
        projectId: '4',
        focus: 60
      },
      {
        projectId: '1',
        focus: 10
      },
      {
        projectId: '3',
        focus: 30
      }
    ]
  },
  {
    id: '3',
    periodStart: '2024-05-13',
    projects: [
      {
        projectId: '1',
        focus: 70
      },
      {
        projectId: '2',
        focus: 30
      }
    ]
  },
  {
    id: '4',
    periodStart: '2024-05-20',
    projects: [
      {
        projectId: '3',
        focus: 50
      },
      {
        projectId: '4',
        focus: 50
      }
    ]
  }
] satisfies FocusPeriod[]
