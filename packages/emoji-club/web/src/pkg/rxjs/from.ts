import { Use } from '/src/util/function-context/context'
import { from } from 'rxjs'

export const useRxFrom: Use<typeof from> = () => from
