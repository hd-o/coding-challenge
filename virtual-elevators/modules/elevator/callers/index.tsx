import { Button } from 'antd'
import { createContext, useContext } from 'react'
import { NestedCSSProperties } from 'typestyle/lib/types'
import { Floor$Ctx } from '~/floor/stream'
import { AntdRowCtx } from '~/pkg/antd/row'
import { TypeStyleClassesCtx } from '~/pkg/typestyle/classes'
import { Settings$Ctx } from '~/settings/stream'
import { useStreamCtx } from '~/util/useStreamCtx'
import { useStyle } from '~/util/useStyle'
import { ElevatorCtrlCtx } from '../controller'
import { elevatorRowStyle } from '../row/style'

const cell = (): NestedCSSProperties => ({
  $debugName: 'elevator-caller-cell',
  borderBottomWidth: 1,
  borderLeftWidth: 1
})

function ElevatorCallers (): JSX.Element {
  const Row = useContext(AntdRowCtx)

  const elevatorCtrl = useContext(ElevatorCtrlCtx)
  const floors = useStreamCtx(Floor$Ctx)
  const settings = useStreamCtx(Settings$Ctx)
  const classes = useContext(TypeStyleClassesCtx)

  const cellClass = classes(
    useStyle(elevatorRowStyle, settings),
    useStyle(cell))

  return (
    <>
      {floors.slice().reverse().map((floor) => (
        <Row className={cellClass} key={floor.number}>
          <Button
            onClick={() => elevatorCtrl.requestElevatorTo(floor)}
            shape="circle"
          >
            {floor.number}
          </Button>
        </Row>
      ))}
    </>
  )
}

export const ElevatorCallersCtx = createContext(ElevatorCallers)
