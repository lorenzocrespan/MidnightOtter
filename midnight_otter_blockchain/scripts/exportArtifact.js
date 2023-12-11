const fs = require("fs");
// Get the contract data from the artifact file
const contractAddress = require("../ignition/deployments/chain-11155111/deployed_addresses.json");
const contractSmartContract = require("../ignition/deployments/chain-11155111/artifacts/MidnightOtter#MidnightOtter.json");
// create the contract data object
const contractData = {
  address: contractAddress["MidnightOtter#MidnightOtter"],
  abi: contractSmartContract["abi"],
};
// Convert the contract data object to JSON string
const jsonData = JSON.stringify(contractData, null, 2);
// Create the smartcontractData directory if it does not exist
if (!fs.existsSync("../midnight_otter_smartcontract")) {
  fs.mkdirSync("../midnight_otter_smartcontract");
}
// Write the JSON string to the file
fs.writeFileSync(
  "../midnight_otter_smartcontract/MidnightOtter.json",
  jsonData
);
