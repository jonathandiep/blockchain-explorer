import { ethers } from 'ethers'
import { NextApiRequest, NextApiResponse } from 'next'

import { getInfuraUrl } from '../../util'

export default async ({ query }: NextApiRequest, res: NextApiResponse) => {
  const provider = ethers.getDefaultProvider(getInfuraUrl(query.network as string, 'http'))
  let blockNumberPointer = await provider.getBlockNumber()
  let blockNumbers = []
  while (blockNumberPointer >= 0 && blockNumbers.length < 5) {
    blockNumbers.push(provider.getBlock(blockNumberPointer))
    blockNumberPointer--
  }

  const latestBlocks = await Promise.all(blockNumbers)

  res.send({ latestBlocks })
}
