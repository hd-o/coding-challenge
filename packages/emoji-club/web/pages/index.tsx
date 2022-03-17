import type { NextPage } from 'next'
import { ethers } from 'ethers'
import Head from 'next/head'
import { useState } from 'react'

declare let window: any

const Home: NextPage = () => {
  const [balance, setBalance] = useState<string>()

  const handleGetBalance = async (): Promise<void> => {
    const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const balance = await provider.getBalance(account)
    setBalance(ethers.utils.formatEther(balance))
  }

  return (
    <div>
      <Head>
        <title>😜 Emoji Club</title>
        <meta name='description' content='Full Stack Emoji NFT Dapp' />
      </Head>
      <main>
        <div style={{ margin: '50 auto' }}>
          <h3>Balance: {balance}</h3>
          <button onClick={() => { void handleGetBalance() }}>
            Get Balance
          </button>
        </div>
      </main>
    </div>
  )
}

export default Home
