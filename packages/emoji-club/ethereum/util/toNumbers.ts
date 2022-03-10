import { Use } from './resolve'

export type ToNumbers = (v: any[]) => number[]

export const useToNumbers: Use<ToNumbers> = () => {
  const toNumbers: ToNumbers = (values): number[] => values.map(Number)
  return toNumbers
}
