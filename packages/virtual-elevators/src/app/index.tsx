import 'reflect-metadata'
import 'regenerator-runtime/runtime'
import { Col, Row } from 'antd'
import { FC } from 'react'
import { NestedCSSProperties } from 'typestyle/lib/types'
import { ElevatorContainer } from '../elevator/container'
import { FloorContainer } from '../floor/container'
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
