"use client";
// React imports
import { useState, useEffect, HTMLAttributes, useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";

import { IdentityInput } from "@/components/baseComponents/inputs/identityInput";
import { SubtitleInputText } from "@/components/baseComponents/inputs/subtitleInputText";
import { signFormConfig } from "@/config/signFormConfig";
import { AbsoluteSpinner } from "@/components/pageComponents/spinnerLoadingComponent";
// Wagmi imports
import { connect } from "wagmi/actions";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useAccount, useContractWrite } from "wagmi";
// Import smart contract
import { getContractAbiAndAddress } from "@/services/smartcontractUtils";
import { Abi, Narrow } from "viem";
import Web3 from "web3";

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

export default function UserSignupForm({
  className,
  ...props
}: UserAuthFormProps) {
  const [isLoadingComponent, setIsLoading] = useState<boolean>(false);

  const methods = useForm();

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

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

  const { writeAsync } = useContractWrite({
    address: contractInfo?.address,
    abi: contractInfo?.abi,
    functionName: "addRequestRoleList",
  });

  const { isConnected } = useAccount();

  const onSubmit = async (dataRequestedAccount: { [key: string]: string }) => {
    setIsLoading(true);
    console.log(contractInfo);
    // Setup wagmi connection
    if (!isConnected) {
      connect({
        connector: new InjectedConnector(),
      }).then((account) => {
        if (account) {
          // function addRequestRoleList(bytes32 role, string memory name, string memory surname)
          writeAsync({
            args: [
              Web3.utils.padRight(
                Web3.utils.asciiToHex(dataRequestedAccount.role),
                64
              ),
              dataRequestedAccount.name,
              dataRequestedAccount.surname,
            ],
          }).then(() => {
            setIsLoading(false);
          });
        } else {
          console.log("Error while connecting to Metamask.");
          setIsLoading(false);
        }
      });
    } else {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5" {...props}>
      {isLoadingComponent && <AbsoluteSpinner />}
      <FormProvider {...methods}>
        <form>
          <div className="grid gap-3">
            <IdentityInput
              {...signFormConfig.name}
              disabled={isLoadingComponent}
            />
            {errors.name && (
              <SubtitleInputText text={errors.name.message?.toString()} />
            )}
            <IdentityInput
              {...signFormConfig.surname}
              disabled={isLoadingComponent}
            />
            {errors.surname && (
              <SubtitleInputText text={errors.surname.message?.toString()} />
            )}
            <IdentityInput
              {...signFormConfig.role}
              disabled={isLoadingComponent}
            />
            {errors.role && (
              <SubtitleInputText text={errors.role.message?.toString()} />
            )}
            <button
              type="button"
              className="my-4 w-full rounded-md py-2 text-sm text-white outline outline-1 outline-slate-400 hover:bg-gray-800"
              onClick={handleSubmit(onSubmit)}
              disabled={isLoadingComponent}
            >
              Sign Up
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
