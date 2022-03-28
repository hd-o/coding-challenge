import { OrderState, useOrderState } from '/src/util/use-order-state'
import { useResolvedStream } from '/src/util/use-resolved-stream'
import { useSocialStatsSubject } from '../../stats/subject'

export const useSocialGridOrderState = (): OrderState => {
  const socialStats = useResolvedStream(useSocialStatsSubject)
  return useOrderState({
    cookieName: 'app-social-grid-order',
    ids: socialStats.followers.keySeq().toArray(),
  })
}
