import { DraggableSortableContainerCtx } from '/src/draggable/sortable/container'
import { draggableTypes } from '/src/draggable/types'
import { MuiGridCtx } from '/src/pkg/mui/Grid'
import { useResolvedStream } from '/src/util/use-resolved-stream'
import { createContext, FC, useContext } from 'react'
import { SocialOverviewStats } from '../../stats'
import { SocialOverviewCardCtx } from '../card'
import { useSocialOverviewOrderState } from '../order'
import { useSocialOverviewSubject } from '../subject'

const SocialOverviewGrid: FC = () => {
  const DraggableSortableContainer = useContext(DraggableSortableContainerCtx)
  const Grid = useContext(MuiGridCtx)
  const SocialOverviewCard = useContext(SocialOverviewCardCtx)

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

export const SocialOverviewGridCtx = createContext(SocialOverviewGrid)
