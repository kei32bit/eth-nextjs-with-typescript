import React, { useState } from "react";
import Modal from "./Modal";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    1, // Mainet
    3, // Ropsten
    4, // Rinkeby
    5, // Goerli
    42, // Kovan
  ],
});

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

export default function ConnectWallet(): JSX.Element {
  // const { activate, activateBrowserWallet } = useEthers();
  const [open, setOpen] = useState(false);
  const { chainId, account, activate, active } = useWeb3React<Web3Provider>();
  return (
    <>
      <div>
        {active ? (
          <p className="absolute top-16 right-10">Account: {account}</p>
        ) : (
          <button
            className="absolute top-16 right-10 mt-4 px-2 py-1 bg-green-400 text-lg text-white font-semibold rounded hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2"
            type="button"
            onClick={() => {
              setOpen(true);
            }}
          >
            Connect to a wallet
          </button>
        )}
      </div>
      <Modal
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
      >
        <div className="flex flex-col">
          <button
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:ring-green-400"
            onClick={() => {
              activate(injectedConnector);
            }}
          >
            <img
              src="https://i.gyazo.com/ed3f105d53c9247ec478c8e7995ac875.png"
              className="w-5 mr-5"
            />
            MetaMask
          </button>
        </div>
      </Modal>
    </>
  );
}
