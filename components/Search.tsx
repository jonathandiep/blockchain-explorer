import { getDefaultProvider, utils } from 'ethers'
import { useState } from 'react'
import { useRouter, NextRouter } from 'next/router'
import { Button, Divider, FormControl, Input } from '@chakra-ui/react'

import { getInfuraUrl } from '../util'

async function submitSearch(value: string, network: string, router: NextRouter) {
  if (utils.isAddress(value)) {
    router.push(`/address/${value}?network=${network}`)
    return
  }

  const provider = getDefaultProvider(getInfuraUrl(network, 'http'))

  const tx = await provider.getTransaction(value)
  if (tx?.hash) {
    router.push(`/transaction/${tx.hash}?network=${network}`)
    return
  }

  const block = await provider.getBlock(value)
  if (block?.hash) {
    router.push(`/block/${block.hash}?network=${network}`)
    return
  }
}

export default function Search({ network }) {
  const [searchInput, setSearchInput] = useState('')
  const router = useRouter()
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      submitSearch(searchInput, network, router)
    }
  }

  return (
    <>
      <FormControl id="search" display="flex" marginTop={5}>
        <Input
          placeholder="Search by Address / Txn Hash / Block"
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button colorScheme="blue" ml={2} onClick={() => submitSearch(searchInput, network, router)}>
          Submit
        </Button>
      </FormControl>
      <Divider marginY={5} />
    </>
  )
}
