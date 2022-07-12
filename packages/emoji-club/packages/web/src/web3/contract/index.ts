import { EmojiClub } from '/../ethereum/typechain/EmojiClub'
import { useEthersContract } from '/src/pkg/ethers/Contract'
import { useRxOf } from '/src/pkg/rxjs/of'
import { useRxShareReplay } from '/src/pkg/rxjs/shareReplay'
import { useRxStartWith } from '/src/pkg/rxjs/startWith'
import { useRxSwitchMap } from '/src/pkg/rxjs/switchMap'
import { Use } from '/src/util/function-context/context'
import { Observable } from 'rxjs'
import { Web3Error, web3Errors } from '../errors'
import { useWeb3Provider$ } from '../provider'
import { useWeb3ContractAddress } from './address'
import { useWeb3ContractArtifact } from './artifact'

interface ContractState {
  contract?: EmojiClub
  error?: Web3Error
}

const initialState: ContractState = {}

type Contract$ = Observable<ContractState>

export const useWeb3Contract: Use<Contract$> = (resolve) => {
  const artifact = resolve(useWeb3ContractArtifact)
  const contractAddress = resolve(useWeb3ContractAddress)
  const Contract = resolve(useEthersContract)
  const of = resolve(useRxOf)
  const provider$ = resolve(useWeb3Provider$)
  const shareReplay = resolve(useRxShareReplay)
  const startWith = resolve(useRxStartWith)
  const switchMap = resolve(useRxSwitchMap)

  return provider$.pipe(
    switchMap(({ provider }) => {
      if (provider === undefined) return of(initialState)
      try {
        const signer = provider.getSigner()
        const contract = new Contract(contractAddress, artifact.abi, signer)
        return of({ contract: contract as EmojiClub })
      } catch (data) {
        const error = { ...web3Errors.failedContractCreation, data }
        return of({ error })
      }
    }),
    shareReplay(1),
    startWith(initialState),
  )
}
