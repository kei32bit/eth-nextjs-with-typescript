import { useState } from "react";
import "tailwindcss/tailwind.css";

function CreateNFT() {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({
    price: "",
    name: "",
    description: "",
  });

  async function onChange(e) {
    const file = e.target.files[0];
    // try {
    //   const added = await client.add(file, {
    //     progress: (prog) => console.log(`received: ${prog}`),
    //   });
    //   const url = `https://ipfs.infura.io/ipfs/${added.path}`;
    //   setFileUrl(url);
    // } catch (error) {
    //   console.log("Error uploading file: ", error);
    // }
  }

  async function createMarket() {
    // const { name, description, price } = formInput;
    // if (!name || !description || !price || !fileUrl) return;
    // /* first, upload to IPFS */
    // const data = JSON.stringify({
    //   name,
    //   description,
    //   image: fileUrl,
    // });
    // try {
    //   const added = await client.add(data);
    //   const url = `https://ipfs.infura.io/ipfs/${added.path}`;
    //   /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
    //   createSale(url);
    // } catch (error) {
    //   console.log("Error uploading file: ", error);
    // }
  }

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
        <input type="file" name="Asset" className="my-4" onChange={onChange} />
        {fileUrl && <img className="rounded mt-4" width="350" src={fileUrl} />}
        <button
          onClick={createMarket}
          className="font-bold mt-4 bg-green-400 text-white rounded p-4 shadow-lg"
        >
          Create NFT
        </button>
      </div>
    </div>
  );
}

export default CreateNFT;
