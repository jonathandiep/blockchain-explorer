import { getDefaultProvider, utils } from 'ethers'
import { useState } from 'react'
import { useRouter, NextRouter } from 'next/router'
import { Button, Divider, FormControl, Input } from '@chakra-ui/react'

async function submitSearch(value: string, router: NextRouter) {
  if (utils.isAddress(value)) {
    router.push(`/address/${value}`)
    return
  }

  const provider = getDefaultProvider('http://localhost:8545')

  const tx = await provider.getTransaction(value)
  if (tx?.hash) {
    router.push(`/transaction/${tx.hash}`)
    return
  }

  const block = await provider.getBlock(value)
  if (block?.hash) {
    router.push(`/block/${block.hash}`)
    return
  }
}

export default function Search() {
  const [searchInput, setSearchInput] = useState('')
  const router = useRouter()

  return (
    <>
      <FormControl id="search" display="flex" marginTop={5}>
        <Input placeholder="Search by Address / Txn Hash / Block" onChange={(e) => setSearchInput(e.target.value)} />
        <Button colorScheme="blue" ml={2} onClick={() => submitSearch(searchInput, router)}>
          Submit
        </Button>
      </FormControl>
      <Divider marginY={5} />
    </>
  )
}
