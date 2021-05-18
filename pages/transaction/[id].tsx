import Link from 'next/link'
import { BigNumber, utils } from 'ethers'
import { Badge, Container, Heading } from '@chakra-ui/react'
import axios from 'axios'

import KeyValueProperty from '../../components/KeyValueProperty'
import NetworkSelection from '../../components/NetworkSelection'
import Search from '../../components/Search'

interface TransactionProps {
  network: string
  tx: {
    hash: string
    type: any
    accessList: any
    blockHash: string
    blockNumber: number
    transactionIndex: number
    confirmations: number
    from: string
    gasPrice: {
      type: string
      hex: string
    }
    gasLimit: {
      type: string
      hex: string
    }
    to: string
    value: {
      type: string
      hex: string
    }
    nonce: number
    data: string
    r: string
    s: string
    v: number
    creates: any
    chainId: number
  }
}

export default function Transaction({ tx, network }: TransactionProps) {
  return (
    <Container>
      <NetworkSelection network={network} />
      <Search network={network} />
      <Heading as="h1" size="xl">
        Transaction
      </Heading>

      <KeyValueProperty title="Hash:" value={tx.hash} displayTooltip={true} />
      <Link href={`/block/${tx.blockNumber}?network=${network}`}>
        <a>
          <KeyValueProperty
            title="Block:"
            value={
              <span>
                {tx.blockNumber}
                <Badge colorScheme="green" marginLeft={3}>
                  {tx.confirmations} Block Confirmations
                </Badge>
              </span>
            }
          />
        </a>
      </Link>
      <KeyValueProperty title="From:" value={tx.from} displayLink="address" network={network} />
      <KeyValueProperty title="To:" value={tx.to} displayLink="address" network={network} />
      <KeyValueProperty title="Value:" value={`${utils.formatEther(tx.value.hex)} Ether`} />
      <KeyValueProperty
        title="Gas Price:"
        value={`${utils.formatEther(BigNumber.from(tx.gasPrice.hex).toString())} Ether (${utils.formatUnits(
          BigNumber.from(tx.gasPrice.hex).toString(),
          'gwei'
        )} gwei)`}
      />
      <KeyValueProperty title="Gas Limit:" value={BigNumber.from(tx.gasLimit.hex).toString()} />
      <KeyValueProperty title="Nonce:" value={tx.nonce} />
    </Container>
  )
}

export async function getServerSideProps({ params, query }) {
  const { data: tx } = await axios.get(
    `${process.env.HOST || process.env.VERCEL_URL}/api/transaction/${params.id}?network=${query.network}`
  )
  return {
    props: { tx, network: query.network },
  }
}
