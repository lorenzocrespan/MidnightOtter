"use client";
// React and Next imports
import * as React from "react";
import Link from "next/link";
// Other imports
import { ChevronRight } from "lucide-react";
import { groupedExihibitsCasesType } from "@/types/smartContractType";

export default function Page() {
  // groupedExihibitsCases contains the list of exihibits grouped by case identifier.
  const [groupedExihibitsCases, setgroupedExihibitsCases] =
    React.useState<groupedExihibitsCasesType>({});

  React.useEffect(() => {
    // Load the list of exihibits grouped by case identifier.
    loadExihibitByUser().then((result) => {
      console.log(
        "[List exihibit by user] Result from smart contract: ",
        result
      );
      const grouped = groupCasesByProperty(result, "name");
      console.log("[List exihibit by user] Grouped exihibits: ", grouped);
      setgroupedExihibitsCases(grouped);
    });
  }, []);

  const loadExihibitByUser = async () => {
    // Get the list of cases owned by the user
    // const contract = await getContract();
    // const response = await callReadOnly(contract, "getOwnerCases", [
    //   "0x1bf296B7F9B19DdA530bAA8D15d8D840e1f62209",
    // ]);
    // For each case, get the exihibit data and add it to the list
    // const casesData = await Promise.all(
    //   response.map(async (item: any) => {
    //     const caseData = await callReadOnly(contract, "getCaseProperties", [
    //       item,
    //     ]);
    //     return caseData;
    //   })
    // );
    // console.log("[List exihibit by user] Cases data: ", casesData);
    // const resultFormatted = casesData.map((item: any) => {
    //   return {
    //     name: item[0],
    //     number: item[1],
    //   };
    // });
    // console.log("[List exihibit by user] Result formatted: ", resultFormatted);
    return [];
  };

  const groupCasesByProperty = (
    listCases: groupedExihibitsCasesType[],
    property: string
  ) => {
    return listCases.reduce((acc: any, obj: any) => {
      const key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      // Add object to list for given key's value
      acc[key].push(obj);
      return acc;
    }, {} as groupedExihibitsCasesType);
  };

  return (
    <div className="flex h-auto flex-col justify-between gap-5 rounded-md p-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Lista casi</h1>
        <p className="text-base"> Seleziona il caso da visualizzare.</p>
      </div>
      <div className="flex flex-col gap-5">
        {Object.keys(groupedExihibitsCases).map((keyName: any, i: any) => (
          <div className="flex flex-col gap-5 p-4" key={i}>
            <h1 className="flex text-3xl font-bold">{keyName}</h1>
            <span className="w-full border-t border-slate-600" />
            <div className="flex flex-col items-center gap-4">
              {groupedExihibitsCases[keyName].map((item: any, idx: any) => (
                <div key={idx} className="flex w-full gap-5 text-lg">
                  <div className="flex flex-col p-2">
                    <h2 className="font-bold">Identificativo: {item.name}</h2>
                    <h2>Numero caso : {item.number}</h2>
                    <p className="text-base"> Descrizione caso.</p>
                  </div>
                  <div className="flex grow" />
                  <div className="flex flex-col justify-center">
                    <Link href={`/exihibitPage/${item.number}`}>
                      <ChevronRight size={45} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
