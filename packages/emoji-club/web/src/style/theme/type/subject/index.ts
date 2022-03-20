import { useNewStorageSubject } from '/src/storage/new/subject'
import { Use } from '/src/util/function-context/context'
import { BehaviorSubject } from 'rxjs'
import { ThemeType, themeTypes } from '../..'

const isThemeType = (v: any): v is ThemeType => themeTypes.includes(v)

type ThemeTypeSubject = BehaviorSubject<ThemeType>

export const useThemeTypeSubject: Use<ThemeTypeSubject> = (resolve) => {
  const newStorageSubject = resolve(useNewStorageSubject)
  return newStorageSubject('app-theme-type', isThemeType, 'dark')
}
