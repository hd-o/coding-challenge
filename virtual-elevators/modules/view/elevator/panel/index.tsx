import { Button } from 'antd'
import { createContext, useContext } from 'react'
import { NestedCSSProperties } from 'typestyle/lib/types'
import { AntdRowCtx } from '~/view/pkg/antd/row'
import { TypeStyleClassesCtx } from '~/view/pkg/typestyle/classes'
import { StateCtx } from '~/view/state'
import { useStyle } from '~/view/util/useStyle'
import { elevatorRowStyle } from '../row/style'

const row = (): NestedCSSProperties => ({
  borderLeftWidth: 1,
  borderBottomWidth: 1,
  justifyContent: 'space-between',
  padding: '0 30px 2px'
})

/** Internal elevator buttons */
function ElevatorPanel (): JSX.Element {
  const Row = useContext(AntdRowCtx)

  const state = useContext(StateCtx)
  const classes = useContext(TypeStyleClassesCtx)

  const rowClass = classes(
    useStyle(elevatorRowStyle, state.settings),
    useStyle(row))

  return (
    <Row className={rowClass}>
      {state.floors.map((floor) => (
        <Button shape="circle" key={floor.id}>
          {floor.number}
        </Button>
      ))}
    </Row>
  )
}

export const ElevatorPanelCtx = createContext(ElevatorPanel)
