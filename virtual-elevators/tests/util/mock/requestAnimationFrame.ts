interface RequestAnimationFrameMock {
  afterAll: () => void
  beforeAll: () => void
  tick: () => void
  reset: () => void
}

export function createRequestAnimationFrameMock (): RequestAnimationFrameMock {
  let queue: Function[] = []
  function requestAnimationFrame (fn: FrameRequestCallback): number {
    return queue.push(fn)
  }
  function tick (): void {
    queue.shift()?.()
  }
  return {
    tick,
    afterAll () {
      (window.requestAnimationFrame as jest.Mock).mockRestore()
    },
    beforeAll () {
      jest
        .spyOn(window, 'requestAnimationFrame')
        .mockImplementation(requestAnimationFrame)
    },
    reset () {
      queue = []
    }
  }
}
