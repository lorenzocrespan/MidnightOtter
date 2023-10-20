export function UserInformation() {
  return (
    <div className="flex h-auto justify-between rounded-md p-12">
      <div className="flex flex-row gap-16">
        <img
          src={"https://avatars.dicebear.com/api/avataaars/placeholder.svg"}
          className="m-2 h-28 w-28 flex-shrink-0 rounded-full border-4 border-blue-800  bg-gray-500 md:justify-self-start"
        />
        <table className="min-w-full table-auto text-center md:text-left">
          <thead>
            <tr>
              <th className="text-xl">User Information</th>
            </tr>
          </thead>
          <tbody className="text-center md:text-left">
            <tr>
              <td className="text-xl">Utente:</td>
              <td className="cursor-pointer px-5 duration-500 ease-out hover:text-amber-500">
                NomeUtente CognomeUtente
              </td>
            </tr>
            <tr>
              <td className="text-xl">Ruolo:</td>
              <td className="cursor-pointer px-5 duration-500 ease-out hover:text-amber-500">
                RuoloUtente
              </td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th className="text-xl">Network Information</th>
            </tr>
          </thead>
          <tbody className="text-center md:text-left">
            <tr>
              <td className="text-xl">Rete attuale: </td>
              <td className="cursor-pointer px-5 duration-500 ease-out hover:text-amber-500">
                IdentificativoNetwork
              </td>
            </tr>
            <tr>
              <td className="text-xl">Saldo per operazioni: </td>
              <td className="cursor-pointer px-5 duration-500 ease-out hover:text-amber-500">
                Saldo ETH
              </td>
            </tr>
            <tr>
              <td className="text-xl">Contratto di riferimento: </td>
              <td className="cursor-pointer px-5 duration-500 ease-out hover:text-amber-500">
                RiferimentoContratto
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
