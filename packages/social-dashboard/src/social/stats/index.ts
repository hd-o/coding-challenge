import { IntlId } from '/src/util/intl-messages'
import { SocialNetwork } from '../network'

export interface SocialFollowerStats {
  /** Follower count change between now and yesterday */
  dayCountChange: number
  followerCount: number
  network: SocialNetwork
  /** Social network username */
  username: string
}

export interface SocialOverviewStats {
  /** Count change between now and yesterday */
  dayCountChange: number
  network: SocialNetwork
  /** @example number of likes, page views */
  statCount: number
  /** @example "Page Views", "Likes" */
  statTitle: IntlId
}
