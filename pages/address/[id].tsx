import axios from 'axios'
import { utils } from 'ethers'
import { Container, Heading } from '@chakra-ui/react'

import KeyValueProperty from '../../components/KeyValueProperty'
import NetworkSelection from '../../components/NetworkSelection'
import Search from '../../components/Search'

interface AddressProps {
  network: string
  address: string
  balance: string
  transactionCount: number
}

export default function Address({ address, balance, transactionCount, network }: AddressProps) {
  return (
    <Container>
      <NetworkSelection network={network} />
      <Search network={network} />
      <Heading as="h1" size="xl">
        Address
      </Heading>
      <Heading as="h2" size="md">
        {address}
      </Heading>

      <KeyValueProperty title="Balance:" value={`${utils.formatEther(balance)} Ether`} />
      <KeyValueProperty title="Transaction Count:" value={transactionCount} />
    </Container>
  )
}

export async function getServerSideProps({ params, query }) {
  const { data } = await axios.get(
    `${process.env.HOST || process.env.NEXT_PUBLIC_VERCEL_URL}/api/address/${params.id}?network=${query.network}`
  )
  return {
    props: {
      network: query.network,
      address: params.id,
      balance: data.balance,
      transactionCount: data.transactionCount,
    },
  }
}
