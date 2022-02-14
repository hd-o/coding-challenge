import { Subscription } from 'rxjs'
import { useElevatorPositionPair$ } from '../elevator/position/pair/stream'
import { useElevatorPositionPair$Proxy } from '../elevator/position/pair/stream/proxy'
import { useElevatorQueuePair$ } from '../elevator/queue/pair/stream'
import { useElevatorQueuePair$Proxy } from '../elevator/queue/pair/stream/proxy'
import { FnCtor } from '../function/container'

type Startup = () => Subscription

export const useStartup: FnCtor<Startup> = (container) => {
  const elevatorQueuePair$ = container.resolve(useElevatorQueuePair$)
  const elevatorQueuePair$Proxy = container.resolve(useElevatorQueuePair$Proxy)
  const elevatorPositionPair$ = container.resolve(useElevatorPositionPair$)
  const elevatorPositionPair$Proxy = container.resolve(useElevatorPositionPair$Proxy)

  const startup = (): Subscription => {
    const modelSub = new Subscription()
    modelSub.add(elevatorQueuePair$.subscribe(elevatorQueuePair$Proxy))
    modelSub.add(elevatorPositionPair$.subscribe(elevatorPositionPair$Proxy))
    return modelSub
  }

  return startup
}
