import Link from 'next/link'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Box, Code, Container, Heading, Link as CLink } from '@chakra-ui/react'

import NetworkSelection from '../components/NetworkSelection'
import Search from '../components/Search'
export interface IBlock {
  hash: string
  parentHash: string
  number: number
  timestamp: number
  nonce: string
  difficulty: number
  gasLimit: {
    type: string
    hex: string
  }
  gasUsed: {
    type: string
    hex: string
  }
  miner: string
  extraData: string
  transactions: string[]
}

interface HomeProps {
  latestBlocks: IBlock[]
  network?: string
}

export default function Home({ latestBlocks, network: network }: HomeProps) {
  const [blocks, setBlocks] = useState(latestBlocks)

  useEffect(() => {
    async function getBlocks() {
      const data = await getLatestBlocks(network)
      setBlocks(data)
    }
    getBlocks()
  }, [network])

  return (
    <Container>
      <NetworkSelection network={network} />
      <Search network={network} />

      <Heading as="h2" size="lg">
        Latest Blocks
      </Heading>
      <div>
        {blocks?.map((block) => {
          return (
            <Box display="flex" key={block.number}>
              <div>
                Block #:{' '}
                <Link href={`/block/${block.number}?network=${network}`}>
                  <CLink>{block.number}</CLink>
                </Link>
              </div>
              <div>
                Hash:{' '}
                <Link href={`/block/${block.hash}?network=${network}`}>
                  <CLink>
                    <Code style={{ fontSize: '10px' }}>{block.hash}</Code>
                  </CLink>
                </Link>
              </div>
              <div># of txs: {block.transactions.length}</div>
            </Box>
          )
        })}
      </div>
    </Container>
  )
}

export async function getServerSideProps({ query }) {
  const network = query?.network || 'mainnet'
  const latestBlocks = await getLatestBlocks(network)
  return {
    props: { latestBlocks, network },
  }
}

async function getLatestBlocks(network: string) {
  const { data } = await axios.get(`${process.env.HOST}/api/get-latest-blocks?network=${network}`)
  return data.latestBlocks
}
