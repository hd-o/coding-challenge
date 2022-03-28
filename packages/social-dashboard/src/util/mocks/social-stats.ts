import { SocialFollowerStats, SocialOverviewStats } from '/src/social/stats'

export type SocialStatsEntry = [string, SocialFollowerStats]

export const mockSocialStats: SocialStatsEntry[] = [
  ['1', {
    network: 'facebook',
    dayCountChange: 12,
    followerCount: 1987,
    username: '@nathanf',
  }],
  ['2', {
    network: 'twitter',
    dayCountChange: 99,
    followerCount: 1044,
    username: '@nathanf',
  }],
  ['3', {
    network: 'instagram',
    dayCountChange: 1099,
    followerCount: 11000,
    username: '@realnathanf',
  }],
  ['4', {
    network: 'youtube',
    dayCountChange: -144,
    followerCount: 8239,
    username: 'Nathan F.',
  }],
]

export type SocialOverviewEntry = [string, SocialOverviewStats]

export const mockSocialOverview: SocialOverviewEntry[] = [
  ['1', {
    dayCountChange: 3,
    network: 'facebook',
    statCount: 87,
    statTitle: 'pageViews',
  }],
  ['2', {
    dayCountChange: -2,
    network: 'facebook',
    statCount: 52,
    statTitle: 'likes',
  }],
  ['3', {
    dayCountChange: 2257,
    network: 'instagram',
    statCount: 5462,
    statTitle: 'likes',
  }],
  ['4', {
    dayCountChange: 1375,
    network: 'instagram',
    statCount: 52000,
    statTitle: 'profileViews',
  }],
  ['5', {
    dayCountChange: 303,
    network: 'twitter',
    statCount: 117,
    statTitle: 'retweets',
  }],
  ['6', {
    dayCountChange: 553,
    network: 'twitter',
    statCount: 507,
    statTitle: 'likes',
  }],
  ['7', {
    dayCountChange: -19,
    network: 'youtube',
    statCount: 107,
    statTitle: 'likes',
  }],
  ['8', {
    dayCountChange: -12,
    network: 'youtube',
    statCount: 1407,
    statTitle: 'totalViews',
  }],
]
