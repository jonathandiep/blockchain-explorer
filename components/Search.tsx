import { getDefaultProvider, utils } from 'ethers'
import React, { useState } from 'react'
import { useRouter, NextRouter } from 'next/router'
import { Alert, AlertIcon, AlertTitle, Box, Button, CloseButton, Divider, FormControl, Input } from '@chakra-ui/react'

import { getNetworkUrl } from '../util'

async function submitSearch(
  value: string,
  network: string,
  router: NextRouter,
  setDisplayError: React.Dispatch<boolean>
) {
  if (utils.isAddress(value)) {
    setDisplayError(false)
    router.push(`/address/${value}?network=${network}`)
    return
  }

  const provider = getDefaultProvider(getNetworkUrl(network, 'http'))

  const tx = await provider.getTransaction(value)
  if (tx?.hash) {
    setDisplayError(false)
    router.push(`/transaction/${tx.hash}?network=${network}`)
    return
  }

  const block = await provider.getBlock(value)
  if (block?.hash) {
    setDisplayError(false)
    router.push(`/block/${block.hash}?network=${network}`)
    return
  }

  setDisplayError(true)
}

export default function Search({ network }) {
  const [displayError, setDisplayError] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const router = useRouter()
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      submitSearch(searchInput, network, router, setDisplayError)
    }
  }

  return (
    <>
      {displayError ? (
        <Alert status="error" marginTop={5}>
          <AlertIcon />
          <Box flex="1">
            <AlertTitle fontSize={10}>"{searchInput}" not found</AlertTitle>
          </Box>
          <CloseButton position="absolute" right="8px" top="8px" onClick={() => setDisplayError(false)} />
        </Alert>
      ) : null}

      <FormControl id="search" display="flex" marginTop={5}>
        <Input
          placeholder="Search by Address / Txn Hash / Block"
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button colorScheme="blue" ml={2} onClick={() => submitSearch(searchInput, network, router, setDisplayError)}>
          Submit
        </Button>
      </FormControl>
      <Divider marginY={5} />
    </>
  )
}
