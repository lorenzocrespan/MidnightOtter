const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("MidnightOtterRegistrationManager", (m) => {
  // Deploy the MidnightOtterRegistrationManager contract and return its address
  const midnightOtterRegistrationManager = m.contract(
    "MidnightOtterRegistrationManager",
    ["0xCcCac956aD1e1B84880aD653c815266864A95bd1"]
  );

  return { midnightOtterRegistrationManager };
});
