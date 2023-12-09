"use client";

export function UserRequestManagerCard() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex w-full gap-5 text-lg">
        <div className="flex flex-col p-2">
          <h2 className="font-bold">Nome utente: Lorenzo Crespan </h2>
          <h2>
            Identificativo wallet eth: 0xec2a9b4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4
          </h2>
        </div>
        <div className="flex grow" />
        <div className="flex justify-center gap-5">
          <button className="flex flex-col justify-center">
            <p className="text-base">Approva</p>
          </button>
          <button className="flex flex-col justify-center">
            <p className="text-base">Rifiuta</p>
          </button>
        </div>
      </div>
    </div>
  );
}
