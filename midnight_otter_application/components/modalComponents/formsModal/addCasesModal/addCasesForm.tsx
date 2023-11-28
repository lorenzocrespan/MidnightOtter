"use client";
import * as React from "react";

import { CaseInput } from "@/components/baseComponents/inputs/caseDataInput";
import { addCasesFormConfig } from "@/config/addCasesFormConfig";
import { FormProvider, useForm } from "react-hook-form";
import { SubtitleInputText } from "@/components/baseComponents/inputs/subtitleInputText";
import { AbsoluteSpinner } from "@/components/pageComponents/spinnerLoadingComponent";
import { useRouter } from "next/navigation";
import Web3, { ContractAbi } from "web3";
import { BrowserProvider, ethers, JsonRpcSigner } from "ethers";

interface FormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AddCasesForm({ className, ...props }: FormProps) {
  // Load ABI and contract address
  const [abi, setAbi] = React.useState<ContractAbi>([]);
  const [contractAddress, setContractAddress] = React.useState<string>("");

  React.useEffect(() => {
    const loadAbi = async () => {
      // Get ABI from public/smartsContract.json
      const response = await fetch("/smartcontract.json");
      const data = await response.json();
      console.log("ABI: ", data.abi);
      setAbi(data.abi);
    };
    loadAbi();
  }, []);

  React.useEffect(() => {
    const loadContractAddress = async () => {
      // Hardcoded contract address
      const address = "0x1bf296B7F9B19DdA530bAA8D15d8D840e1f62209";
      setContractAddress(address);
      console.log("Contract address: ", address);
    };
    loadContractAddress();
  }, []);
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const methods = useForm();
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: {
    [key: string]: number | string | string[];
  }) => {
    setIsLoading(true);
    console.log(data);
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();

    console.log("Block:", await provider.getBlockNumber());

    const contract = new ethers.Contract(contractAddress, abi, provider) as any;

    const daiWithSigner = contract.connect(signer);

    // Add empty arry to data object in a new key
    data["expertReports"] = [];

    // const tx = await daiWithSigner.unsafeMint(
    //   "0x1bf296B7F9B19DdA530bAA8D15d8D840e1f62209",
    //   data
    // );

    // console.log("Transaction: ", tx);

    // Send transaction to the smart contract
    const response = await contract.getActualTokenId();
    console.log("Response: ", response);
    if (true) {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex h-auto flex-col justify-between gap-5 rounded-md p-12"
      {...props}
    >
      {isLoading && <AbsoluteSpinner />}
      <FormProvider {...methods}>
        <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Informazioni caso</h1>
            <p className="text-xl"> Inserisci le informazioni del caso.</p>
            <h3 className="text-xl font-bold">Nome del caso:</h3>
            <CaseInput {...addCasesFormConfig.nameCase} disabled={isLoading} />
            {errors.nameCase && (
              <SubtitleInputText text={errors.nameCase.message?.toString()} />
            )}
            <h3 className="text-xl font-bold">
              Identificativo numerico del caso:
            </h3>
            <CaseInput
              {...addCasesFormConfig.numberCase}
              disabled={isLoading}
            />
            {errors.numberCase && (
              <SubtitleInputText text={errors.numberCase.message?.toString()} />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Informazioni caso</h1>
            <p className="text-xl">
              {" "}
              Inserisci le informazioni sull'oggetto del caso.
            </p>
            <h3 className="text-xl font-bold">Identificativo dell'oggetto:</h3>
            <CaseInput
              {...addCasesFormConfig.nameObject}
              disabled={isLoading}
            />
            {errors.nameObject && (
              <SubtitleInputText text={errors.nameObject.message?.toString()} />
            )}
            <h3 className="text-xl font-bold">Descrizione dell'oggetto:</h3>
            <CaseInput
              {...addCasesFormConfig.descriptionObject}
              disabled={isLoading}
            />
            {errors.descriptionObject && (
              <SubtitleInputText
                text={errors.descriptionObject.message?.toString()}
              />
            )}
          </div>
        </form>
      </FormProvider>
      <div className="relative">
        <div className="absolute inset-0 z-10 flex items-center">
          <span className="w-full border-t border-slate-300" />
        </div>
      </div>
      <button
        type="button"
        className="my-4 w-full rounded-md py-2 text-sm text-white outline outline-1 outline-slate-400 hover:bg-gray-800"
        onClick={handleSubmit(onSubmit)}
        disabled={isLoading}
      >
        Carica
      </button>
    </div>
  );
}
