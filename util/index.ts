export function getNetworkUrl(network: string, protocol: 'http' | 'ws' = 'http'): string {
  if (network === 'localhost') {
    return `${protocol}://localhost:8545`
  }

  // FIXME: Use dotenv and import id
  return `${protocol}s://${network}.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
}
