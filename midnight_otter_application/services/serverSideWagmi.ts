"use server";

import { configureChains, createConfig, sepolia } from "@wagmi/core";
import { publicProvider } from "@wagmi/core/providers/public";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

import { readContract } from "@wagmi/core";
import contractABI from "./smartcontract.json";

export const getName = async () : Promise<string> => {
  return (await readContract({
    address: "0x1bf296B7F9B19DdA530bAA8D15d8D840e1f62209",
    abi: contractABI.abi,
    functionName: "name",
  })) as string;
};
