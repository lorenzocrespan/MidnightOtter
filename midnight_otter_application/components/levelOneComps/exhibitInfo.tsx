"use client";
// React and Next imports
import { getContractAbiAndAddress } from "@/services/smartcontractUtils";
import { InjectedConnector } from "@wagmi/core";
import { useCallback, useEffect, useState } from "react";
import { Abi, Narrow } from "viem";
import { useAccount, useContractRead } from "wagmi";
import { connect } from "wagmi/actions";
import { ChainCustody, isExihibit } from "@/types/smartContractType";

export default function ExihibitInfoComponent({
  params,
}: {
  params: { exihibitByIdPage: string };
}) {
  connect({
    connector: new InjectedConnector(),
  }).catch(() => {});

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

  return (
    <div className="text-left text-lg">
      {isSuccess && isExihibit(data) ? (
        <div className="min-w-full">
          <div className="flex flex-col gap-3 pb-10">
            <h2 className="text-2xl font-semibold">Informazioni del caso</h2>
            <span className="h-px w-full bg-gradient-to-r from-slate-500 to-black" />
            <div className="flex gap-2">
              <p className="text-xl">
                Numero del caso: {String(data.exhibitInformation.caseNumber)}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 pb-10">
            <h2 className="text-2xl font-semibold">Informazioni del reperto</h2>
            <span className="h-px w-full bg-gradient-to-r from-slate-500 to-black" />
            <div className="flex gap-2">
              <p className="text-xl">
                Identificativo univoco del reperto:{" "}
                {String(data.exhibitInformation.objectId)}
              </p>{" "}
            </div>
            <div className="flex gap-2">
              <p className="text-xl">
                Descrizione oggetto acquisito:{" "}
                {String(data.exhibitInformation.objectDescription)}
              </p>{" "}
            </div>
            <div className="flex gap-2">
              <p className="text-xl">Tempo acquisizione:</p>{" "}
              {new Date(
                Number(data.exhibitInformation.seizedEpochTime) * 1000
              ).toLocaleString()}
            </div>
            <div className="flex gap-2">
              <p className="text-xl">Luogo acquisizione:</p>{" "}
              {String(data.exhibitInformation.seizedLocation)}
            </div>
          </div>
          <div className="flex flex-col gap-3 pb-10">
            <h2 className="text-2xl font-semibold">Lista relazioni esperti</h2>
            <span className="h-px w-full bg-gradient-to-r from-slate-500 to-black" />
            {data.expertReports.length ? (
              <div>
                <div className="flex gap-2">
                  <p className="text-xl">URI relazione:</p>
                </div>
              </div>
            ) : (
              <div className="flex h-32  items-center self-center p-4">
                Nessuna relazione caricata per questo reperto.
              </div>
            )}
            <button className="my-4 w-1/5 self-end  rounded-md py-2 text-sm text-white outline outline-1 outline-slate-400 hover:bg-gray-800">
              Aggiungi relazione
            </button>
          </div>
          <div className="flex flex-col gap-3 pb-10">
            <h2 className="text-2xl font-semibold">Catena di custodia</h2>
            <span className="h-px w-full bg-gradient-to-r from-slate-500 to-black" />
            <div className="relative col-span-12 space-y-6 px-10">
              <div className="relative col-span-12 space-y-12 px-4 before:bg-blue-900 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:-left-3 sm:before:bottom-0 sm:before:top-2 sm:before:w-0.5">
                {data.chainCustody.map((item: ChainCustody, idx: any) => (
                  <div
                    key={idx}
                    className="flex flex-col before:bg-blue-700 sm:relative sm:before:absolute sm:before:left-[-35px] sm:before:top-2 sm:before:z-[1] sm:before:h-4 sm:before:w-4 sm:before:rounded-full"
                  >
                    <div className="flex flex-col gap-2">
                      <h3 className="text-xl font-semibold">{item.action}</h3>
                      <time className="text-sm  uppercase text-slate-200">
                        {new Date(
                          Number(item.timestamp) * 1000
                        ).toLocaleString()}
                      </time>
                      <div className="flex flex-col gap-3 pb-5">
                        <div className="flex gap-2">
                          <p className="text-lg">
                            {item.receivedBy ==
                            "0x0000000000000000000000000000000000000000"
                              ? "Evento promosso da " + item.releasedBy
                              : "L'evento promosso da " +
                                item.releasedBy +
                                " ed indirizzato a " +
                                item.receivedBy}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-w-full">
          <div className="flex h-32 items-center self-center p-4">
            Errore nel caricamento delle informazioni del reperto.
          </div>
        </div>
      )}
    </div>
  );
}
