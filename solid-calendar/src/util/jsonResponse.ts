import { ResponseData } from 'pretender'

export const jsonResponse = (value: object): ResponseData =>
    [200, {'Content-Type': 'application/json'}, JSON.stringify(value)]
