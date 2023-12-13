"use client";

// React imports
import { useState, HTMLAttributes, useCallback, useEffect } from "react";
import { AbsoluteSpinner } from "@/components/pageComponents/spinnerLoadingComponent";
import { useRouter } from "next/navigation";

import { connect } from "wagmi/actions";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useAccount, useContractRead } from "wagmi";
import { getContractAbiAndAddress } from "@/services/smartcontractUtils";
import { Abi, Narrow } from "viem";

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

export function UserSigninForm({ className, ...props }: UserAuthFormProps) {
  const errorAddress =
    "0x0000000000000000000000000000000000000000000000000000000000000000";
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { address, isConnected } = useAccount();

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

  // Call read function "getRole" from smart contract
  const { data } = useContractRead({
    address: contractInfo?.address,
    abi: contractInfo?.abi,
    functionName: "getRole",
    enabled: isConnected,
    account: address,
    onSuccess: (data) => {
      if (data !== errorAddress) {
        router.push("/userMainPage");
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
    },
  });

  const onSubmit = () => {
    connect({
      connector: new InjectedConnector(),
    })
      .then(() => {
        console.log("User is connected to Metamask.");
        setIsLoading(true);
      })
      .catch(() => {
        // If the user is already connected to Metamask, try the
        if (data !== errorAddress) {
          console.log(data);
          console.log("User is registered.");
          router.push("/userMainPage");
        }
        console.log("User is not registered");
      });
    setIsLoading(false);
    return;
  };

  return (
    <div className="flex flex-col gap-5" {...props}>
      {isLoading && <AbsoluteSpinner />}
      <button
        type="button"
        className="my-4 w-full rounded-md py-2 text-sm text-white outline outline-1 outline-slate-400 hover:bg-gray-800"
        onClick={onSubmit}
        disabled={isLoading}
      >
        Sign In
      </button>
      <div className="relative">
        <div className="absolute inset-0 z-10 flex items-center">
          <span className="w-full border-t border-slate-300" />
        </div>
      </div>
    </div>
  );
}
