import { SSRActivePeriod } from './ssr-active-period'

export default function Page() {
  const focusPeriodProjects = {
    id: '1',
    isActive: true,
    start: '2022-01-01',
    end: '2022-01-02',
    projects: [
      {
        id: '1',
        name: 'Studio',
        color: '#FF0000',
        isArchived: false,
        isDeleted: false,
        focus: 50
      },
      {
        id: '2',
        name: 'Home',
        color: '#00FF00',
        isArchived: false,
        isDeleted: false,
        focus: 50
      }
    ]
  }

  return (
    <>
      <SSRActivePeriod focusPeriodProjects={focusPeriodProjects} />
    </>
  )
}
