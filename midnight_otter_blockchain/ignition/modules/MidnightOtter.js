const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("MidnightOtter", (m) => {
  const apollo = m.contract("MidnightOtter", [
    "0xCcCac956aD1e1B84880aD653c815266864A95bd1",
  ]);

  return { apollo };
});
