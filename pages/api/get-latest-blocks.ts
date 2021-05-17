import { ethers } from 'ethers'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const provider = ethers.getDefaultProvider(req.body.network || 'http://localhost:8545')
  let blockNumberPointer = await provider.getBlockNumber()
  let blockNumbers = []
  while (blockNumberPointer >= 0 && blockNumbers.length < 5) {
    blockNumbers.push(provider.getBlock(blockNumberPointer))
    blockNumberPointer--
  }

  const latestBlocks = await Promise.all(blockNumbers)

  res.send({ latestBlocks })
}
