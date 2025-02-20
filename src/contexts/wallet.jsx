import { createAppKit } from "@reown/appkit/react"
import { EthersAdapter } from "@reown/appkit-adapter-ethers"
import { arbitrum, mainnet, bscTestnet } from "@reown/appkit/networks"

const projectId = "15d2a2219f777138df5d0a550ef01ed7"

const networks = [bscTestnet]

const metadata = {
    name: "PiJS-Wallet",
    description: "AppKit Example",
    url: "https://reown.com/appkit",
    icons: ["https://assets.reown.com/reown-profile-pic.png"],
}

export const AppKit = createAppKit({
    adapters: [new EthersAdapter()],
    networks,
    metadata,
    projectId,
    features: {
        connectMethodsOrder: ['wallet'],
    },
    featuredWalletIds: [
        'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
        '971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709',
        '20459438007b75f4f4acb98bf29aa3b800550309646d375da5fd4aac6c2a2c66'
    ]
})
