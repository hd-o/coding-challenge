export function logPlain (v: unknown): void {
  console.log(JSON.parse(JSON.stringify(v)))
}
