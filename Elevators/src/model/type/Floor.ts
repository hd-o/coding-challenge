import { Inject } from 'typedi'
import { ModelContext } from '../Context/model'

/**
 * Represents a building's floor
 */
export class Floor {
  constructor(
    public number: number,
    @Inject() private ctx: ModelContext,
  ) {
    this.id = String(number)
  }
  /**
   * this.number as string
   */
  public readonly id: string
  /**
   * Bottom position
   */
  get position(): number {
    return this.number * this.ctx.floorHeight
  }
  /**
   * Bottom position + height
   */
  get topPosition(): number {
    return this.position + this.ctx.floorHeight
  }
}
