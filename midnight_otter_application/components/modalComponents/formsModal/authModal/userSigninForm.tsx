"use client";

import * as React from "react";

import { IdentityInput } from "@/components/baseComponents/inputs/identityInput";
import { passwordConfig, signFormConfig } from "@/config/signFormConfig";
import { FormProvider, useForm } from "react-hook-form";
import { SubtitleInputText } from "@/components/baseComponents/inputs/subtitleInputText";
import { PasswordInput } from "@/components/baseComponents/inputs/passwordInput";
import { AbsoluteSpinner } from "@/components/pageComponents/spinnerLoadingComponent";
import { useRouter } from "next/navigation";

import { useReducer } from "react";
import { connectWallet } from "@/services/metamaskUtils";
import { MetaMaskReducer, metamaskState } from "@/services/metamaskProvider";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserSigninForm({ className, ...props }: UserAuthFormProps) {
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
    const wallet = await connectWallet();
    if (wallet) {
      console.log(wallet);
      dispatch({ type: "CONNECT", account: wallet });
      router.push("/homepage");
      setIsLoading(false);
    }
  };

  const initialState: metamaskState = {
    account: "",
    network: "",
    isConnected: false,
    balance: 0,
  };

  const [state, dispatch] = useReducer(MetaMaskReducer, initialState);

  return (
    <div className="flex flex-col gap-5" {...props}>
      {isLoading && <AbsoluteSpinner />}
      <FormProvider {...methods}>
        <form>
          <div className="grid gap-3">
            <IdentityInput {...signFormConfig.email} disabled={isLoading} />
            {errors.email && (
              <SubtitleInputText text={errors.email.message?.toString()} />
            )}
            <PasswordInput {...passwordConfig} disabled={isLoading} />
            {errors.password_1 && (
              <SubtitleInputText text={errors.password_1.message?.toString()} />
            )}
            <button
              type="button"
              className="my-4 w-full rounded-md py-2 text-sm text-white outline outline-1 outline-slate-400 hover:bg-gray-800"
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
            >
              Sign In
            </button>
          </div>
        </form>
      </FormProvider>
      <div className="relative">
        <div className="absolute inset-0 z-10 flex items-center">
          <span className="w-full border-t border-slate-300" />
        </div>
      </div>
    </div>
  );
}
