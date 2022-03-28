import { useImmutableMap } from '/src/pkg/immutable/Map'
import { useImmutableRecord } from '/src/pkg/immutable/Record'
import { useRxBehaviorSubject } from '/src/pkg/rx/BehaviorSubject'
import { Use } from '/src/util/function-context/context'
import { mockSocialOverview, SocialOverviewEntry } from '/src/util/mocks/social-stats'
import { Map, RecordOf } from 'immutable'
import { BehaviorSubject } from 'rxjs'
import { SocialOverviewStats } from '../../stats'

interface SocialOverviewState {
  statsMap: Map<string, SocialOverviewStats>
}

type SocialStats$ = BehaviorSubject<RecordOf<SocialOverviewState>>

export const useSocialOverviewSubject: Use<SocialStats$> = (resolve) => {
  const BehaviorSubject = resolve(useRxBehaviorSubject)
  const Map = resolve(useImmutableMap)
  const Record = resolve(useImmutableRecord)

  const OverviewStatsRecord = Record<SocialOverviewStats>({
    dayCountChange: 0,
    network: '',
    statCount: 0,
    statTitle: 'likes',
  })

  const socialStatsEntryValueToOverviewRecord =
    ([key, value]: SocialOverviewEntry): [typeof key, RecordOf<typeof value>] => (
      [key, OverviewStatsRecord(value)]
    )

  const SocialOverviewRecord = Record<SocialOverviewState>({
    statsMap: Map(mockSocialOverview.map(socialStatsEntryValueToOverviewRecord)),
  })

  return new BehaviorSubject(SocialOverviewRecord())
}
