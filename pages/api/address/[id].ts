import { ethers } from 'ethers'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const provider = ethers.getDefaultProvider(req.body.network || 'http://localhost:8545')
  const balance = (await provider.getBalance(id as string)).toString()
  const transactionCount = await provider.getTransactionCount(id as string)
  res.send({ balance, transactionCount })
}
