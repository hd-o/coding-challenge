import { Subscription } from 'rxjs'
import { useElevatorPositionPair$ } from '../elevator/position/pair/stream'
import { useElevatorPositionPair$Proxy } from '../elevator/position/pair/stream/proxy'
import { useElevatorQueuePair$ } from '../elevator/queue/pair/stream'
import { useElevatorQueuePair$Proxy } from '../elevator/queue/pair/stream/proxy'
import { resolve, Use } from '../util/resolve'

type Startup = () => Subscription

export const useStartup: Use<Startup> = (container) => {
  const elevatorQueuePair$ = resolve(container)(useElevatorQueuePair$)
  const elevatorQueuePair$Proxy = resolve(container)(useElevatorQueuePair$Proxy)
  const elevatorPositionPair$ = resolve(container)(useElevatorPositionPair$)
  const elevatorPositionPair$Proxy = resolve(container)(useElevatorPositionPair$Proxy)

  const startup = (): Subscription => {
    const modelSub = new Subscription()
    modelSub.add(elevatorQueuePair$.subscribe(elevatorQueuePair$Proxy))
    modelSub.add(elevatorPositionPair$.subscribe(elevatorPositionPair$Proxy))
    return modelSub
  }

  return startup
}
