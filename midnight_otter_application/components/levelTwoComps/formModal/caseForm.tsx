"use client";
// React imports
import { useCallback, useEffect, useState, HTMLAttributes } from "react";

// Import utils and types
import { addCasesFormConfig } from "@/config/addCasesFormConfig";
import { FormProvider, useForm } from "react-hook-form";
// React components imports
import { InputCase } from "@/components/levelOneComps/form/inputCase";
import { getContractAbiAndAddress } from "@/services/smartcontractUtils";

import { SubtitleInputText } from "@/components/baseComponents/inputs/subtitleInputText";
import { AbsoluteSpinner } from "@/components/pageComponents/spinnerLoadingComponent";
// Wagmi imports
import { connect } from "wagmi/actions";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useContractWrite, useAccount } from "wagmi";
import { Abi, Narrow } from "viem";

// Form props interface
interface FormProps extends HTMLAttributes<HTMLDivElement> {}

export function AddCaseForm({ className, ...props }: FormProps) {
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

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const methods = useForm();
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const { writeAsync } = useContractWrite({
    address: contractInfo?.address,
    abi: contractInfo?.abi,
    functionName: "createCase",
    account: address,
  });

  const onSubmit = async (dataExihibits: {
    [key: string]: number | string | string[];
  }) => {
    setIsLoading(true);
    // Valid: ["nameCase"]
    writeAsync({
      args: [dataExihibits.caseName],
    }).then(() => {
      setIsLoading(false);
    });
  };

  return (
    <div
      className="flex h-auto flex-col justify-between gap-5 rounded-md p-12"
      {...props}
    >
      {isLoading && <AbsoluteSpinner />}
      <FormProvider {...methods}>
        <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-10">
            <div>
              <h1 className="text-3xl font-bold">Informazioni caso</h1>
              <p className="text-xl">
                Inserire le informazioni relative al caso.
              </p>
              <div className="flex flex-row gap-5">
                <div className="flex grow flex-col gap-2">
                  <h3 className="text-xl font-bold">Nome del caso</h3>
                  <InputCase
                    {...addCasesFormConfig.caseName}
                    disabled={isLoading}
                  />
                  {errors.caseName && (
                    <SubtitleInputText
                      text={errors.caseName.message?.toString()}
                    />
                  )}
                </div>
              </div>
            </div>
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
