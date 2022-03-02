import { Subscription } from 'rxjs'
import { useElevatorPositionPair$ } from '../elevator/position/pair/stream'
import { useElevatorPositionPair$Proxy } from '../elevator/position/pair/stream/proxy'
import { useElevatorQueuePair$ } from '../elevator/queue/pair/stream'
import { useElevatorQueuePair$Proxy } from '../elevator/queue/pair/stream/proxy'
import { Use } from '../util/resolve'

type Startup = () => Subscription

export const useStartup: Use<Startup> = (resolve) => {
  const elevatorQueuePair$ = resolve(useElevatorQueuePair$)
  const elevatorQueuePair$Proxy = resolve(useElevatorQueuePair$Proxy)
  const elevatorPositionPair$ = resolve(useElevatorPositionPair$)
  const elevatorPositionPair$Proxy = resolve(useElevatorPositionPair$Proxy)

  const startup = (): Subscription => {
    const modelSub = new Subscription()
    modelSub.add(elevatorQueuePair$.subscribe(elevatorQueuePair$Proxy))
    modelSub.add(elevatorPositionPair$.subscribe(elevatorPositionPair$Proxy))
    return modelSub
  }

  return startup
}
