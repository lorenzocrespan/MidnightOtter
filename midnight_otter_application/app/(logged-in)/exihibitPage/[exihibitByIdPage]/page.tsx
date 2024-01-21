import ExpertRelation from "@/components/levelOneComps/addExpertRelation";

import QR from "@/components/baseComponents/qr";
import ExihibitActionComponent from "@/components/levelOneComps/exhibitAction";
import ExihibitInfoComponent from "@/components/levelOneComps/exhibitInfo";

export default function Page({
  params,
}: {
  params: { exihibitByIdPage: string };
}) {
  // <ExpertRelation />
  return (
    <div className="container mx-auto flex h-auto flex-col justify-between gap-5 rounded-md  p-10">
      <div className="flex flex-row space-x-16 space-y-0">
        <div className="flex w-96 flex-col">
          <QR exihibit={params.exihibitByIdPage} />
          <ExihibitActionComponent />
        </div>
        <ExihibitInfoComponent params={params} />
      </div>
    </div>
  );
}
