export interface IFloor {
  number: number
  getBottomPosition: (this: IFloor) => number
  getTopPosition: (this: IFloor) => number
}
