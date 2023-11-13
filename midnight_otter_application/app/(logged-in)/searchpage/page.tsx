"use client";
import * as React from "react";
// React components imports
import { getFileFromIPFS } from "@/services/infura";

import { FormProvider, set, useForm } from "react-hook-form";
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

  const [files, setFiles] = React.useState<any>([]);

  async function onSubmit(data: { [key: string]: string }) {
    console.log(data);
    setIsLoading(true);
    const fileFromIPFS = await getFileFromIPFS({ Hash: data.hash });
    console.log("file:", fileFromIPFS);
    // create a list of file downlodables
    setFiles((prevState: any) => [...prevState, fileFromIPFS]);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <FormProvider {...methods}>
        <form className="flex min-w-full flex-col items-center  gap-4">
          <div className="flex w-1/3 flex-col items-center gap-4">
            <IdentityInput {...searchFormConfig.hash} disabled={isLoading} />
            {errors.hash && (
              <SubtitleInputText text={errors.hash.message?.toString()} />
            )}
            <button
              type="button"
              className="my-4 w-32 rounded-md py-2 text-sm text-white outline outline-1 outline-slate-400 hover:bg-gray-800"
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
            >
              Ricerca ...
            </button>
          </div>
        </form>
      </FormProvider>
      <div className="flex flex-col items-center gap-4 p-4">
            Result ricerca:
            {files.map((file: any, idx: any) => {
              console.log("file:", file);
              // Create a list of file downlodables
              return (
                <div key={idx} className="flex flex-col items-center gap-4">
                  <div className="flex flex-col items-center gap-4">
                    file : {file.hash}
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    file.type : 
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    file.size : {file.size}
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    file.lastModified :
                  </div>
                  <a className="flex flex-col items-center gap-4" href={file.url} download={file.name + ".pdf"}>
                    Download
                  </a>
                </div>);
            })}
      </div>
    </div>
  );
}
