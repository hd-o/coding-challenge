import { OrderState, useOrderState } from '/src/util/use-order-state'
import { useResolvedStream } from '/src/util/use-resolved-stream'
import { useSocialOverviewSubject } from '../subject'

export const useSocialOverviewOrderState = (): OrderState => {
  const socialOverview = useResolvedStream(useSocialOverviewSubject)
  return useOrderState({
    cookieName: 'app-social-overview-order',
    ids: socialOverview.statsMap.keySeq().toArray(),
  })
}
