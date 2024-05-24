import { FocusApp, Period, Project } from './types'

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

export const defaultProjects = [
  {
    id: '1',
    name: 'Studio',
    color: colors[0],
    isArchived: false,
    isDeleted: false
  },
  {
    id: '2',
    name: 'Home',
    color: colors[1],
    isArchived: false,
    isDeleted: false
  },
  {
    id: '3',
    name: 'Secret Project',
    color: colors[8],
    isArchived: false,
    isDeleted: false
  },
  {
    id: '4',
    name: 'Admin',
    color: colors[3],
    isArchived: false,
    isDeleted: false
  },
  {
    id: '5',
    name: 'R&D',
    color: colors[4],
    isArchived: false,
    isDeleted: false
  }
] satisfies Project[]

export const defaultFocusPeriods = [
  {
    id: '1',
    start: '2024-04-29',
    end: '2024-05-06',
    isActive: true,
    projects: [
      {
        id: '3',
        focus: 90
      },
      {
        id: '4',
        focus: 10
      }
    ]
  },
  {
    id: '2',
    start: '2024-05-06',
    end: '2024-05-13',
    isActive: false,
    projects: [
      {
        id: '4',
        focus: 60
      },
      {
        id: '1',
        focus: 10
      },
      {
        id: '3',
        focus: 30
      }
    ]
  },
  {
    id: '3',
    start: '2024-05-13',
    end: '2024-05-20',
    isActive: false,
    projects: [
      {
        id: '1',
        focus: 70
      },
      {
        id: '2',
        focus: 30
      }
    ]
  },
  {
    id: '4',
    start: '2024-05-20',
    end: '2024-05-27',
    isActive: false,
    projects: [
      {
        id: '3',
        focus: 50
      },
      {
        id: '4',
        focus: 50
      }
    ]
  }
] satisfies Period[]

export const focusAppDefaults = {
  projects: defaultProjects,
  periods: defaultFocusPeriods,
  settings: {
    colors,
    bgImage: 'sky'
  }
} satisfies FocusApp
