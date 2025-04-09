// config/index.tsx

import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { cookieStorage, createStorage } from "wagmi";
import { mainnet, sepolia, hederaTestnet } from "wagmi/chains";

// Your WalletConnect Cloud project ID
export const projectId = "1c8a94290d2207b2c6e6edbbebd25f79";

// Create a metadata object
const metadata = {
  name: "Quiz",
  description: "AppKit Example",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// Create wagmiConfig
const chains = [hederaTestnet] as const;
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
//   ...wagmiOptions, // Optional - Override createConfig parameters
});
