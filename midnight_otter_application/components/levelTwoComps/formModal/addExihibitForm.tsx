"use client";
// React imports
import { useState } from "react";
// Import utils and types
import { addCasesFormConfig } from "@/config/addCasesFormConfig";
import { FormProvider, useForm } from "react-hook-form";
// React components imports
import { InputCase } from "@/components/levelOneComps/form/inputCase";
import { ToggleCase } from "@/components/levelOneComps/form/toggleCase";

import { SubtitleInputText } from "@/components/baseComponents/inputs/subtitleInputText";
import { AbsoluteSpinner } from "@/components/pageComponents/spinnerLoadingComponent";
// Wagmi imports
import { useContractWrite } from "wagmi";
// Import smart contract
import contractABI from "@/services/smartcontract.json";

// Form props interface
interface FormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AddExihibitsForm({ className, ...props }: FormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const methods = useForm();
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const { writeAsync } = useContractWrite({
    address: "0xCcCac956aD1e1B84880aD653c815266864A95bd1",
    abi: contractABI.abi,
    functionName: "unsafeMint",
  });

  const onSubmit = async (dataExihibits: {
    [key: string]: number | string | string[];
  }) => {
    setIsLoading(true);
    // Valid: [12,"pippo",0,"pippo",11,1,1,"pippo","pippo",111,0,[""],[10,"a","a","transazione"]]
    writeAsync({
      args: [
        "0xCcCac956aD1e1B84880aD653c815266864A95bd1",
        [
          dataExihibits.numberCase as number,
          dataExihibits.nameObject,
          dataExihibits.nameObject,
          dataExihibits.nameObject,
          ["https://ipf"],
        ],
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
            <div>
              <h1 className="text-3xl font-bold">
                Informazioni oggetto acquisito
              </h1>
              <p className="text-xl">
                Inserire le informazioni relative all'oggetto acquisito.
              </p>
              <div className="flex flex-row gap-5">
                <div className="flex grow flex-col gap-2">
                  <h3 className="text-xl font-bold">Identificativo oggetto</h3>
                  <InputCase
                    {...addCasesFormConfig.objectId}
                    disabled={isLoading}
                  />
                  {errors.objectId && (
                    <SubtitleInputText
                      text={errors.objectId.message?.toString()}
                    />
                  )}
                </div>
                <div className="flex grow flex-col gap-2">
                  <h3 className="text-xl font-bold">Quantità</h3>
                  <InputCase
                    {...addCasesFormConfig.objectQuantity}
                    disabled={isLoading}
                  />
                  {errors.objectQuantity && (
                    <SubtitleInputText
                      text={errors.objectQuantity.message?.toString()}
                    />
                  )}
                </div>
              </div>
              <h3 className="text-xl font-bold">Descrizione dell'oggetto</h3>
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
                Inserire le informazioni relative all'acquisizione.
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
                <div className="flex grow flex-col gap-2">
                  <h3 className="text-xl font-bold">Data</h3>
                  <InputCase
                    {...addCasesFormConfig.seizedEpochTime}
                    disabled={isLoading}
                  />
                  {errors.seizedEpochTime && (
                    <SubtitleInputText
                      text={errors.seizedEpochTime.message?.toString()}
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
