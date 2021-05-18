import { ethers } from 'ethers'
import { NextApiRequest, NextApiResponse } from 'next'

import { getNetworkUrl } from '../../../util'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, network } = req.query
  const provider = ethers.getDefaultProvider(getNetworkUrl(network as string, 'http'))
  const transaction = await provider.getTransaction(id as string)
  res.send(transaction)
}
