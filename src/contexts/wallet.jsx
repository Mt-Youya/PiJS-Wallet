import { createAppKit } from "@reown/appkit/react"
import { EthersAdapter } from "@reown/appkit-adapter-ethers"
import { arbitrum, mainnet } from "@reown/appkit/networks"

// 1. Get projectId
const projectId = "15d2a2219f777138df5d0a550ef01ed7"

// 2. Set the networks
const networks = [arbitrum, mainnet]

// 3. Create a metadata object - optional
const metadata = {
    name: "PiJS-Wallet",
    description: "AppKit Example",
    url: "https://reown.com/appkit", // origin must match your domain & subdomain
    icons: ["https://assets.reown.com/reown-profile-pic.png"],
}

// 4. Create a AppKit instance
export const AppKit = createAppKit({
    adapters: [new EthersAdapter()],
    networks,
    metadata,
    projectId,
    features: {
        analytics: true, // Optional - defaults to your Cloud configuration
    },
})
