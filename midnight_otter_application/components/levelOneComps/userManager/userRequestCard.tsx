"use client";

import Web3 from "web3";

interface Props {
  approveAction: (isApprove: boolean, isRequest: number) => void;
  user: {
    name: string;
    surname: string;
    user: string;
    role: string;
  };
}

export function UserRequestManagerCard({ approveAction, user }: Props) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex w-full gap-5 text-lg">
        <div className="flex flex-col p-2">
          <h2 className="font-bold">
            Nome utente: {user.name} {user.surname}
          </h2>
          <h2>Identificativo wallet eth: {user.user}</h2>
          <h3>Richiede il ruolo di {user.role}</h3>
        </div>
        <div className="flex grow" />
        <div className="flex justify-center gap-5">
          <button
            className="flex flex-col justify-center"
            onClick={() => approveAction(true, 1)}
          >
            <p className="text-base">Approva</p>
          </button>
          <button
            className="flex flex-col justify-center"
            onClick={() => approveAction(false, 1)}
          >
            <p className="text-base">Rifiuta</p>
          </button>
        </div>
      </div>
    </div>
  );
}
