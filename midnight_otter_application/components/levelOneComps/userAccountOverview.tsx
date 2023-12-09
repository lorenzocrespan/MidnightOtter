"use client";
// Wagmi imports
import { useAccount, useNetwork, useBalance } from "wagmi";


export default function UserAccountOverviewComponent() {

  /**
   * @description Variable that stores the state of the user's account.
   * It is an object that contains the user's address, the network they are
   * connected to, and their balance.
   */
  const dataUserBlockchain = {
    account: useAccount(),
    network: useNetwork(),
    balance: useBalance({ address: useAccount().address }),
  };



  console.log("[userAccountOverview] Data about user, network and contract: ", dataUserBlockchain);

  return (
    <div className="flex h-auto justify-between rounded-md p-12">
      <div className="flex flex-row gap-16">
        <img
          src={"https://avatar.iran.liara.run/public/37"}
          className="m-2 my-8 h-36 w-36 flex-shrink-0 rounded-full border-4 border-blue-800  bg-gray-500 md:justify-self-start"
        />
        <table className="min-w-full table-auto text-center md:text-left">
          <thead>
            <tr>
              <th className="py-4 text-xl">User Information</th>
            </tr>
          </thead>
          <tbody className="text-center md:text-left">
            <tr>
              <td className="text-xl">Utente:</td>
              <td className="cursor-pointer px-5 duration-500 ease-out hover:text-blue-500">
                {dataUserBlockchain?.account?.isConnecting
                  ? "Loading..."
                  : dataUserBlockchain?.account?.address || "Address not found"}
              </td>
            </tr>
            <tr>
              <td className="text-xl">Ruolo:</td>
              <td className="cursor-pointer px-5 duration-500 ease-out hover:text-blue-500">
                TODO: RuoloUtente form contract (es. Esperto, Amministratore, Pubblico ministero, etc.)
              </td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th className="py-4 text-xl">Network Information</th>
            </tr>
          </thead>
          <tbody className="text-center md:text-left">
            <tr>
              <td className="text-xl">Rete attuale: </td>
              <td className="cursor-pointer px-5 duration-500 ease-out hover:text-blue-500">
                {dataUserBlockchain?.account?.isDisconnected
                  ? "Not connected"
                  : dataUserBlockchain?.network?.chain?.name +
                      " (" +
                      dataUserBlockchain?.network?.chain?.nativeCurrency.symbol +
                      ")" || "Loading..."}
              </td>
            </tr>
            <tr>
              <td className="text-xl">Saldo per operazioni: </td>
              <td className="cursor-pointer px-5 duration-500 ease-out hover:text-blue-500">
                {dataUserBlockchain?.balance?.isFetching
                  ? "Loading..."
                  : dataUserBlockchain?.balance?.data?.formatted || "Balance not found"}
              </td>
            </tr>
            <tr>
              <td className="text-xl">Contratto di riferimento: </td>
              <td className="cursor-pointer px-5 duration-500 ease-out hover:text-blue-500">
                TODO: IndirizzoContratto (es. 0x1234567890abcdef1234567890abcdef12345678)
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
