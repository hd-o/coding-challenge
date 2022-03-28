import { useImmutableMap } from '/src/pkg/immutable/Map'
import { useImmutableRecord } from '/src/pkg/immutable/Record'
import { useRxBehaviorSubject } from '/src/pkg/rx/BehaviorSubject'
import { mockSocialStats, SocialStatsEntry } from '/src/util/mocks/social-stats'
import { Map, RecordOf } from 'immutable'
import { BehaviorSubject } from 'rxjs'
import { SocialFollowerStats } from '../'
import { Use } from '../../../util/function-context/context'

export interface SocialStatsState {
  followers: Map<string, SocialFollowerStats>
}

type SocialStats$ = BehaviorSubject<RecordOf<SocialStatsState>>

export const useSocialStatsSubject: Use<SocialStats$> = (resolve) => {
  const BehaviorSubject = resolve(useRxBehaviorSubject)
  const Map = resolve(useImmutableMap)
  const Record = resolve(useImmutableRecord)

  const FollowerStatsRecord = Record<SocialFollowerStats>({
    network: '',
    username: 'nathanf',
    followerCount: 0,
    dayCountChange: 0,
  })

  const socialStatsEntryValueToFollowerRecord =
    ([key, value]: SocialStatsEntry): [typeof key, RecordOf<typeof value>] => (
      [key, FollowerStatsRecord(value)]
    )

  const SocialStatsRecord = Record<SocialStatsState>({
    followers: Map(mockSocialStats.map(socialStatsEntryValueToFollowerRecord)),
  })

  return new BehaviorSubject(SocialStatsRecord())
}
