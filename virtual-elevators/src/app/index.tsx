import 'reflect-metadata'
import 'regenerator-runtime/runtime'
import { FC, useContext } from 'react'
import { NestedCSSProperties } from 'typestyle/lib/types'
import { ElevatorCallerRowsCtx } from '../elevator/caller/rows'
import { ElevatorContainerCtx } from '../elevator/container'
import { AntdColCtx } from '../pkg/antd/col'
import { AntdRowCtx } from '../pkg/antd/row'
import { useStyle } from '../util/useStyle'

const appContainer = (): NestedCSSProperties => ({
  $debugName: 'app-container',
  padding: 20,
  height: '100%',
  width: '100%',
  margin: '0 auto',
  maxWidth: 650,
  minWidth: 500,
})

const row = (): NestedCSSProperties => ({
  $debugName: 'app-row',
  borderTopWidth: 1,
  borderRightWidth: 1,
})

interface Props {
  /** Elements required by UI tests */
  TestCtrl?: FC
}

export function App (props: Props): JSX.Element {
  const { TestCtrl = () => null } = props
  const Col = useContext(AntdColCtx)
  const ElevatorCallers = useContext(ElevatorCallerRowsCtx)
  const ElevatorContainer = useContext(ElevatorContainerCtx)
  const Row = useContext(AntdRowCtx)

  return (
    <div className={useStyle(appContainer)}>
      <Row className={useStyle(row)}>
        <Col span={6}>
          <ElevatorCallers />
        </Col>
        <ElevatorContainer />
      </Row>
      <TestCtrl />
    </div>
  )
}
