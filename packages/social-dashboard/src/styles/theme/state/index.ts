import { useCookies } from 'react-cookie'
import { ThemeType, themeTypes } from '../'

const themeTypeCookie = 'app-theme-type'

const isThemeType = (v: any): v is ThemeType => themeTypes.includes(v)

type SetThemeType = (type: ThemeType) => void

type AppThemeCookieState = [ThemeType, SetThemeType]

export const useAppThemeState = (): AppThemeCookieState => {
  const [cookies, setCookie] = useCookies([themeTypeCookie])
  const cookie = cookies[themeTypeCookie]
  const storedThemeType = isThemeType(cookie) ? cookie : 'dark'
  return [
    storedThemeType,
    (type) => setCookie(themeTypeCookie, type, { sameSite: true }),
  ]
}
