import update from 'immutability-helper'
import { FC, useCallback } from 'react'
import { ConnectDropTarget, useDrop } from 'react-dnd'
import { DraggableItem, DraggableItemChild } from '../../item'
import { DraggableType } from '../../types'

interface Props {
  ChildComponent: DraggableItemChild
  ParentComponent: FC<{ target: ConnectDropTarget }>
  draggableType: DraggableType
  idsOrder: string[]
  setIdsOrder: (idsOrder: string[]) => void
}

export const DraggableSortableContainer: FC<Props> = (props) => {
  const { idsOrder, setIdsOrder, ParentComponent } = props

  const getItemIndex = useCallback(
    (id: string) => idsOrder.indexOf(id),
    [idsOrder],
  )

  const moveItem = useCallback(
    (id: string, toIndex: number) => {
      setIdsOrder(
        update(idsOrder, {
          $splice: [
            [idsOrder.indexOf(id), 1],
            [toIndex, 0, id],
          ],
        }),
      )
    },
    [idsOrder, setIdsOrder],
  )

  const [, drop] = useDrop(() => ({
    accept: props.draggableType,
  }))

  return (
    <ParentComponent target={drop}>
      {
        idsOrder.map((id) => (
          <DraggableItem
            key={id}
            id={id}
            draggableType={props.draggableType}
            moveItem={moveItem}
            getItemIndex={getItemIndex}
            ChildComponent={props.ChildComponent}
          />
        ))
      }
    </ParentComponent>
  )
}
