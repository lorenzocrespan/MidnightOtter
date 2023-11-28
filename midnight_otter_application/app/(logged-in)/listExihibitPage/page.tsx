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
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="flex flex-col items-center gap-4 p-4">
        <h1 className="text-3xl font-bold">Lista casi</h1>
        <p className="text-xl"> Seleziona il caso da visualizzare.</p>
        <div className="flex flex-col items-center gap-4">
          {Object.keys(groupedListCases).map((keyName, i) => (
            <div className="flex flex-col items-center gap-4 p-4" key={i}>
              <h1 className="text-3xl font-bold">{keyName}</h1>
              <div className="flex flex-col items-center gap-4">
                {groupedListCases[keyName].map((item: any, idx: any) => (
                  <div key={idx} className="flex flex-col items-center gap-4">
                    <div className="flex flex-col items-center gap-4">
                      Nome caso : {item.name}
                    </div>
                    <div className="flex flex-col items-center gap-4">
                      Numero caso : {item.number}
                    </div>
                    <div className="flex flex-col items-center gap-4">
                      <button
                        type="button"
                        className="my-4 w-32 rounded-md py-2 text-sm text-white outline outline-1 outline-slate-400 hover:bg-gray-800"
                        // onClick={handleSubmit(onSubmit)}
                        // disabled={isLoading}
                      >
                        Visualizza
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
