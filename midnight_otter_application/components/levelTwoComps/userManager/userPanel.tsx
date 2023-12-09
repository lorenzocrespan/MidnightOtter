"use client";

import { UserManagerCard } from "@/components/levelOneComps/userManager/userCard";
import { UserRequestManagerCard } from "@/components/levelOneComps/userManager/userRequestCard";

export function UserManagerPanel() {
  return (
    <div className="flex h-auto flex-col justify-between gap-5 rounded-md p-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Lista richieste utenti</h1>
        <p className="text-base">Seleziona l'utente da visualizzare.</p>
      </div>
      <div className="flex flex-col gap-5">
        <UserRequestManagerCard />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Lista utenti</h1>
        <p className="text-base">Seleziona l'utente da visualizzare.</p>
      </div>
      <div className="flex flex-col gap-5">
        <UserManagerCard />
      </div>
      <div className="flex flex-col gap-5">
        <button className="flex flex-col justify-center">
          <p className="text-base">Applica</p>
        </button>
      </div>
    </div>
  );
}
