import { QR } from "@/components/baseComponents/qr";
import ExpertRelation from "@/components/levelOneComps/addExpertRelation";
import DownloadCase from "@/components/levelOneComps/downloadPDF";

export default function Page({
  params,
}: {
  params: { exihibitByIdPage: string };
}) {
  // <div>My Post: {params.exihibitByIdPage}</div>
  // <ExpertRelation />
  return (
    <div>
      <div className="container mx-auto flex h-auto flex-col justify-between gap-5 rounded-md  p-10">
        <div className="flex flex-row">
          <div className="basis-2/3 py-5 text-2xl font-semibold">
            <p>
              Scheda form -{" "}
              <span className="text-gray-100">{params.exihibitByIdPage}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-row space-x-16 space-y-0">
          <div className="flex flex-col">
            <QR />
            <div className="flex flex-col gap-3 pb-5">
              <div className="flex gap-2">
                <p className="text-xl">Condivisione</p>{" "}
                <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
                  Condividi
                </button>
              </div>
              <div className="flex gap-2">
                <p className="text-xl">
                  Cambia stato da prova a reterto e viceversa
                </p>{" "}
                <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
                  Cambio
                </button>
              </div>
              <div className="flex gap-2">
                <p>Scarica il PDF</p>
                <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
                  PDF
                </button>
                <DownloadCase />
              </div>
              <div className="flex gap-2">
                <p>Scarica l&apos;etichetta QR</p>
                <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
                  QR
                </button>
              </div>
            </div>
          </div>
          <div className="min-w-full">
            <div className="text-left text-lg">
              <h2 className="pb-2 text-2xl font-semibold">Informazioni caso</h2>
              <div className="flex flex-col gap-3 pb-5">
                <div className="flex gap-2">
                  <p className="text-xl">Nome caso:</p>
                </div>
                <div className="flex gap-2">
                  <p className="text-xl">Numero caso:</p>
                </div>
              </div>
              <h2 className="pb-2 text-2xl font-semibold">
                Informazioni oggetto acquisito
              </h2>
              <div className="flex flex-col gap-3 pb-5">
                <div className="flex gap-2">
                  <p className="text-xl">
                    Identificativo numerico dell&apos;oggetto:
                  </p>{" "}
                </div>
                <div className="flex gap-2">
                  <p className="text-xl">Tipologia oggetto:</p>{" "}
                </div>
                <div className="flex gap-2">
                  <p className="text-xl">Descrizione oggetto acquisito:</p>{" "}
                </div>
                <div className="flex gap-2">
                  <p className="text-xl">Ragioni dell&apos;acquisizione:</p>{" "}
                </div>
              </div>
              <h2 className="pb-2 text-2xl font-semibold">
                Informazioni proprietario dell&apos;oggetto
              </h2>
              <div className="flex flex-col gap-3 pb-5">
                <div className="flex gap-2">
                  <p className="text-xl">Proprietario:</p>
                </div>
                <div className="flex gap-2">
                  <p className="text-xl">Contatti proprietario:</p>
                </div>
              </div>
              <h2 className="pb-2 text-2xl font-semibold">
                Informazioni perito dell&apos;acquisizione
              </h2>
              <div className="flex flex-col gap-3 pb-5">
                <div className="flex gap-2">
                  <p className="text-xl">Agente:</p>
                </div>
                <div className="flex gap-2">
                  <p className="text-xl">Contatti agente:</p>
                </div>
              </div>
              <h2 className="pb-2 text-2xl font-semibold">
                Lista relazioni esperti
              </h2>
              <div className="flex flex-col gap-3 pb-5">
                <div className="flex gap-2">
                  <p className="text-xl">Data relazione:</p>
                </div>
                <div className="flex gap-2">
                  <p className="text-xl">URI relazione:</p>
                </div>
              </div>
              <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
                Aggiungi relazione
              </button>

              <h2 className="pb-2 text-2xl font-semibold">
                Catena di custodia
              </h2>
              <div className="container mx-auto max-w-7xl">
                <div className="grid gap-4 sm:grid-cols-12">
                  <div className="relative col-span-12  sm:col-span-9">
                    <div className="relative col-span-12 space-y-12 px-4 before:bg-gray-100 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:-left-3 sm:before:bottom-0 sm:before:top-2 sm:before:w-0.5"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
