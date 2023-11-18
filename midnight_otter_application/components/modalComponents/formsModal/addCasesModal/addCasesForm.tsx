"use client";
import * as React from "react";

import { CaseInput } from "@/components/baseComponents/inputs/caseDataInput";
import { addCasesFormConfig } from "@/config/addCasesFormConfig";
import { FormProvider, useForm } from "react-hook-form";
import { SubtitleInputText } from "@/components/baseComponents/inputs/subtitleInputText";
import { AbsoluteSpinner } from "@/components/pageComponents/spinnerLoadingComponent";
import { useRouter } from "next/navigation";

interface FormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AddCasesForm({ className, ...props }: FormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const methods = useForm();
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: { [key: string]: string }) => {
    setIsLoading(true);
    console.log(data);
    if (true) {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5" {...props}>
      {isLoading && <AbsoluteSpinner />}
      <FormProvider {...methods}>
        <form>
          <div className="grid gap-3">
            <CaseInput {...addCasesFormConfig.nameCase} disabled={isLoading} />
            {errors.nameCase && (
              <SubtitleInputText text={errors.nameCase.message?.toString()} />
            )}
            <CaseInput {...addCasesFormConfig.numberCase} disabled={isLoading} />
            {errors.numberCase && (
              <SubtitleInputText text={errors.numberCase.message?.toString()} />
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
