import { QR } from "@/components/baseComponents/qr";
import ExpertRelation from "@/components/levelOneComps/addExpertRelation";
import DownloadCase from "@/components/levelOneComps/downloadPDF";
import DownloadSVG from "@/components/levelOneComps/downloadSVG";
import ExihibitInfoComponent from "@/components/levelOneComps/exhibitInfo";

export default function Page({
  params,
}: {
  params: { exihibitByIdPage: string };
}) {
  console.log("params", params);
  // <ExpertRelation />
  return (
    <div>
      <div className="container mx-auto flex h-auto flex-col justify-between gap-5 rounded-md  p-10">
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
                <DownloadSVG />
              </div>
            </div>
          </div>
          <ExihibitInfoComponent params={params} />
        </div>
      </div>
    </div>
  );
}
