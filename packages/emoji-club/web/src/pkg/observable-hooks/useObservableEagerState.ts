import { Use } from '/src/util/function-context/context'
import { useObservableEagerState } from 'observable-hooks'

type U = Use<typeof useObservableEagerState>

export const useObservableHooksUseObservableEagerState: U = () => useObservableEagerState
