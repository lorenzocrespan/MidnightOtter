const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("MidnightOtter", (m) => {
  // Deploy the MidnightOtterRegistrationManager contract and return its address
  const MidnightOtter = m.contract("MidnightOtter", [
    "0x223cf1fD3aF6ce8F469DDfA3E6E1BF57722F750a",
  ]);

  return { MidnightOtter };
});
