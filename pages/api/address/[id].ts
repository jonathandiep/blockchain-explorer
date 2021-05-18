import { ethers } from 'ethers'
import { NextApiRequest, NextApiResponse } from 'next'

import { getNetworkUrl } from '../../../util'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, network } = req.query
  const provider = ethers.getDefaultProvider(getNetworkUrl(network as string, 'http'))
  const balance = (await provider.getBalance(id as string)).toString()
  const transactionCount = await provider.getTransactionCount(id as string)
  res.send({ balance, transactionCount })
}
