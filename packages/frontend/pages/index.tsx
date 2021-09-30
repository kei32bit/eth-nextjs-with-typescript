import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { nftAddress, nftMarketAddress } from "../config/address";
import NFT from "../../hardhat/artifacts/contracts/NFT.sol/NFT.json";
import Market from "../../hardhat/artifacts/contracts/Market.sol/NFTMarket.json";
import axios from "axios";
import Loading from "../components/Loading/Loading";
import { MarketItem, ShowItem } from "../types/item";
import BuyNFT from "../components/BuyNFT";

const Home: NextPage = () => {
  const [nfts, setNfts] = useState<ShowItem[]>();
  const [loading, setLoading] = useState("not-loaded");

  useEffect(() => {
    fetchMarketItems();
  }, []);

  const fetchMarketItems = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const nftContract = new ethers.Contract(nftAddress, NFT.abi, provider);
    const marketContract = new ethers.Contract(
      nftMarketAddress,
      Market.abi,
      provider
    );
    const data: MarketItem[] = await marketContract.fetchNFTMarket();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenURI = await nftContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenURI);
        const price = ethers.utils.formatUnits(String(i.price), "ether");

        const item: ShowItem = {
          itemId: i.itemId,
          tokenId: i.tokenId,
          seller: i.seller,
          owner: i.owner,
          price: price,
          image: meta.data.image,
          name: meta.data.name,
          desc: meta.data.desc,
        };
        return item;
      })
    );
    setNfts(items);
    setLoading("loaded");
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-2">
      <Head>
        <title>NFT Market</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        {loading === "loaded" && !nfts?.length ? (
          <div className="justify-center text-center">There is no NFTs.</div>
        ) : loading === "not-loaded" ? (
          <div className="w-full">
            <Loading />
          </div>
        ) : (
          <div className="p-20 grid grid-cols-3 gap-4  sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
            {nfts?.map((nft, i) => (
              <div key={i} className="border shadow rounded-xl overflow-hidden">
                <img src={nft.image} />
                <div className="px-10 py-10">
                  <p
                    style={{ height: "64px" }}
                    className="font-bold text-xl mb-2"
                  >
                    {nft.name}
                  </p>
                  <p className="text-gray-700 text-base">{nft.desc}</p>
                  <p className="text-gray-700 text-base">
                    holder: {nft.seller.slice(0, 8)}.......
                    {nft.seller.slice(-8)}
                  </p>
                  <p className="text-gray-700 text-base">
                    price: {nft.price}ETH
                  </p>
                  <BuyNFT nft={nft} />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://github.com/kei32bit"
          target="_blank"
          rel="noopener noreferrer"
        >
          kei32bit
        </a>
      </footer>
    </div>
  );
};

export default Home;
