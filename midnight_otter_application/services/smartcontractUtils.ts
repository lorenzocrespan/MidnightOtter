// Get abi and address from the deployed contract fetching github repo

//function getContractAbiAndAddress() {
const smartcontractData = fetch(
  // https://docs.github.com/en/rest?apiVersion=2022-11-28
  // https://api.github.com/repos/{username}/{repository_name}/contents/{file_path}
  "https://api.github.com/repos/lorenzocrespan/MidnightOtter/contents/smartcontractData/MidnightOtter.json",
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
    const decodedContent = atob(data.content);
    // Parsing the content to JSON
    const parsedContent = JSON.parse(decodedContent);
    // Getting the abi
    const abi = parsedContent.abi;
    // Getting the address
    const address = parsedContent.address;
    console.log(abi);
    console.log(address);
    // Returning the abi and the address
    return { abi, address };
  })
  .catch((error) => console.log(error));
// return smartcontractData;
// }

// getContractAbiAndAddress();
