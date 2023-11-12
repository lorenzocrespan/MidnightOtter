"use client";
import * as React from "react";
// React components imports
import { Icons } from "@/components/baseComponents/icons";
import { getFileFromIPFS } from "@/services/infura";
import { debugConsole } from "@/services/debugConsole";

import { FormProvider, useForm } from "react-hook-form";
import { searchFormConfig } from "@/config/searchFormConfig";
import { IdentityInput } from "@/components/baseComponents/inputs/hashInput";
import { SubtitleInputText } from "@/components/baseComponents/inputs/subtitleInputText";
interface SearchDataProps {
  buttonTitle: string;
}

export default function Page() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const methods = useForm();
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  async function onSubmit (data: { [key: string]: string }) {
    console.log(data);
    setIsLoading(true);
    const fileFromIPFS = await getFileFromIPFS({ Hash: data.hash });
    console.log(fileFromIPFS);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <FormProvider {...methods}>
        <form>
          <div className="grid gap-3">
            <IdentityInput {...searchFormConfig.hash} disabled={isLoading} />
            {errors.hash && (
              <SubtitleInputText text={errors.hash.message?.toString()} />
            )}
            <button
              type="button"
              className="my-4 w-full rounded-md py-2 text-sm text-white outline outline-1 outline-slate-400 hover:bg-gray-800"
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
            >
              Ricerca ...
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
