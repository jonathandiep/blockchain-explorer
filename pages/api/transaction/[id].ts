import { ethers } from 'ethers'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const provider = ethers.getDefaultProvider(req.body.network || 'http://localhost:8545')
  const transaction = await provider.getTransaction(id as string)
  res.send(transaction)
}
