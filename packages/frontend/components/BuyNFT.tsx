import { ShowItem } from "../types/item";

const BuyNFT: React.FC<{ nft: ShowItem }> = (prop) => {
  const nft = prop.nft;
  const buyNFT = (nft: ShowItem) => {};

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
