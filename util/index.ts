export function getInfuraUrl(network: string, protocol: 'http' | 'ws'): string {
  if (network === 'localhost') {
    return `${protocol}://localhost:8545`
  }

  // FIXME: Use dotenv and import id
  return `${protocol}s://${network}.infura.io/v3/6012542b9f064a18936d3447dd20b483`
}
