import { Contract } from "ethers";
import { config, ethers, network } from "hardhat";
// import fs from "fs";

async function main() {
  // fs.unlinkSync(
  //   `${config.paths.artifacts}/contracts/addresses/${network.name}ContractAddress.ts`
  // );

  const NFTMarketContract = await ethers.getContractFactory("NFTMarket");
  const nftMarketContract = await NFTMarketContract.deploy();
  await nftMarketContract.deployed();
  console.log("NFT Market Contract deployed: ", nftMarketContract.address);

  const NFTContract = await ethers.getContractFactory("NFT");
  const nftContract = await NFTContract.deploy(nftMarketContract.address);
  await nftContract.deployed();
  console.log("NFT Contract deployed: ", nftContract.address);
  // saveFrontendFiles(nftContract, "NFTContract");
  // saveFrontendFiles(nftMarketContract, "NFTMarketContract");
}

// function saveFrontendFiles(contract: Contract, contractName: string) {
//   fs.appendFileSync(
//     `${config.paths.artifacts}/contracts/addresses/${network.name}ContractAddress.ts`,
//     `export const ${contractName}Address = '${contract.address}'`
//   );
// }

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
