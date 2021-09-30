import { ShowItem } from "../types/item";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { nftAddress, nftMarketAddress } from "../config/address";
import Market from "../../hardhat/artifacts/contracts/Market.sol/NFTMarket.json";
import { useRouter } from "next/dist/client/router";

const BuyNFT: React.FC<{ nft: ShowItem }> = (prop) => {
  const router = useRouter();
  const nft = prop.nft;
  const buyNFT = async (nft: ShowItem) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(nftMarketAddress, Market.abi, signer);

    const price = ethers.utils.parseUnits(nft.price, "ether");
    const transaction = await contract.createMarketSale(
      nftAddress,
      nft.tokenId,
      { value: price }
    );
    await transaction.wait();
    router.push("/");
  };

  return (
    <>
      <button
        className="w-full bg-green-400 text-white font-bold py-2 px-12 rounded"
        onClick={() => buyNFT(nft)}
      >
        Buy NFT
      </button>
    </>
  );
};

export default BuyNFT;
