import { useState } from "react";
import { nftAddress, nftMarketAddress } from "../config/address";
import NFT from "../../hardhat/artifacts/contracts/NFT.sol/NFT.json";
import Market from "../../hardhat/artifacts/contracts/Market.sol/NFTMarket.json";
import { useRouter } from "next/dist/client/router";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import uploadStorage from "../utils/nftStorage";

interface Metadata {
  name: string;
  description: string;
  image: string;
}

export default function CreateNFT(): JSX.Element {
  const [fileUrl, setFileUrl] = useState("");
  const [formInput, updateFormInput] = useState({
    price: "",
    name: "",
    description: "",
  });
  const router = useRouter();

  const uploadImage = async (e: any) => {
    const file = e.target.files[0];

    try {
      const result = await uploadStorage(file);
      console.log("result: ", result);
      const nftStorageURI = result.ipnft;

      // metadataUrl: https://bafyreif53jiiw3lbsc56opxc3z5uzin6n34jhmbjclbs3nxqnotflh2wim.ipfs.dweb.link/metadata.json
      const metadataUrl = `https://${nftStorageURI}.ipfs.dweb.link/metadata.json`;
      const req = (): Promise<Metadata> =>
        fetch(metadataUrl)
          .then((resp) => {
            return resp.json();
          })
          .catch((err) => {
            console.log("Error getting metadata.json: ", err);
          });

      const data = await req();
      // https://ipfs.io/ipfs/bafybeign5ai6z4cwrzihha4hdragzbeouw67235gal6kxpodwiel6mdmzq/orca.jpg
      const url = data.image.replace("ipfs://", "https://ipfs.io/ipfs/");
      console.log("image url", url);
      setFileUrl(url);
    } catch (err) {
      console.log("Error uploading a file: ", err);
    }
  };

  const createNFT = async () => {
    const { name, description, price } = formInput;
    if (!name || !description || !price || !fileUrl) {
      console.log(
        `not enough args. name: ${name}, desc: ${description}, price: ${price}, url: ${fileUrl}`
      );
      return;
    }
    const nftData = JSON.stringify({
      name: name,
      description: description,
      image: fileUrl,
    });
    try {
      const result = await uploadStorage(nftData);
      console.log("result: ", result);
      const nftStorageURI = result.ipnft;

      // metadataUrl: https://bafyreif53jiiw3lbsc56opxc3z5uzin6n34jhmbjclbs3nxqnotflh2wim.ipfs.dweb.link/metadata.json
      const metadataUrl = `https://${nftStorageURI}.ipfs.dweb.link/metadata.json`;
      const req = (): Promise<Metadata> =>
        fetch(metadataUrl)
          .then((resp) => {
            return resp.json();
          })
          .catch((err) => {
            console.log("Error getting metadata.json: ", err);
          });

      const data = await req();
      // https://ipfs.io/ipfs/bafybeign5ai6z4cwrzihha4hdragzbeouw67235gal6kxpodwiel6mdmzq/orca.jpg
      const url = data.image.replace("ipfs://", "https://ipfs.io/ipfs/");
      console.log("image url", url);

      // const added = await ipfs.add(data);
      // const url = `https://ipfs.infura.io/ipfs/{$added.path}`;
      saveToChain(url);
    } catch (error) {
      console.log("can not upload to ipfs. err: `$error`");
    }
  };

  const saveToChain = async (url: string) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const nftContract = new ethers.Contract(nftAddress, NFT.abi, signer);
    const transaction = await nftContract.createToken(url);
    const tx = await transaction.wait();
    const event = tx.events[0];
    const value = event.args[2];
    const tokenId = value.toNumber();
    const price = ethers.utils.parseUnits(formInput.price, "ether");
    console.log(
      `event: ${event}, value: ${value}, tokenId: ${tokenId}, price: ${price}`
    );

    const marketContract = new ethers.Contract(
      nftMarketAddress,
      Market.abi,
      signer
    );
    const listingPrice = await marketContract.getListingPrice();
    const listingPriceStr = String(listingPrice);
    const marketTransaction = await marketContract.createMarketItem(
      nftAddress,
      tokenId,
      price,
      { value: listingPrice }
    );
    await marketTransaction.wait();
    router.push("/");
  };

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input
          placeholder="NFT Name"
          className="mt-8 border rounded p-4 border-green-400"
          onChange={(e) =>
            updateFormInput({ ...formInput, name: e.target.value })
          }
        />
        <textarea
          placeholder="NFT Description"
          className="mt-2 border rounded p-4 border-green-400"
          onChange={(e) =>
            updateFormInput({ ...formInput, description: e.target.value })
          }
        />
        <input
          placeholder="NFT Price in Eth"
          className="mt-2 border rounded p-4 border-green-400"
          onChange={(e) =>
            updateFormInput({ ...formInput, price: e.target.value })
          }
        />
        <input
          type="file"
          name="Asset"
          className="my-4"
          onChange={uploadImage}
        />
        {fileUrl && <img className="rounded mt-4" width="350" src={fileUrl} />}
        <button
          onClick={createNFT}
          className="font-bold mt-4 bg-green-400 text-white rounded p-4 shadow-lg"
        >
          Create NFT
        </button>
      </div>
    </div>
  );
}
