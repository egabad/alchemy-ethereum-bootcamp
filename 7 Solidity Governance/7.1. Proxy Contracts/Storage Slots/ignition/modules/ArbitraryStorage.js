const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ArbitraryStorageModule", (m) => {
  const storage = m.contract("ArbitraryStorage");

  return { storage };
});
