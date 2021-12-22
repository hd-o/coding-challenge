import { Button } from 'antd'
import { createContext, useContext } from 'react'
import { NestedCSSProperties } from 'typestyle/lib/types'
import { AntdRowCtx } from '~/view/pkg/antd/row'
import { TypeStyleClassesCtx } from '~/view/pkg/typestyle/classes'
import { StateCtx } from '~/view/state'
import { useStyle } from '~/view/util/useStyle'
import { elevatorRowStyle } from '../row/style'

const cell = (): NestedCSSProperties => ({
  $debugName: 'elevator-caller-cell',
  borderBottomWidth: 1,
  borderLeftWidth: 1
})

function ElevatorCallers (): JSX.Element {
  const Row = useContext(AntdRowCtx)

  const state = useContext(StateCtx)
  const classes = useContext(TypeStyleClassesCtx)

  const cellClass = classes(
    useStyle(elevatorRowStyle, state.settings),
    useStyle(cell))

  return (
    <>
      {state.floors.slice().reverse().map((floor) => (
        <Row className={cellClass} key={floor.id}>
          <Button shape="circle">{floor.number}</Button>
        </Row>
      ))}
    </>
  )
}

export const ElevatorCallersCtx = createContext(ElevatorCallers)
