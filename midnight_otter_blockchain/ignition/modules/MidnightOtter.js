const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("MidnightOtter", (m) => {
  // Deploy the MidnightOtterRegistrationManager contract and return its address
  const MidnightOtter = m.contract("MidnightOtter", [
    "0x69624a8904e5E55B7B5f9fBC0057410957bFf4B5",
  ]);

  return { MidnightOtter };
});
