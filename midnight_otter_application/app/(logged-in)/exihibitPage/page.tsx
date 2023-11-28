// Next imports
import { ChevronRight, Dot } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const listCases = [
    { name: "Caso 2", number: "5674" },
    { name: "Caso 1", number: "1234" },
    { name: "Caso 2", number: "5678" },
  ];

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

  const groupedListCases = groupCasesByProperty(listCases, "name");
  console.log("groupedListCases:", groupedListCases);

  return (
    <div className="flex h-auto flex-col justify-between gap-5 rounded-md p-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Lista casi</h1>
        <p className="text-base"> Seleziona il caso da visualizzare.</p>
      </div>
      <div className="flex flex-col gap-5">
        {Object.keys(groupedListCases).map((keyName, i) => (
          <div className="flex flex-col gap-5 p-4" key={i}>
            <h1 className="flex text-3xl font-bold">
              {keyName}
            </h1>
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
