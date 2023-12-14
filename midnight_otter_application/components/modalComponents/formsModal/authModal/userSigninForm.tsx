"use client";

// React imports
import { useState, HTMLAttributes, useCallback, useEffect } from "react";
import { AbsoluteSpinner } from "@/components/pageComponents/spinnerLoadingComponent";
import { useRouter } from "next/navigation";
import { SiweMessage } from "siwe";
import { connect } from "wagmi/actions";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useAccount, useContractRead, useNetwork, useSignMessage } from "wagmi";
import { getContractAbiAndAddress } from "@/services/smartcontractUtils";
import { Abi, Narrow } from "viem";
import { signIn } from "next-auth/react";

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

export function UserSigninForm({ className, ...props }: UserAuthFormProps) {
  const { chain } = useNetwork();
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

  const { signMessageAsync } = useSignMessage();

  const handleLogin = async () => {
    try {
      const message = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement: "Sign in with Ethereum to the app.",
        uri: window.location.origin,
        version: "1",
        chainId: chain?.id,
      });
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });
      signIn("credentials", {
        message: JSON.stringify(message),
        redirect: true,
        signature,
        callbackUrl: "/userMainPage",
      });
    } catch (error) {
      window.alert(error);
    }
  };

  // Call read function "getRole" from smart contract
  useContractRead({
    address: contractInfo?.address,
    abi: contractInfo?.abi,
    functionName: "getRole",
    enabled: isConnected,
    account: address,
    onSuccess: (data) => {
      if (data !== errorAddress) {
        handleLogin();
        // Redirect to user main page
        // router.push("/userMainPage");
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
        console.log("User is not registered");
      });
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
