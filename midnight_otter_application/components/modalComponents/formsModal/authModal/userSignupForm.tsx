"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Icons } from "@/components/baseComponents/icons";
import { IdentityInput } from "@/components/baseComponents/inputs/identityInput";
import { PasswordInput } from "@/components/baseComponents/inputs/passwordInput";
import { SubtitleInputText } from "@/components/baseComponents/inputs/subtitleInputText";
import { signFormConfig, verifyPasswordConfig } from "@/config/signFormConfig";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserSignupForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const methods = useForm();
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data: { [key: string]: string }) => {
    console.log(data);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-5" {...props}>
      <FormProvider {...methods}>
        <form>
          <div className="grid gap-3">
            <IdentityInput {...signFormConfig.email} disabled={isLoading} />
            {errors.email && (
              <SubtitleInputText text={errors.email.message?.toString()} />
            )}
            <IdentityInput {...signFormConfig.name} disabled={isLoading} />
            {errors.name && (
              <SubtitleInputText text={errors.name.message?.toString()} />
            )}
            <IdentityInput {...signFormConfig.surname} disabled={isLoading} />
            {errors.surname && (
              <SubtitleInputText text={errors.surname.message?.toString()} />
            )}
            <PasswordInput {...verifyPasswordConfig} disabled={isLoading} />
            {errors.password_1 && (
              <SubtitleInputText text={errors.password_1.message?.toString()} />
            )}
            {errors.password_2 && (
              <SubtitleInputText text={errors.password_2.message?.toString()} />
            )}
            <button
              type="button"
              className="my-4 w-full rounded-md py-2 text-sm text-white outline outline-1 outline-slate-400 hover:bg-gray-800"
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
            >
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign Up
            </button>
          </div>
        </form>
      </FormProvider>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-slate-300" />
        </div>
      </div>
    </div>
  );
}
