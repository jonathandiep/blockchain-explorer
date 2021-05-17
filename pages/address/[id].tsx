import axios from 'axios'
import { utils } from 'ethers'
import { Container, Heading } from '@chakra-ui/react'

import KeyValueProperty from '../../components/KeyValueProperty'
import Search from '../../components/Search'

interface AddressProps {
  address: string
  balance: string
  transactionCount: number
}

export default function Address({ address, balance, transactionCount }: AddressProps) {
  return (
    <Container>
      <Search />
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

export async function getServerSideProps({ params }) {
  const { data } = await axios.get(`http://localhost:3000/api/address/${params.id}`)
  return {
    props: {
      address: params.id,
      balance: data.balance,
      transactionCount: data.transactionCount,
    },
  }
}
