import { fireEvent } from '@testing-library/react'

export function fireChange (el: HTMLInputElement, value: string): boolean {
  return fireEvent.change(el, { target: { value } })
}
