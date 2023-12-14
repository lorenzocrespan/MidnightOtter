"use client";

import { WagmiConfig, createConfig, configureChains, sepolia } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: false,
  connectors: [
    new InjectedConnector({
      chains,
    }),
  ],
  publicClient,
  webSocketPublicClient,
});

export function Web3Modal({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={config}>
      
        {children}

    </WagmiConfig>
  );
}
