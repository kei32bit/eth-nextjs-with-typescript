import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import Link from "next/link";
// import DappMenu from "../components/DappMenu";
import ConnectWallet from "../components/ConnectWallet";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

function MarketPlace({ Component, pageProps }: AppProps) {
  return (
    <div>
      <div className="mt-4 flex justify-center items-center">
        <Web3ReactProvider getLibrary={getLibrary}>
          <ConnectWallet />
        </Web3ReactProvider>
      </div>
      <nav className="border-b p-6">
        <p className="text-4xl font-bold">NFT Marketplace</p>
        <div className="flex mt-4">
          <Link href="/">
            <a className="mr-4 text-green-400">Home</a>
          </Link>
          <Link href="/create-nft">
            <a className="mr-4 text-green-400">Create NFT</a>
          </Link>
          <Link href="/my-nfts">
            <a className="mr-4 text-green-400">My NFTs</a>
          </Link>
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  );
}

export default MarketPlace;
