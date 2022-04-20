import { DraggableSortableContainer } from '/src/draggable/sortable/container'
import { draggableTypes } from '/src/draggable/types'
import { useResolvedStream } from '/src/util/use-resolved-stream'
import { FC } from 'react'
import { Grid } from '@mui/material'
import { SocialOverviewStats } from '../../stats'
import { SocialOverviewCard } from '../card'
import { useSocialOverviewOrderState } from '../order'
import { useSocialOverviewSubject } from '../subject'

export const SocialOverviewGrid: FC = () => {
  const socialOverview = useResolvedStream(useSocialOverviewSubject)
  const [cardIdsOrder, setCardIdsOrder] = useSocialOverviewOrderState()

  return (
    <DraggableSortableContainer
      draggableType={draggableTypes.overviewCard}
      idsOrder={cardIdsOrder}
      setIdsOrder={setCardIdsOrder}
      ChildComponent={(props) => {
        const stats = socialOverview.statsMap.get(props.id) as SocialOverviewStats
        return (
          <Grid item
            ref={node => props.target(node)}
            sx={{ opacity: props.isDragging ? 0.4 : 1 }}
            xs={12} sm={6} md={3}
          >
            <SocialOverviewCard id={props.id} stats={stats} />
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
