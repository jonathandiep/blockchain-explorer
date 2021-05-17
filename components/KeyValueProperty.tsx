import Link from 'next/link'
import { Flex, Box, Tooltip, Link as CLink } from '@chakra-ui/react'
import { InfoIcon } from '@chakra-ui/icons'

interface KeyValueProperty {
  title: string
  value: any
  displayLink?: 'address' | 'block' | 'transaction'
  displayTooltip?: boolean
}

function link(value: any, type: 'address' | 'block' | 'transaction') {
  if (type) {
    return (
      <Link href={`/${type}/${value}`}>
        <CLink>{value}</CLink>
      </Link>
    )
  }

  return value
}

export default function KeyValueProperty({ title, value, displayLink, displayTooltip = false }: KeyValueProperty) {
  return (
    <Flex border={1} borderColor="black" borderStyle="solid" padding={3}>
      <Box style={{ width: '150px' }}>{title}</Box>
      <Box flex="1" isTruncated>
        {link(value, displayLink)}
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
