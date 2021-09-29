import { task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const INFURA_ID = process.env.INFURA_ID;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_ID}`,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    mumbai: {
      url: `https://rpc-mumbai.maticvigil.com`,
      accounts: [`0x${PRIVATE_KEY}`],
      gasPrice: 8000000000,
    },
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        runs: 200,
      },
    },
  },
};
