/*
 *  NOTE:
 *    The following file defines the calls to the MetaMask.
 *    It is used to connect to the MetaMask wallet and to
 *    retrieve the account and network information.
 */

/**
 *  Interface to define the MetaMask state.
 *
 *  @param account The account address (e.g. 0x...).
 *  @param network The network name (e.g. mainnet).
 *  @param balance The account balance (e.g. 100).
 *  @param isConnected True if the MetaMask is connected, false otherwise.
 *
 */
export interface metamaskState {
  account: string;
  network: string;
  balance: number;
  isConnected: boolean;
}

export const initialState: metamaskState = {
  account: "",
  network: "",
  isConnected: false,
  balance: 0,
};

/**
 *  Type to define the MetaMask action.
 *
 */
export type metamaskAction =
  | {
      type: "CONNECT";
      account: string;
      network: string;
      balance: number;
    }
  | {
      type: "DISCONNECT";
    }
  | {
      type: "UPDATE_CONTEXT";
    };

/**
 *  Function to connect to the MetaMask wallet.
 *
 * @param state
 * @param action
 * @returns
 */
export function metamaskReducer(
  state: metamaskState,
  action: metamaskAction
): metamaskState {
  switch (action.type) {
    case "CONNECT":
      console.log("[MetaMaskReducer] Connected to MetaMask");
      return {
        ...state,
        account: action.account,
        network: action.network,
        balance: action.balance,
        isConnected: true,
      };
    case "DISCONNECT":
      console.log("[MetaMaskReducer] Disconnected from MetaMask");
      return {
        ...state,
        account: "",
        network: "",
        balance: 0,
        isConnected: false,
      };
    default:
      return state;
  }
}
