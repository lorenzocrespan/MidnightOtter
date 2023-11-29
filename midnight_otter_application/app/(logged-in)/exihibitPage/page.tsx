"use client";
import * as React from "react";
// Next imports
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  getContract,
  callReadOnly,
} from "@/services/midnightOtterSmartContract";

export default function Page() {
  const loadExihibitByUser = async () => {
    console.log("Load exihibit by user");
    const contract = await getContract();
    const response = await callReadOnly(contract, "getOwnerCases", [
      "0x1bf296B7F9B19DdA530bAA8D15d8D840e1f62209",
    ]);
    console.log("Response: ", response);
    // For each case, get the case data
    const casesData = await Promise.all(
      response.map(async (item: any) => {
        const caseData = await callReadOnly(contract, "getCaseProperties", [
          item,
        ]);
        return caseData;
      })
    );
    console.log("Cases data: ", casesData);
    const resultFormatted = casesData.map((item: any) => {
      return {
        name: item[0],
        number: item[1],
      };
    });
    console.log("Result formatted: ", resultFormatted);

    return resultFormatted;
  };

  const groupCasesByProperty = (listCases: any, property: any) => {
    return listCases.reduce((acc: any, obj: any) => {
      const key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      // Add object to list for given key's value
      acc[key].push(obj);
      return acc;
    }, {});
  };

  // const groupedListCases: any = loadExihibitByUser().then((result) => {
  //   console.log("Final result: ", result);
  //   const groupedListCases = groupCasesByProperty(result, "name");
  //   console.log("Grouped list cases: ", groupedListCases);
  //   return groupedListCases;
  // });

  const [groupedListCases, setGroupedListCases] = React.useState({});

  React.useEffect(() => {
    loadExihibitByUser().then((result) => {
      console.log("Final result: ", result);
      const grouped = groupCasesByProperty(result, "name");
      console.log("Grouped list cases: ", grouped);
      setGroupedListCases(grouped);
    });
  }, []);

  return (
    <div className="flex h-auto flex-col justify-between gap-5 rounded-md p-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Lista casi</h1>
        <p className="text-base"> Seleziona il caso da visualizzare.</p>
      </div>
      <div className="flex flex-col gap-5">
        {Object.keys(groupedListCases).map((keyName: any, i: any) => (
          <div className="flex flex-col gap-5 p-4" key={i}>
            <h1 className="flex text-3xl font-bold">{keyName}</h1>
            <span className="w-full border-t border-slate-600" />
            <div className="flex flex-col items-center gap-4">
              {groupedListCases[keyName].map((item: any, idx: any) => (
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
