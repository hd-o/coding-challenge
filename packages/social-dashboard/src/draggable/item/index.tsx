import { createContext, FC } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { DraggableType } from '../types'

export type DraggableItemChild = FC<{
  id: string
  isDragging: boolean
  target: (node: HTMLElement | null) => void
}>

interface Props {
  ChildComponent: DraggableItemChild
  draggableType: DraggableType
  getItemIndex: (id: string) => number
  id: string
  moveItem: (id: string, to: number) => void
}

interface Item {
  id: string
  originalIndex: number
}

const DraggableItem: FC<Props> = (props) => {
  const { ChildComponent } = props

  const originalIndex = props.getItemIndex(props.id)

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: props.draggableType,
      item: {
        id: props.id,
        originalIndex,
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        if (monitor.didDrop()) return
        props.moveItem(item.id, item.originalIndex)
      },
    }),
    [props.id, originalIndex, props.moveItem],
  )

  const [, drop] = useDrop(
    () => ({
      accept: props.draggableType,
      hover: (item: Item) => {
        if (item.id === props.id) return
        props.moveItem(item.id, props.getItemIndex(props.id))
      },
    }),
    [props.getItemIndex, props.moveItem],
  )

  return (
    <ChildComponent
      id={props.id}
      isDragging={isDragging}
      target={(node) => drag(drop(node))}
    />
  )
}

export const DraggableItemCtx = createContext(DraggableItem)
