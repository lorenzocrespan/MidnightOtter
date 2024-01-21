"use client";

import DownloadCase from "@/components/levelOneComps/downloadPDF";
import DownloadSVG from "@/components/levelOneComps/downloadSVG";

export default function ExihibitActionComponent() {
  return (
    <div className="flex flex-col gap-3 pb-5">
      <div className="mb-5 flex flex-col gap-1">
        <h2 className="text-2xl font-bold">Azioni eseguibili</h2>
        <span className="h-px w-full bg-gradient-to-r from-slate-500 to-black" />
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold">Trasferimento repert / prova</h2>
        <span className="h-px w-full bg-gradient-to-r from-slate-700 to-black" />
        <p className="text-sm">Invia il reperto / prova ad un altro esperto.</p>
        <button className="my-4 self-end rounded-md px-2 py-2 text-sm text-white outline outline-1 outline-slate-400 hover:bg-gray-800">
          Trasferisci
        </button>
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold">Condivisione</h2>
        <span className="h-px w-full bg-gradient-to-r from-slate-700 to-black" />
        <p className="text-sm">
          Permetti ad altri esperti di poter caricare relazioni.
        </p>
        <button className="my-4 self-end rounded-md px-2 py-2 text-sm text-white outline outline-1 outline-slate-400 hover:bg-gray-800">
          Condividi
        </button>
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold">
          Cambio stato del reperto / prova
        </h2>
        <span className="h-px w-full bg-gradient-to-r from-slate-700 to-black" />
        <p className="text-sm">
          Modifica lo stato da reperto a prova e viceversa.
        </p>
        <button className="my-4 self-end rounded-md px-2 py-2 text-sm text-white outline outline-1 outline-slate-400 hover:bg-gray-800">
          Cambio stato reperto / prova
        </button>
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold">Scarica il PDF</h2>
        <span className="h-px w-full bg-gradient-to-r from-slate-700 to-black" />
        <p className="text-sm">
          Scarica il PDF con tutte le informazioni del reperto / prova.
        </p>
        <DownloadCase />
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold">
          Scarica l&apos;etichetta del reperto / prova
        </h2>
        <span className="h-px w-full bg-gradient-to-r from-slate-700 to-black" />
        <p className="text-sm">Scarica l&apos;etichetta del reperto / prova.</p>
        <DownloadSVG />
      </div>
    </div>
  );
}
