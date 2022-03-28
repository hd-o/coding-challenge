import { SocialNetwork } from '../'
import { Use } from '../../../util/function-context/context'

const socialNetworkColors: Record<SocialNetwork, string> = {
  facebook: 'hsl(208, 92%, 53%)',
  twitter: 'hsl(203, 89%, 53%)',
  instagram: 'linear-gradient(90deg, hsl(37, 97%, 70%), hsl(329, 70%, 58%))',
  youtube: 'hsl(348, 97%, 39%)',
  '': 'transparent',
}

export const useSocialNetworkColors: Use<typeof socialNetworkColors> = () => socialNetworkColors
