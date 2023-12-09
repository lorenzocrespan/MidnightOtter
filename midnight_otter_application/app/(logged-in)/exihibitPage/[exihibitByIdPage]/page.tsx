import { QR } from "@/components/baseComponents/qr";

export default function Page({
  params,
}: {
  params: { exihibitByIdPage: string };
}) {
  
  // <div>My Post: {params.exihibitByIdPage}</div>
  return (
    <div className="container mx-auto flex h-auto flex-col justify-between gap-5 rounded-md  p-10">
      <div className="flex flex-row">
        <div className="basis-2/3 py-5 text-2xl font-semibold text-amber-500">
          <p>
            Scheda form -{" "}
            <span className="text-gray-100">{params.exihibitByIdPage}</span>
          </p>
        </div>
        <div className="flex h-fit basis-1/3 flex-row justify-end gap-2 self-center">
          <span className="rounded-md bg-amber-500 px-5 py-2  font-bold  text-blue-900">
            <span>Disponibile</span>
          </span>
        </div>
      </div>
      <div className="flex flex-row space-x-16 space-y-0">
        <QR />
        <div className="min-w-full">
          <div className="text-left text-lg">
            <h2 className="pb-2 text-2xl font-semibold text-amber-500">
              Informazioni caso
            </h2>
            <div className="flex flex-col gap-3 pb-5">
              <div className="flex gap-2">
                <p className="text-xl">Nome caso:</p>
              </div>
              <div className="flex gap-2">
                <p className="text-xl">Numero caso:</p>
              </div>
            </div>
            <h2 className="pb-2 text-2xl font-semibold text-amber-500">
              Informazioni oggetto acquisito
            </h2>
            <div className="flex flex-col gap-3 pb-5">
              <div className="flex gap-2">
                <p className="text-xl">Identificativo numerico dell&apos;oggetto:</p>{" "}
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
            <h2 className="pb-2 text-2xl font-semibold text-amber-500">
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
            <h2 className="pb-2 text-2xl font-semibold text-amber-500">
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
            <h2 className="pb-2 text-2xl font-semibold text-amber-500">
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
  );
}
