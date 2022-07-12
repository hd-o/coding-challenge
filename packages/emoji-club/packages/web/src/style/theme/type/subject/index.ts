import { useNewStorageSubject } from '/src/storage/new/subject'
import { ThemeType, themeTypes } from '/src/style/theme'
import { Use } from '/src/util/function-context/context'
import { BehaviorSubject } from 'rxjs'

const isThemeType = (v: any): v is ThemeType => themeTypes.includes(v)

type ThemeTypeSubject = BehaviorSubject<ThemeType>

export const useThemeTypeSubject: Use<ThemeTypeSubject> = (resolve) => {
  const newStorageSubject = resolve(useNewStorageSubject)
  return newStorageSubject('app-theme-type', isThemeType, 'dark')
}
