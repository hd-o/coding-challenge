export type ToParsedJson <ParsedType = unknown> = <P = ParsedType> (v: unknown) => P

export const useToParsedJson = (): ToParsedJson => (v) =>
  JSON.parse(JSON.stringify(v, null, 2))
