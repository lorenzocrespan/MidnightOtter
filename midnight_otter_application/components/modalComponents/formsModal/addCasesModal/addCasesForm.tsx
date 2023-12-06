"use client";
import * as React from "react";

import { CaseInput } from "@/components/baseComponents/inputs/caseDataInput";
import { addCasesFormConfig } from "@/config/addCasesFormConfig";
import { FormProvider, useForm } from "react-hook-form";
import { SubtitleInputText } from "@/components/baseComponents/inputs/subtitleInputText";
import { AbsoluteSpinner } from "@/components/pageComponents/spinnerLoadingComponent";

interface FormProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 *  Un form per il trattamento dei reperti si compone delle seguenti informazioni:
 *  - Case Number
 *  - Submitting Officer
 *  - Offense
 *  - Victim
 *  - Suspect
 *  - Date/Time Seized
 *  - Location of Seizure
 *  Per ogni oggetto si delineano le seguenti informazioni:
 *  - Object Number
 *  - Quantity
 *  - Description
 *  La catena di un reperto si compone delle seguenti informazioni:
 *  - Object Number
 *  - Date/Time
 *  - Released by
 *  - Received by
 *  - Comments/Location
 */

export function AddCasesForm({ className, ...props }: FormProps) {
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
