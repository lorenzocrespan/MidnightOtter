const fs = require("fs");
// Get the contract data from the artifact file
const contractAddress = require("../ignition/deployments/chain-11155111/deployed_addresses.json");
const contractSmartContract = require("../ignition/deployments/chain-11155111/artifacts/MidnightOtter#MidnightOtter.json");
// create the contract data object
const contractData = {
  address: contractAddress["MidnightOtter#MidnightOtter"],
  abi: contractSmartContract["abi"]
};
// Convert the contract data object to JSON string
const jsonData = JSON.stringify(contractData, null, 2);
// Create the smartcontractData directory if it does not exist
if (!fs.existsSync("../smartcontractData")) {
  fs.mkdirSync("../smartcontractData");
}
// Write the JSON string to the file
fs.writeFileSync("../smartcontractData/MidnightOtter.json", jsonData);
