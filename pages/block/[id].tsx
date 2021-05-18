import axios from 'axios'
import dayjs from 'dayjs'
import { BigNumber } from 'ethers'
import { Container, Heading } from '@chakra-ui/react'

import KeyValueProperty from '../../components/KeyValueProperty'
import NetworkSelection from '../../components/NetworkSelection'
import Search from '../../components/Search'
import { IBlock } from '../index'

interface BlockProps {
  block: IBlock
  network: string
}

export default function Block({ block, network }: BlockProps) {
  return (
    <>
      <Container>
        <NetworkSelection network={network} />
        <Search network={network} />
        <Heading as="h1" size="xl">
          Block #: {block.number}
        </Heading>
        <KeyValueProperty title="Block Height:" value={block.number} />
        <KeyValueProperty title="Timestamp:" value={dayjs.unix(block.timestamp).format()} />
        <KeyValueProperty
          title="Mined By:"
          value={block.miner}
          displayLink="address"
          displayTooltip={true}
          network={network}
        />
        <KeyValueProperty title="Difficulty:" value={block.difficulty} />
        <KeyValueProperty title="Gas Used:" value={BigNumber.from(block.gasUsed.hex).toString()} />
        <KeyValueProperty title="Gas Limit:" value={BigNumber.from(block.gasLimit.hex).toString()} />
        <KeyValueProperty title="Hash:" value={block.hash} displayTooltip={true} />
        {block.number > 0 ? (
          <KeyValueProperty
            title="Parent Hash:"
            value={block.parentHash}
            displayLink="block"
            displayTooltip={true}
            network={network}
          />
        ) : null}
        <KeyValueProperty title="Nonce:" value={block.nonce} />
      </Container>
      <Container marginTop={2}>
        {block.transactions?.length > 0 ? (
          <Heading as="h1" size="xl">
            Transactions
          </Heading>
        ) : null}
        {block.transactions?.map((tx, index) => {
          return (
            <KeyValueProperty
              key={index}
              title={`(${index + 1}) Hash:`}
              value={tx}
              displayLink="transaction"
              displayTooltip={true}
              network={network}
            />
          )
        })}
      </Container>
    </>
  )
}

export async function getServerSideProps({ params, query }) {
  const { data: block } = await axios.get(`${process.env.HOST}/api/block/${params.id}?network=${query.network}`)
  return {
    props: { block, network: query.network },
  }
}
