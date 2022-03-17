import { parse, stringify } from 'envfile'
import { readFileSync, writeFileSync } from 'fs'
import { EmojiClub } from "../typechain";

const webEnvPath = '../web/.env'

export const updateWebEnv = (emojiClub: EmojiClub): void => {
  const envFileContent = readFileSync(webEnvPath, 'utf8')
  const env = parse(envFileContent)

  const envUpdate = stringify({
    ...env,
    HARDHAT_CONTRACT_ADDRESS: emojiClub?.address
  })

  writeFileSync(webEnvPath, envUpdate, { encoding: 'utf8' })
}
