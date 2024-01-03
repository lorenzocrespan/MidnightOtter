"use client";
// React imports
import { useCallback, useEffect, useState, HTMLAttributes } from "react";

// Import utils and types
import { addCasesFormConfig } from "@/config/addCasesFormConfig";
import { FormProvider, useForm } from "react-hook-form";
// React components imports
import { InputCase } from "@/components/levelOneComps/form/inputCase";

import { SubtitleInputText } from "@/components/baseComponents/inputs/subtitleInputText";
import { AbsoluteSpinner } from "@/components/pageComponents/spinnerLoadingComponent";
// Wagmi imports
import { connect } from "wagmi/actions";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useContractWrite, useAccount } from "wagmi";
import { Abi, Narrow } from "viem";

import { getContractAbiAndAddress } from "@/services/smartcontractUtils";

// Form props interface
interface FormProps extends HTMLAttributes<HTMLDivElement> {}

export function AddExihibitsForm({ className, ...props }: FormProps) {
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
    functionName: "safeMint",
    account: "0x88dc97e187b4d31eEbC50c3bC6546a732C12eC74",
  });

  const onSubmit = async (dataExihibits: {
    [key: string]: number | string | string[];
  }) => {
    setIsLoading(true);
    console.log(dataExihibits);
    // Valid: [12,"pippo",0,"pippo",11,1,1,"pippo","pippo",111,0,[""],[10,"a","a","transazione"]]
    writeAsync({
      args: [
        "0x88dc97e187b4d31eEbC50c3bC6546a732C12eC74",
        Number(dataExihibits.caseNumber),
        dataExihibits.objectDescription,
        dataExihibits.seizedLocation,
      ],
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
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold">Numero del caso</h3>
                  <InputCase
                    {...addCasesFormConfig.caseNumber}
                    disabled={isLoading}
                  />
                  {errors.caseNumber && (
                    <SubtitleInputText
                      text={errors.caseNumber.message?.toString()}
                    />
                  )}
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold">
                Informazioni oggetto acquisito
              </h1>
              <p className="text-xl">
                Inserire le informazioni relative all&apos;oggetto acquisito.
              </p>
              <h3 className="text-xl font-bold">
                Descrizione dell&apos;oggetto
              </h3>
              <InputCase
                {...addCasesFormConfig.objectDescription}
                disabled={isLoading}
              />
              {errors.objectDescription && (
                <SubtitleInputText
                  text={errors.objectDescription.message?.toString()}
                />
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold">Informazioni acquisizione</h1>
              <p className="text-xl">
                Inserire le informazioni relative all&apos;acquisizione.
              </p>
              <div className="flex flex-row gap-5">
                <div className="flex grow flex-col gap-2">
                  <h3 className="text-xl font-bold">Località</h3>
                  <InputCase
                    {...addCasesFormConfig.seizedLocation}
                    disabled={isLoading}
                  />
                  {errors.seizedLocation && (
                    <SubtitleInputText
                      text={errors.seizedLocation.message?.toString()}
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
