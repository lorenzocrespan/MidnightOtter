"use client";

export function UserManagerCard() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex w-full gap-5 text-lg">
        <div className="flex flex-col p-2">
          <h2 className="font-bold">Ruolo: Admin </h2>
          <h2 className="font-bold">Nome utente: Lorenzo Crespan </h2>
          <h2>
            Identificativo wallet eth: 0xec2a9b4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4
          </h2>
        </div>
        <div className="flex grow" />
        <div className="flex justify-center gap-5">
          <div className="flex flex-col justify-center">
            <select className="w-full rounded-md p-2 text-sm text-slate-900 outline outline-1 outline-slate-400">
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>
          <button className="flex flex-col justify-center">
            <p className="text-base">Rimuovi</p>
          </button>
        </div>
      </div>
    </div>
  );
}
