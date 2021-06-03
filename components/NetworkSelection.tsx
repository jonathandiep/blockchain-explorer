import Link from 'next/link'
import { Box, Button, Flex, Spacer, useColorMode } from '@chakra-ui/react'

interface NetworkSelectionProps {
  network: string
  setNetwork?: React.Dispatch<string>
}

export default function NetworkSelection({ network }: NetworkSelectionProps) {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex>
      <Box marginTop={2}>
        <Link href="/?network=mainnet">
          <a>
            <Button colorScheme="teal" size="xs" marginRight={2} variant={network === 'mainnet' ? 'solid' : 'outline'}>
              Mainnet
            </Button>
          </a>
        </Link>
        <Link href="/?network=ropsten">
          <a>
            <Button colorScheme="red" size="xs" marginRight={2} variant={network === 'ropsten' ? 'solid' : 'outline'}>
              Ropsten
            </Button>
          </a>
        </Link>
        <Link href="/?network=kovan">
          <a>
            <Button colorScheme="purple" size="xs" marginRight={2} variant={network === 'kovan' ? 'solid' : 'outline'}>
              Kovan
            </Button>
          </a>
        </Link>
        <Link href="/?network=rinkeby">
          <a>
            <Button
              colorScheme="yellow"
              size="xs"
              marginRight={2}
              variant={network === 'rinkeby' ? 'solid' : 'outline'}
            >
              Rinkeby
            </Button>
          </a>
        </Link>
        <Link href="/?network=goerli">
          <a>
            <Button
              colorScheme="messenger"
              size="xs"
              marginRight={2}
              variant={network === 'goerli' ? 'solid' : 'outline'}
            >
              Goerli
            </Button>
          </a>
        </Link>
        <Link href="/?network=localhost">
          <a>
            <Button colorScheme="telegram" size="xs" variant={network === 'localhost' ? 'solid' : 'outline'}>
              Localhost 8545
            </Button>
          </a>
        </Link>
      </Box>
      <Spacer />
      <Button mt="2" size="xs" onClick={toggleColorMode}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button>
    </Flex>
  )
}
