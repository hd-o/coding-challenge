import createCache, { EmotionCache } from '@emotion/cache'

export const newEmotionCache = (): EmotionCache => (
  createCache({ key: 'css', prepend: true })
)
