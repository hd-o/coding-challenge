import 'reflect-metadata'
import { Container } from 'inversify'
import { createContext } from 'react'
import { AppFactory } from '~/model/app/factory'
import { MobX } from '~/model/mobx'
import { Settings } from '~/model/settings'

// TODO: Use Maybe instead of union returns
const container = new Container({ autoBindInjectable: true })

container.bind(MobX).toSelf().inSingletonScope()
container.bind(Settings).toSelf().inSingletonScope()

export const StateCtx = createContext(container.resolve(AppFactory).create())
