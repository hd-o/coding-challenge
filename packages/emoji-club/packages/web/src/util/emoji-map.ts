import { from, Observable, shareReplay, startWith } from 'rxjs'
import { useFetchJSON } from './fetch-json'
import { Use } from './function-context/context'

type EmojiUnicode = string
type EmojiName = string
type EmojiMetadata = [EmojiUnicode, EmojiName]
/**
 * [Array Index] to EmojiMetadata.
 * EmojiClub contract allows mining Emoji NFTs, and
 * assigns a number (index) to each NFT, which then
 * maps to an index in this EmojiMap array
 */
type EmojiMap = EmojiMetadata[]
type EmojiMap$ = Observable<EmojiMap>

const pinataPath = 'https://gateway.pinata.cloud/'
const emojiMapPath = 'ipfs/QmSTYHieoBkiwuj88A6v4Nsd4s3jFd6aXNczNDUn945tk1'
const fetchPath = `${pinataPath}${emojiMapPath}`

const fetchOptions: RequestInit = {
  cache: 'force-cache',
}

export const useEmojiMap: Use<EmojiMap$> = (resolve) => {
  const fetchJSON = resolve(useFetchJSON)
  const emojiMapFetch = fetchJSON<EmojiMap>(fetchPath, fetchOptions).catch(() => [])
  return from(emojiMapFetch).pipe(
    shareReplay(1),
    startWith([])
  )
}
