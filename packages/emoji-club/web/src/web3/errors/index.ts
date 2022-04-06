export interface Web3Error {
  code: number
  data?: unknown
  message: string
}

type NewError = (error: Web3Error) => (data: unknown) => { error: Web3Error }

const newError: NewError = (web3Error) => (data) => ({
  error: { ...web3Error, data },
})

export const web3Errors = <const>{
  requestPending: {
    code: -32002,
    message: "Request of type 'wallet_requestPermissions' already pending",
  },
  failedContractCreation: {
    code: 1,
    message: 'Failed to create ethers Contract',
  },
  failedLoadingTokens: newError({
    code: 2,
    message: 'Failed to load account tokens',
  }),
}

type IsWeb3Error = (web3Error: Web3Error, error: Web3Error) => boolean

export const isWeb3Error: IsWeb3Error = (web3Error, error) =>
  error.code === web3Error.code &&
  error.message.startsWith(web3Error.message)
