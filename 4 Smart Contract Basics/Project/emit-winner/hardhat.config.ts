import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'dotenv/config';

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    goerli: {
      url: process.env.GOERLI_URL ?? 'url',
      accounts: [process.env.GOERLI_PRIVATE_KEY ?? 'key'],
    },
    local: {
      url: process.env.LOCAL_URL ?? 'test',
      accounts: [process.env.LOCAL_PRIVATE_KEY ?? 'key'],
    }
  }
};

export default config;
