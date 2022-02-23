type AnyPromise = Promise<any>

type ResolvedInOrder = (ps: AnyPromise[]) => Promise<void>

export const resolvedInOrder: ResolvedInOrder = async (ps) => {
  const indexPromises = ps.map((p, i) => p.then(() => i))
  const resolvedIndexes = await Promise.all(indexPromises)
  const indexes = ps.map((_, i) => i)
  expect(resolvedIndexes).toStrictEqual(indexes)
}
