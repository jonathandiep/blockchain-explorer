import Link from 'next/link'
import axios from 'axios'
import { Box, Code, Container, Heading, Link as CLink } from '@chakra-ui/react'

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
}

export default function Home({ latestBlocks }: HomeProps) {
  return (
    <Container>
      <Search />

      <Heading as="h2" size="lg">
        Latest Blocks
      </Heading>
      <div>
        {latestBlocks.map((block) => {
          return (
            <Box display="flex" key={block.number}>
              <div>
                Block #:{' '}
                <Link href={`/block/${block.number}`}>
                  <CLink>{block.number}</CLink>
                </Link>
              </div>
              <div>
                Hash:{' '}
                <Link href={`/block/${block.hash}`}>
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

export async function getServerSideProps(_context) {
  const { data } = await axios.get('http://localhost:3000/api/get-latest-blocks')
  return {
    props: {
      latestBlocks: data.latestBlocks,
    },
  }
}
