import 'reflect-metadata'
import { createContext } from 'react'
import { container } from 'tsyringe'
import { AppFactory } from '~/model/app/factory'

export const StateCtx = createContext(container.resolve(AppFactory).create())
