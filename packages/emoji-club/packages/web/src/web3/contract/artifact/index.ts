import EmojiClub from '/../ethereum/artifacts/contracts/EmojiClub.sol/EmojiClub.json'
import { Use } from '/src/util/function-context/context'

export const useWeb3ContractArtifact: Use<typeof EmojiClub> = () => EmojiClub
