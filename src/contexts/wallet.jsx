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
        analytics: true,
    },
})
