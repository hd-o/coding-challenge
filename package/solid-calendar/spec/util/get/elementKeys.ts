export function getElementKeys (els: HTMLElement[]): string[] {
  return els.map((el) => el.getAttribute('data-key') ?? '')
}
