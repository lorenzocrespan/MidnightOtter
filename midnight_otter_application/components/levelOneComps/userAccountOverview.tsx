"use client";
import { connect } from "wagmi/actions";
import { InjectedConnector } from "wagmi/connectors/injected";
import Image from "next/image";
// Wagmi imports
import { useAccount, useNetwork, useBalance, useContractRead } from "wagmi";
import { useCallback, useEffect, useState } from "react";
import { getContractAbiAndAddress } from "@/services/smartcontractUtils";
import { Abi, Narrow } from "viem";
import Web3 from "web3";

export default function UserAccountOverviewComponent() {
  connect({
    connector: new InjectedConnector(),
  })
    .then(() => {
      console.log("User is connected to Metamask.");
    })
    .catch(() => {
      console.log("User is not registered");
    });

  const fetchData = useCallback(async () => {
    const contractInfo = await getContractAbiAndAddress();
    setContractInfo(contractInfo);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const [contractInfo, setContractInfo] = useState<{
    abi: Narrow<readonly unknown[] | Abi>;
    address: `0x${string}`;
  }>();

  const { address, isConnected } = useAccount();

  function matchRole(role: string) {
    console.log(role);
    switch (role) {
      case Web3.utils.sha3("MANTAINER_ROLE"):
        return "Mantainer";
      case Web3.utils.keccak256("PUBLIC_ADMIN_ROLE"):
        return "Public Administrator";
      case Web3.utils.keccak256("EXPERT_ROLE"):
        return "Expert";
      case Web3.utils.keccak256("LAWYER_ROLE"):
        return "Lawyer";
      default:
        return "Role not found";
    }
  }

  const role = useContractRead({
    address: contractInfo?.address,
    abi: contractInfo?.abi,
    functionName: "getRoleByAddress",
    enabled: isConnected,
    account: address,
    args: [address],
  });

  /**
   * @description Variable that stores the state of the user's account.
   * It is an object that contains the user's address, the network they are
   * connected to, and their balance.
   */
  const dataUserBlockchain = {
    account: useAccount(),
    network: useNetwork(),
    balance: useBalance({ address: useAccount().address }),
    role: matchRole(role?.data as string),
    contract: contractInfo?.address,
  };

  return (
    <div className="flex h-auto justify-between rounded-md p-12">
      <div className="flex flex-row gap-16">
        <Image
          src="https://avatar.iran.liara.run/public/37"
          width={200}
          height={200}
          priority
          className="m-2 my-8 h-36 w-36 flex-shrink-0 rounded-full border-4 border-blue-800  bg-gray-500 md:justify-self-start"
          alt="User avatar"
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
                {dataUserBlockchain?.role}
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
                      dataUserBlockchain?.network?.chain?.nativeCurrency
                        .symbol +
                      ")" || "Loading..."}
              </td>
            </tr>
            <tr>
              <td className="text-xl">Saldo per operazioni: </td>
              <td className="cursor-pointer px-5 duration-500 ease-out hover:text-blue-500">
                {dataUserBlockchain?.balance?.isFetching
                  ? "Loading..."
                  : dataUserBlockchain?.balance?.data?.formatted ||
                    "Balance not found"}
              </td>
            </tr>
            <tr>
              <td className="text-xl">Contratto di riferimento: </td>
              <td className="cursor-pointer px-5 duration-500 ease-out hover:text-blue-500">
                {dataUserBlockchain?.contract}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
