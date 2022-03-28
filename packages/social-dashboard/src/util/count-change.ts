import { Use } from './function-context/context'

type CountChangeType = 'up' | 'down' | 'none'

const countChangeIcon: Record<CountChangeType, string> = {
  up: '⏶',
  down: '⏷',
  none: '⏵',
}

type GetCountChangeType = (count: number) => CountChangeType

interface CountChange {
  icon: string
  type: CountChangeType
}

type GetCountChange = (count: number) => CountChange

export const useGetCountChange: Use<GetCountChange> = () => {
  const getCountChangeType: GetCountChangeType = (count) => {
    return count === 0 ? 'none' : count > 0 ? 'up' : 'down'
  }

  const getCountChange: GetCountChange = (count) => {
    const type = getCountChangeType(count)
    return { icon: countChangeIcon[type], type }
  }

  return getCountChange
}
