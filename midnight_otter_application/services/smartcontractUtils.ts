// Get abi and address from the deployed contract fetching github repo
import { Abi, Narrow } from "viem";

export const getContractAbiAndAddress = (): Promise<{
  abi: Narrow<readonly unknown[] | Abi>;
  address: `0x${string}`;
}> => {
  const smartcontractData = fetch(
    // https://docs.github.com/en/rest?apiVersion=2022-11-28
    // https://api.github.com/repos/{username}/{repository_name}/contents/{file_path}
    "https://api.github.com/repos/lorenzocrespan/MidnightOtter/contents/midnight_otter_smartcontract/MidnightOtter.json",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/vnd.github.v3+json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      // Decoding the content of the file
      const decodedContent = Buffer.from(data.content, "base64").toString();
      // Parsing the content to JSON
      const parsedContent = JSON.parse(decodedContent);
      // Getting the abi and the address
      const abi = parsedContent.abi;
      const address = parsedContent.address;
      // Returning the abi and the address
      return { abi, address };
    })
    .catch((error) => {
      console.error(error);
      return error;
    });
  return smartcontractData;
};
