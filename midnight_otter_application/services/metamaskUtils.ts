
export async function isMetamaskInstalled(): Promise<boolean> {
  return !!window.ethereum;
}

export async function isMetamaskConnected(): Promise<boolean> {
  if (!window.ethereum) {
    throw new Error(`invalid ethereum provider`);
  }

  const accounts = await window.ethereum.request({
    method: "eth_accounts",
  });

  return accounts && accounts.length > 0;
}

// Connect to metamask and return the account address, network, and balance in wei
export async function connectMetamask(): Promise<{
  account: string;
  network: number;
  balance: number;
}> {
  if (!window.ethereum) {
    throw new Error(`invalid ethereum provider`);
  }

  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  if (accounts) {
    const tmp = accounts as string[];
    if (tmp.length > 0) {
      const account = tmp[0];
      const network = await getNetwork();
      const balance = await getBalance(account);

      return {
        account,
        network,
        balance,
      };
    }
  }

  throw new Error(`failed to connect to metamask`);
}

export async function connectWallet(): Promise<string | undefined> {
  if (!window.ethereum) {
    throw new Error(`invalid ethereum provider`);
  }

  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  if (accounts) {
    const tmp = accounts as string[];
    if (tmp.length > 0) {
      return tmp[0];
    }
  }

  return undefined;
}

export async function getBalance(account: string): Promise<number> {
  if (!window.ethereum) {
    throw new Error(`invalid ethereum provider`);
  }

  const balance = await window.ethereum.request({
    method: "eth_getBalance",
    params: [account, "latest"],
  });

  return parseInt(balance as string, 16);
}

export async function getNetwork(): Promise<number> {
  if (!window.ethereum) {
    throw new Error(`invalid ethereum provider`);
  }

  const network = await window.ethereum.request({
    method: "net_version",
  });

  return parseInt(network as string, 10);
}
