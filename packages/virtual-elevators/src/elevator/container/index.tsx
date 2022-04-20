import { useElevator$ } from '/src/elevator/stream'
import { useStream } from '/src/util/useStream'
import { Col } from 'antd'
import { Elevator } from '../'

export function ElevatorContainer (): JSX.Element {
  const elevators = useStream(useElevator$())
  return (
    <>
      {elevators.valueSeq().map((elevator$, index) => (
        <Col key={elevator$.value.id} span={6}>
          <Elevator index={index} elevator$={elevator$} />
        </Col>
      ))}
    </>
  )
}
