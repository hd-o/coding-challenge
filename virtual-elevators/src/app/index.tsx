import 'reflect-metadata'
import 'regenerator-runtime/runtime'
import { FC, useContext } from 'react'
import { NestedCSSProperties } from 'typestyle/lib/types'
import { ElevatorContainerCtx } from '../elevator/container'
import { FloorContainerCtx } from '../floor/container'
import { AntdColCtx } from '../pkg/antd/col'
import { AntdRowCtx } from '../pkg/antd/row'
import { useStyle } from '../util/useStyle'

const appContainer = (): NestedCSSProperties => ({
  $debugName: 'app-container',
  padding: 20,
  height: '100%',
  width: 650,
  margin: '0 auto',
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
  const FloorContainer = useContext(FloorContainerCtx)
  const ElevatorContainer = useContext(ElevatorContainerCtx)
  const Row = useContext(AntdRowCtx)

  return (
    <div className={useStyle(appContainer)}>
      <Row className={useStyle(row)}>
        <Col span={6}>
          <FloorContainer />
        </Col>
        <ElevatorContainer />
      </Row>
      <TestCtrl />
    </div>
  )
}
