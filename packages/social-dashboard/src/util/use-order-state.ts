import { useCookies } from 'react-cookie'
import { aIncludesB } from './a-includes-b'

type SetOrderState = (order: string[]) => void

export type OrderState = [string[], SetOrderState]

interface Props {
  cookieName: string
  ids: string[]
}

type UseOrderState = (props: Props) => OrderState

export const useOrderState: UseOrderState = (props) => {
  const [cookies, setCookie] = useCookies([props.cookieName])
  const storedOrder: string[] = cookies[props.cookieName] ?? []

  const storedOrderIsValid =
    props.ids.length === storedOrder.length &&
    aIncludesB(props.ids, storedOrder)

  return [
    // Assert storedOrder ids exist (have not been tampered)
    storedOrderIsValid ? storedOrder : props.ids,
    (type) => setCookie(props.cookieName, type, { sameSite: true }),
  ]
}
