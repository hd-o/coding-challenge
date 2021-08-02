/**
 * @file
 * @see {@link ../types/}
 * Context used by model tree
 */
import { Service } from 'typedi'

@Service()
export class ModelContext {
  constructor(public floorHeight = 100) {}
}
