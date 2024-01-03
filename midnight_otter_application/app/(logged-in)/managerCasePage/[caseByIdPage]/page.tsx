"use client";

import { AddPartyForm } from "@/components/levelTwoComps/formModal/partyForm";
import { getContractAbiAndAddress } from "@/services/smartcontractUtils";
import { isCase, isNumberArray } from "@/types/smartContractType";
import { InjectedConnector } from "@wagmi/core";
import { useCallback, useEffect, useState } from "react";
import { Abi, Narrow } from "viem";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import { connect } from "wagmi/actions";
import { number } from "zod";

export default function Page({ params }: { params: { caseByIdPage: string } }) {
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
  const caseInfo = useContractRead({
    address: contractInfo?.address,
    abi: contractInfo?.abi,
    functionName: "getCaseProperties",
    account: address,
    args: [params.caseByIdPage],
    onSuccess: (data) => {
      console.log("Data:", data);
    },
  });

  const caseExihibits = useContractRead({
    address: contractInfo?.address,
    abi: contractInfo?.abi,
    functionName: "getCaseExihibits",
    account: address,
    args: [params.caseByIdPage],
    onSuccess: (data) => {
      console.log("Data:", data);
    },
  });

  return (
    <div>
      <div>My Post: {params.caseByIdPage}</div>
      {caseInfo.isSuccess && isCase(caseInfo.data) ? (
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <h2>Nome caso: {caseInfo.data.caseInformation.caseName}</h2>
            <h2>
              Giudice coinvolto: {caseInfo.data.caseInformation.assignedJudge}
            </h2>
            <h2>Stato caso: {caseInfo.data.caseInformation.caseStatus}</h2>
            <h2>Persone coinvolte: {caseInfo.data.assignedParties}</h2>
          </div>
          <div className="flex flex-col">
            <h2>Prove raccolte</h2>
            {caseExihibits.isSuccess && isNumberArray(caseExihibits.data) ? (
              <div className="flex flex-col">
                {caseExihibits.data.length === 0 ? (
                  <h2>Non ci sono prove per questo caso</h2>
                ) : (
                  caseExihibits.data.map((exihibit: any) => (
                    <div className="flex flex-col" key={exihibit.exihibitId}>
                      <h2>Nome prova: {exihibit.exihibitName}</h2>
                      <h2>Descrizione prova: {exihibit.exihibitDescription}</h2>
                      <h2>Stato prova: {exihibit.exihibitStatus}</h2>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <h2>Errore nel caricamento dei dati 1</h2>
            )}
          </div>
          <AddPartyForm caseNumber={Number(params.caseByIdPage)} />
        </div>
      ) : (
        <h2>Errore nel caricamento dei dati 3</h2>
      )}
    </div>
  );
}
