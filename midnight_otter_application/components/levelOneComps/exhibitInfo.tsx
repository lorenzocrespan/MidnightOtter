"use client";
// React and Next imports
import { getContractAbiAndAddress } from "@/services/smartcontractUtils";
import { InjectedConnector } from "@wagmi/core";
import { useCallback, useEffect, useState } from "react";
import { Abi, Narrow } from "viem";
import { useAccount, useContractRead } from "wagmi";
import { connect, readContract } from "wagmi/actions";
import Link from "next/link";
import { ChainCustody, isExihibit } from "@/types/smartContractType";

export default function ExihibitInfoComponent({
  params,
}: {
  params: { exihibitByIdPage: string };
}) {
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

  const { address, isConnected } = useAccount();

  const [contractInfo, setContractInfo] = useState<{
    abi: Narrow<readonly unknown[] | Abi>;
    address: `0x${string}`;
  }>();

  // Call read function "getRole" from smart contract
  const { data, isSuccess } = useContractRead({
    address: contractInfo?.address,
    abi: contractInfo?.abi,
    functionName: "getExihibitProperties",
    enabled: isConnected,
    account: address,
    args: [params.exihibitByIdPage],
  });

  console.log("params", data);

  return (
    <div className="min-w-full">
      <div className="text-left text-lg">
        <h2 className="pb-2 text-2xl font-semibold">Informazioni caso</h2>
        <div className="flex flex-col gap-3 pb-5">
          <div className="flex gap-2">
            <p className="text-xl">
              Numero caso:{" "}
              {isSuccess && isExihibit(data)
                ? String(data.exhibitInformation.caseNumber)
                : "..."}
            </p>
          </div>
        </div>
        <h2 className="pb-2 text-2xl font-semibold">
          Informazioni oggetto acquisito
        </h2>
        <div className="flex flex-col gap-3 pb-5">
          <div className="flex gap-2">
            <p className="text-xl">
              Identificativo numerico dell&apos;oggetto:
              {isSuccess && isExihibit(data)
                ? String(data.exhibitInformation.objectId)
                : "..."}
            </p>{" "}
          </div>
          <div className="flex gap-2">
            <p className="text-xl">
              Descrizione oggetto acquisito:{" "}
              {isSuccess && isExihibit(data)
                ? String(data.exhibitInformation.objectDescription)
                : "..."}
            </p>{" "}
          </div>
          <div className="flex gap-2">
            <p className="text-xl">Tempo acquisizione:</p>{" "}
            {isSuccess && isExihibit(data)
              ? String(data.exhibitInformation.seizedEpochTime)
              : "..."}
          </div>
          <div className="flex gap-2">
            <p className="text-xl">Luogo acquisizione:</p>{" "}
            {isSuccess && isExihibit(data)
              ? String(data.exhibitInformation.seizedLocation)
              : "..."}
          </div>
        </div>
        <h2 className="pb-2 text-2xl font-semibold">
          Informazioni perito dell&apos;acquisizione
        </h2>
        <div className="flex flex-col gap-3 pb-5">
          <div className="flex gap-2">
            <p className="text-xl">Agente:</p>
          </div>
          <div className="flex gap-2">
            <p className="text-xl">Contatti agente:</p>
          </div>
        </div>
        <h2 className="pb-2 text-2xl font-semibold">Lista relazioni esperti</h2>
        <div className="flex flex-col gap-3 pb-5">
          <div className="flex gap-2">
            <p className="text-xl">Data relazione:</p>
          </div>
          <div className="flex gap-2">
            <p className="text-xl">URI relazione:</p>
          </div>
        </div>
        <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
          Aggiungi relazione
        </button>

        <h2 className="pb-2 text-2xl font-semibold">Catena di custodia</h2>
        <div className="relative col-span-12 space-y-6 px-4 sm:col-span-9">
          <div className="relative col-span-12 space-y-12 px-4 before:dark:bg-gray-700 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:-left-3 sm:before:bottom-0 sm:before:top-2 sm:before:w-0.5">
            {isSuccess && isExihibit(data) ? (
              data.chainCustody.map((item: ChainCustody, idx: any) => (
                <div
                  key={idx}
                  className="flex flex-col before:dark:bg-violet-400 sm:relative sm:before:absolute sm:before:left-[-35px] sm:before:top-2 sm:before:z-[1] sm:before:h-4 sm:before:w-4 sm:before:rounded-full"
                >
                  <h3 className="tracki text-xl font-semibold">
                    {item.action}
                  </h3>
                  <time className="tracki text-xs uppercase dark:text-gray-400">
                    {new Date(Number(item.timestamp)*1000).toLocaleString()}
                  </time>
                  <div className="flex flex-col gap-3 pb-5">
                    <div className="flex gap-2">
                      <p className="text-xl">Azione avviata da {item.releasedBy} e terminata da {item.receivedBy}</p>
                    </div>
                </div>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
