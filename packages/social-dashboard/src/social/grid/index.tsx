import { DraggableSortableContainerCtx } from '/src/draggable/sortable/container'
import { draggableTypes } from '/src/draggable/types'
import { MuiGridCtx } from '/src/pkg/mui/Grid'
import { useResolvedStream } from '/src/util/use-resolved-stream'
import { createContext, FC, useContext } from 'react'
import { SocialCardCtx } from '../card'
import { SocialFollowerStats } from '../stats'
import { useSocialStatsSubject } from '../stats/subject'
import { useSocialGridOrderState } from './order'

const SocialGrid: FC = () => {
  const DraggableSortableContainer = useContext(DraggableSortableContainerCtx)
  const Grid = useContext(MuiGridCtx)
  const SocialCard = useContext(SocialCardCtx)

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

export const SocialGridCtx = createContext(SocialGrid)
