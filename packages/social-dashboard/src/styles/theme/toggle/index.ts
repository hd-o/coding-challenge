import { useAppThemeState } from '../state'

type ToggleTheme = () => void

export const useToggleTheme = (): ToggleTheme => {
  const [theme, setTheme] = useAppThemeState()
  return () => setTheme(theme === 'dark' ? 'light' : 'dark')
}
