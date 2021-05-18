import { ethers } from 'ethers'
import { NextApiRequest, NextApiResponse } from 'next'

import { getInfuraUrl } from '../../../util'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id, network } = req.query
    const provider = ethers.getDefaultProvider(getInfuraUrl(network as string, 'http'))
    // hacky solution, but it works lol
    const blockId = /\d+/.test(id as string) && id.indexOf('0x') !== 0 ? parseInt(id as string) : (id as string)
    // TODO: Use getBlockWithTransactions
    const block = await provider.getBlock(blockId)
    res.send(block)
  } catch (e) {
    console.error(e)
    res.send({ success: false, message: "Block doesn't exist" })
  }
}
