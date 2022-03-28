import { Record } from 'immutable'
import { Use } from '../../util/function-context/context'

export const useImmutableRecord: Use<typeof Record> = () => Record
