export interface Web3Error {
  code: number
  message: string
}

export const web3Errors = <const>{
  requestPending: {
    code: -32002,
    message: "Request of type 'wallet_requestPermissions' already pending",
  },
}

type IsWeb3Error = (web3Error: Web3Error, error: Web3Error) => boolean

export const isWeb3Error: IsWeb3Error = (web3Error, error) =>
  error.code === web3Error.code &&
  error.message.startsWith(web3Error.message)
