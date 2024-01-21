"use client";
// React and Next imports
import { getContractAbiAndAddress } from "@/services/smartcontractUtils";
import { InjectedConnector } from "@wagmi/core";
import { useCallback, useEffect, useState } from "react";
import { Abi, Narrow } from "viem";
import { useAccount, useContractRead } from "wagmi";
import { connect, readContract } from "wagmi/actions";
import Link from "next/link";
// Other imports
import { ChevronRight } from "lucide-react";
import { groupedExihibitsCasesType, isArray } from "@/types/smartContractType";

export default function Page() {
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

  // groupedExihibitsCases contains the list of exihibits grouped by case identifier.
  const [groupedExihibitsCases, setgroupedExihibitsCases] =
    useState<groupedExihibitsCasesType>({});

  // Call read function "getRole" from smart contract
  const ownerCases = useContractRead({
    address: contractInfo?.address,
    abi: contractInfo?.abi,
    functionName: "getOwnerCases",
    enabled: isConnected,
    account: address,
    args: [address],
  });

  useEffect(() => {
    if (ownerCases.data && contractInfo && isArray(ownerCases.data)) {
      // For each case, get the list of exihibits and group them by case identifier.
      ownerCases.data.forEach((item: any) => {
        readContract({
          address: contractInfo?.address,
          abi: contractInfo?.abi,
          functionName: "getExihibitProperties",
          account: address,
          args: [item],
        }).then((res) => {
          console.log("Risultato", res);
          groupCasesByProperty(res, "caseNumber");
        });
      });
    }
  }, [ownerCases.data]);

  const groupCasesByProperty = (caseTest: any, property: string) => {
    console.log("Case", caseTest);
    // Push the case in the array grouped by case identifier.
    if (groupedExihibitsCases[caseTest.exhibitInformation[property]]) {
      groupedExihibitsCases[caseTest.exhibitInformation[property]].push(
        caseTest
      );
      setgroupedExihibitsCases(groupedExihibitsCases);
    } else {
      groupedExihibitsCases[caseTest.exhibitInformation[property]] = [caseTest];
    }
    console.log("Grouped", groupedExihibitsCases);
  };

  return (
    <div className="flex h-auto flex-col justify-between gap-5 rounded-md p-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Prove a carico</h1>
        <p className="text-base">
          Lista delle prove attualmente a carico dell&apos;utente.
        </p>
      </div>
      <div className="flex flex-col gap-5">
        {Object.keys(groupedExihibitsCases).map((keyName: any, i: any) => (
          <div className="flex flex-col gap-5 p-4" key={i}>
            <h1 className="flex text-3xl font-bold">Caso {keyName}</h1>
            <span className="w-full border-t border-slate-400" />
            <div className="flex flex-col items-center gap-4">
              {groupedExihibitsCases[keyName].map((item: any, idx: any) => (
                <div key={idx} className="flex w-full flex-col gap-2">
                  <div className="flex gap-5 text-lg">
                    <div className="flex flex-col p-2">
                      <h2 className="font-bold">
                        Identificativo prova:{" "}
                        {Number(item.exhibitInformation.objectId)}
                      </h2>
                      <p className="text-base">
                        {item.exhibitInformation.objectDescription}
                      </p>
                    </div>
                    <div className="flex grow" />
                    <div
                      className={
                        "h-fit w-24 select-none self-center rounded-full px-2 py-1 text-center text-base font-bold text-gray-900 " +
                        (item.exhibitInformation.isExihibit
                          ? "bg-green-700"
                          : "bg-red-700")
                      }
                      title="Prova o Reperto"
                    >
                      <span>
                        {item.exhibitInformation.isExihibit
                          ? "Prova"
                          : "Reperto"}
                      </span>
                    </div>
                    <div className="flex flex-col justify-center">
                      <Link
                        href={`/exihibitPage/${Number(
                          item.exhibitInformation.objectId
                        )}`}
                      >
                        <ChevronRight size={45} />
                      </Link>
                    </div>
                  </div>
                  <span className="h-px w-full bg-gradient-to-r from-slate-500 to-black" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
