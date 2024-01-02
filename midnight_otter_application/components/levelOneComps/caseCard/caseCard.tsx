"use client";

import { Abi, Narrow } from "viem";
import { useContractRead } from "wagmi";
import { isCase } from "@/types/smartContractType";

interface Props {
  id: number;
  contractInfo: {
    abi: Narrow<readonly unknown[] | Abi>;
    address: `0x${string}`;
  };
  address: `0x${string}`;
}

export function CaseCard(cases: Props) {
  // Call read function "getRole" from smart contract
  const { data, isSuccess } = useContractRead({
    address: cases.contractInfo?.address,
    abi: cases.contractInfo?.abi,
    functionName: "getCaseProperties",
    account: cases.address,
    args: [cases.id]
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex w-full gap-5 text-lg">
        <div className="flex flex-col p-2">
          <h2 className="font-bold">Numero caso: {Number(cases.id)}</h2>
          {isSuccess && isCase(data) ? (
            <>
              <h2>Nome caso: {data.caseInformation.caseName}</h2>
              <h2>Persone coinvolte: {data.assignedParties}</h2>
              <h2>Stato caso: {data.caseInformation.caseStatus}</h2>
            </>
          ) : (
            <h2>Errore nel caricamento dei dati</h2>
          )}
        </div>
        <div className="flex grow" />
      </div>
    </div>
  );
}
