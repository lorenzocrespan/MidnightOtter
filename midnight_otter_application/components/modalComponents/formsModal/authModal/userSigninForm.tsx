"use client";

import React from "react";
import { useForm, FormProvider} from "react-hook-form";
import { Icons } from "@/components/baseComponents/icons";
import { IdentityInput } from "@/components/baseComponents/inputs/identityInput";
import { PasswordInput } from "@/components/baseComponents/inputs/passwordInput";

import {
  signinFormConfig,
  verifyPasswordConfig,
} from "@/config/signinFormConfig";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserSigninForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const methods = useForm();
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data: { [key: string]: string }, errors: any) => {
    // If one of the fields returns an error, the form will not be submitted
    if (errors) {
      console.log(errors);
      return;
    }
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
            <IdentityInput {...signinFormConfig.email} disabled={isLoading} />
            <p>Errore: {errors.email && "Email is required"}</p>
            <IdentityInput {...signinFormConfig.name} disabled={isLoading} />
            <p>Errore: {errors.name && "Name is required"}</p>
            <IdentityInput {...signinFormConfig.surname} disabled={isLoading} />
            <p>Errore: {errors.surname && "Surname is required"}</p>
            <PasswordInput {...verifyPasswordConfig} disabled={isLoading} />
            <p>Errore: {errors.password_1 && "Password (1) is required"}</p>
            <p>Errore: {errors.password_2 && "Password (2) is required"}</p>
            <button
              type="button"
              className="w-full rounded-md py-2 text-sm text-white outline outline-1 outline-slate-400 hover:bg-gray-800"
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
            >
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign In
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
