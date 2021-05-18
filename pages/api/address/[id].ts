import { ethers } from 'ethers'
import { NextApiRequest, NextApiResponse } from 'next'

import { getInfuraUrl } from '../../../util'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, network } = req.query
  const provider = ethers.getDefaultProvider(getInfuraUrl(network as string, 'http'))
  const balance = (await provider.getBalance(id as string)).toString()
  const transactionCount = await provider.getTransactionCount(id as string)
  res.send({ balance, transactionCount })
}
