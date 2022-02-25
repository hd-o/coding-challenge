import { NestedCSSProperties } from 'typestyle/lib/types'

export const elevatorRowStyle = (props: {
  floorHeight: number
}): NestedCSSProperties => ({
  $debugName: 'elevator-row',
  height: props.floorHeight,
  background: '#eee',
  alignItems: 'center',
  justifyContent: 'center',
  zoom: 0.9,
  $nest: {
    '&:nth-child(odd)': {
      background: '#ddd',
    },
  },
})
