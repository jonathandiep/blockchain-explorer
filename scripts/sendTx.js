const ethers = require('ethers')

// Run following command
// ganache-cli --account="0x115b8fd107f6b39c928e57610d1ec92e23f22922f9fdfd96f16f1b5906c41a94,100000000000000000000"

const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545')
const privateKey = '0x115b8fd107f6b39c928e57610d1ec92e23f22922f9fdfd96f16f1b5906c41a94'
const wallet = new ethers.Wallet(privateKey, provider)

async function connectEther() {
  const tx = await wallet.sendTransaction({
    to: '0x8c91512cfCd09723036836D8b9b6e6B14893338e',
    value: ethers.utils.parseEther('1.0'),
  })
  console.log(tx)
}

connectEther()
