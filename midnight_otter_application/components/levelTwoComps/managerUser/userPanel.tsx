"use client";

import { UserManagerCard } from "@/components/levelOneComps/userManager/userCard";
import { UserRequestManagerCard } from "@/components/levelOneComps/userManager/userRequestCard";
import { getContractAbiAndAddress } from "@/services/smartcontractUtils";
import { InjectedConnector } from "@wagmi/core";
import { useCallback, useEffect, useState } from "react";
import { Abi, Narrow } from "viem";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import { connect } from "wagmi/actions";

export function UserManagerPanel() {
  connect({
    connector: new InjectedConnector(),
  })
    .then(() => {
      console.log("User is connected to Metamask.");
    })
    .catch(() => {
      console.log("User is not registered");
    });

  const { address, isConnected } = useAccount();

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
  // Call read function "getRole" from smart contract
  const { data } = useContractRead({
    address: contractInfo?.address,
    abi: contractInfo?.abi,
    functionName: "getRoleRequests",
    enabled: isConnected,
    account: address,
  });

  const responseFunction = useContractWrite({
    address: contractInfo?.address,
    abi: contractInfo?.abi,
    functionName: "responseRoleRequest",
    account: address,
  });

  const approveAction = (isApprove: boolean, idRequest: number) => {
    console.log(idRequest);
    responseFunction
      .writeAsync({
        args: [idRequest, isApprove],
      })
      .then(() => {
        console.log("Response");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex h-auto flex-col justify-between gap-5 rounded-md p-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Lista richieste utenti</h1>
        <p className="text-base">Seleziona l&apos;utente da visualizzare.</p>
      </div>
      <div className="flex flex-col gap-5">
        {Array.isArray(data) && data.length > 0 ? (
          data.map(
            (user: any) => (
              console.log(user),
              (
                <UserRequestManagerCard
                  user={{
                    name: user.name,
                    surname: user.surname,
                    user: user.user,
                    role: user.role,
                    requestId: user.requestId,
                  }}
                  approveAction={approveAction}
                  key={user.user}
                />
              )
            )
          )
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="flex w-full gap-5 text-lg">
              <div className="flex flex-col p-2">
                <h2 className="font-bold">Nessuna richiesta</h2>
                <h3>Non ci sono richieste di ruolo in attesa.</h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
