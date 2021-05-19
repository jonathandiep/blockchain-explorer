export function getNetworkUrl(network: string, protocol: 'http' | 'ws' = 'http'): string {
  if (network === 'localhost') {
    return `${protocol}://localhost:8545`
  }

  return `${protocol}s://${network}.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_PROJECT_ID}`
}
