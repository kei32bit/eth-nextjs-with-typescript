import { NFTStorage, File } from "nft.storage";

const apiKey = process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY;
const client = new NFTStorage({ token: apiKey! });

const uploadStorage = async (file: any) => {
  return client.store({
    name: "",
    description: "",
    image: new File([file], "picture.jpg", { type: "image/jpg" }),
  });
};

export default uploadStorage;
