"use client";

import { useAccount } from "wagmi";

export function UserInformation() {

  const { address, isConnecting, isConnected, isDisconnected } = useAccount();

  console.log(address, isConnecting, isConnected, isDisconnected);

  const state = { account: address, network: "Rinkeby", balance: "0.00" };

  return (
    <div className="flex h-auto justify-between rounded-md p-12">
      <div className="flex flex-row gap-16">
        <img
          src={"https://avatars.dicebear.com/api/avataaars/placeholder.svg"}
          className="m-2 h-28 w-28 flex-shrink-0 rounded-full border-4 border-blue-800  bg-gray-500 md:justify-self-start"
        />
        <table className="min-w-full table-auto text-center md:text-left">
          <thead>
            <tr>
              <th className="text-xl">User Information</th>
            </tr>
          </thead>
          <tbody className="text-center md:text-left">
            <tr>
              <td className="text-xl">Utente:</td>
              <td className="cursor-pointer px-5 duration-500 ease-out hover:text-amber-500">
                {state?.account}
              </td>
            </tr>
            <tr>
              <td className="text-xl">Ruolo:</td>
              <td className="cursor-pointer px-5 duration-500 ease-out hover:text-amber-500">
                RuoloUtente
              </td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th className="text-xl">Network Information</th>
            </tr>
          </thead>
          <tbody className="text-center md:text-left">
            <tr>
              <td className="text-xl">Rete attuale: </td>
              <td className="cursor-pointer px-5 duration-500 ease-out hover:text-amber-500">
                {state?.network}
              </td>
            </tr>
            <tr>
              <td className="text-xl">Saldo per operazioni: </td>
              <td className="cursor-pointer px-5 duration-500 ease-out hover:text-amber-500">
                {state?.balance}
              </td>
            </tr>
            <tr>
              <td className="text-xl">Contratto di riferimento: </td>
              <td className="cursor-pointer px-5 duration-500 ease-out hover:text-amber-500">
                RiferimentoContratto
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
