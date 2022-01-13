import { Button } from 'antd'
import { createContext, useContext } from 'react'
import { NestedCSSProperties } from 'typestyle/lib/types'
import { IFloor } from '~/floor/model'
import { Floors$Ctx } from '~/floors/stream'
import { AntdRowCtx } from '~/pkg/antd/row'
import { TypeStyleClassesCtx } from '~/pkg/typestyle/classes'
import { Settings$Ctx } from '~/settings/stream'
import { useStreamCtx } from '~/util/useStreamCtx'
import { useStyle } from '~/util/useStyle'
import { elevatorRowStyle } from '../row/style'

const row = (): NestedCSSProperties => ({
  borderLeftWidth: 1,
  borderBottomWidth: 1,
  justifyContent: 'space-between',
  padding: '0 30px 2px'
})

interface Props {
  // queue: Elevator['queue']
  onClick: (floor: IFloor) => void
}

/** Internal elevator buttons */
function ElevatorPanel (props: Props): JSX.Element {
  const Row = useContext(AntdRowCtx)

  const settings = useStreamCtx(Settings$Ctx)
  const floors = useStreamCtx(Floors$Ctx)
  const classes = useContext(TypeStyleClassesCtx)

  const rowClass = classes(
    useStyle(elevatorRowStyle, settings),
    useStyle(row))

  return (
    <Row className={rowClass}>
      {floors.map((floor) => (
        <Button
          key={floor.number}
          onClick={() => props.onClick(floor)}
          shape="circle"
          // type={props.queue.includes(floor) ? 'primary' : 'default'}
        >
          {floor.number}
        </Button>
      ))}
    </Row>
  )
}

export const ElevatorPanelCtx = createContext(ElevatorPanel)
