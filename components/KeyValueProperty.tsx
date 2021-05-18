import Link from 'next/link'
import { Flex, Box, Tooltip, Link as CLink } from '@chakra-ui/react'
import { InfoIcon } from '@chakra-ui/icons'

interface KeyValueProperty {
  network?: string
  title: string
  value: any
  displayLink?: 'address' | 'block' | 'transaction'
  displayTooltip?: boolean
}

function link(value: any, type: 'address' | 'block' | 'transaction', network: string) {
  if (type) {
    return (
      <Link href={`/${type}/${value}?network=${network}`}>
        <CLink>{value}</CLink>
      </Link>
    )
  }

  return value
}

export default function KeyValueProperty({
  title,
  value,
  displayLink,
  displayTooltip = false,
  network,
}: KeyValueProperty) {
  return (
    <Flex border={1} borderColor="black" borderStyle="solid" padding={3}>
      <Box style={{ width: '150px' }}>{title}</Box>
      <Box flex="1" isTruncated>
        {link(value, displayLink, network)}
      </Box>
      {displayTooltip ? (
        <Tooltip label={value}>
          <Box>
            <InfoIcon color="blue.400" />
          </Box>
        </Tooltip>
      ) : null}
    </Flex>
  )
}
