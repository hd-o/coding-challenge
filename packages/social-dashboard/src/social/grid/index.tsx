import { DraggableSortableContainer } from '/src/draggable/sortable/container'
import { draggableTypes } from '/src/draggable/types'
import { useResolvedStream } from '/src/util/use-resolved-stream'
import { FC } from 'react'
import { Grid } from '@mui/material'
import { SocialCard } from '../card'
import { SocialFollowerStats } from '../stats'
import { useSocialStatsSubject } from '../stats/subject'
import { useSocialGridOrderState } from './order'

export const SocialGrid: FC = () => {
  const stats = useResolvedStream(useSocialStatsSubject)
  const [cardIdsOrder, setCardIdsOrder] = useSocialGridOrderState()

  return (
    <DraggableSortableContainer
      draggableType={draggableTypes.card}
      idsOrder={cardIdsOrder}
      setIdsOrder={setCardIdsOrder}
      ChildComponent={(props) => {
        const followerStats = stats.followers.get(props.id) as SocialFollowerStats
        return (
          <Grid item
            ref={node => props.target(node)}
            sx={{ opacity: props.isDragging ? 0.4 : 1 }}
            md={3} sm={6} xs={12}
          >
            <SocialCard id={props.id} stats={followerStats} />
          </Grid>
        )
      }}
      ParentComponent={(props) => (
        <Grid ref={props.target} container rowSpacing={4} columnSpacing={4} marginTop={1}>
          {props.children}
        </Grid>
      )}
    />
  )
}
