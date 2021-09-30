import { NFTStorage, File } from "nft.storage";

const apiKey = process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY;
const client = new NFTStorage({ token: apiKey! });

export type Metadata = Token & {
  ipnft: string;
};

export type Token = { name: string; description: string; image: File };

const uploadStorage = async (file: any) => {
  return client.store({
    name: "",
    description: "",
    image: new File([file], "picture.jpg", { type: "image/jpg" }),
  });
};

const createNFTStorageURI = async (nftStorageURI: string): Promise<String> => {
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
  const url = String(data.image).replace("ipfs://", "https://ipfs.io/ipfs/");
  return url;
};

export { uploadStorage, createNFTStorageURI };
