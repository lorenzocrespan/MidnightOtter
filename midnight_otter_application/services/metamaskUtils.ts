/*
 *  NOTE:
 *    The following file defines the calls to interact with the MetaMask.
 *    It is used to connect to the MetaMask wallet and to retrieve the
 *    account and network information.
 */

/**
 *  Function to check if the MetaMask is installed.
 *
 *  @returns True if the MetaMask is installed, false otherwise.
 *
 */
export async function isMetamaskInstalled(): Promise<boolean> {
  console.log("[MetaMaskUtils] MetaMask is installed: " + !!window.ethereum);
  return !!window.ethereum;
}

/**
 *  Function to check if the MetaMask is connected.
 *
 *  @returns True if the MetaMask is connected, false otherwise.
 *
 */
export async function isMetamaskConnected(): Promise<boolean> {
  // Check if MetaMask is installed
  if (!isMetamaskInstalled())
    throw new Error("[MetaMaskUtils] MetaMask is not installed");
  // Get accounts from MetaMask wallet
  const accounts = await window.ethereum.request({
    method: "eth_accounts",
  });
  // Return true if accounts are found
  return accounts && accounts.length > 0;
}

/**
 *  Function to match the network id to the network name.
 *  See https://chainid.network/ for more information.
 *
 *  @param network The network id.
 *
 *  @returns The network name.
 *
 */
function convertNetIdToNetName(network: number): string {
  console.log("[MetaMaskUtils] Network id: " + network);
  switch (network) {
    case 1:
      return "mainnet";
    case 11155111:
      return "sepolia";
    default:
      return "unknown";
  }
}

/**
 *  Function to convert the balance to a specific currency.
 *  See https://docs.metamask.io/guide/ethereum-provider.html#ethereum-provider-api for more information.
 *
 *  @param balance The balance to convert.
 *  @param currency The currency to convert to.
 *
 *  @returns The converted balance.
 *
 */
function convertBalanceCurrency(balance: number, currency: string): number {
  switch (currency) {
    case "ETH":
      return balance / 10 ** 18;
    case "GWEI":
      return balance / 10 ** 9;
    default:
      return balance;
  }
}

/**
 *  Function to get the balance of an account.
 *
 *  @param account The account to get the balance from.
 *
 *  @returns The balance.
 *
 */
async function getBalance(account: string): Promise<number> {
  // Check if MetaMask is installed
  if (!isMetamaskInstalled())
    throw new Error("[MetaMaskUtils] MetaMask is not installed");
  // Get balance from MetaMask wallet for the account provided
  const balance = await window.ethereum.request({
    method: "eth_getBalance",
    params: [account, "latest"],
  });
  // Return the balance as a number
  return parseInt(balance as string, 16);
}

/**
 *  Function to get the network id.
 *
 *  @returns The network id.
 */
async function getNetwork(): Promise<number> {
  // Check if MetaMask is installed
  if (!isMetamaskInstalled())
    throw new Error("[MetaMaskUtils] MetaMask is not installed");
  // Get network id from MetaMask wallet
  const network = await window.ethereum.request({
    method: "net_version",
  });
  // Return the network id as a number
  return parseInt(network as string, 10);
}

/**
 *  Function to connect to the MetaMask wallet.
 *
 *  @returns The account, network and balance information.
 *
 */
export async function connectMetamask(): Promise<{
  account: string;
  network: string;
  balance: number;
}> {
  // Check if MetaMask is installed
  if (!isMetamaskInstalled())
    throw new Error("[MetaMaskUtils] MetaMask is not installed");
  // Get accounts from MetaMask wallet
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  // Check if accounts are found
  if (accounts) {
    const tmp = accounts as string[];
    // If accounts are found, get the first account
    // and retrieve the network and balance information.
    if (tmp.length > 0) {
      const account = tmp[0];
      const network = await getNetwork();
      const balance = await getBalance(account);
      console.log("[MetaMaskUtils] Account: " + account);
      return {
        account,
        network: convertNetIdToNetName(network),
        balance: convertBalanceCurrency(balance, "ETH"),
      };
    }
  }
  throw new Error("[MetaMaskUtils] Error connecting to MetaMask");
}
