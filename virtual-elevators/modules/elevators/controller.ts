import { createContext } from 'react'
import { container, singleton } from 'tsyringe'

@singleton()
export class ElevatorsCtrl {

}

export const ElevatorsCtrlCtx = createContext(container.resolve(ElevatorsCtrl))
