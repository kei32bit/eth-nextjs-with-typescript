import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen py-2">
      <Head>
        <title>NFT Market</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <img
            className="w-full"
            src="https://i.gyazo.com/eae6a9a8a8e325c02c5abc2adf8d9413.png"
            alt="Mountain"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Orca</div>
            <p className="text-gray-700 text-base">orca in the sea</p>
            <p className="text-gray-700 text-base">$1.00</p>
          </div>
        </div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <img
            className="w-full"
            src="https://i.gyazo.com/eae6a9a8a8e325c02c5abc2adf8d9413.png"
            alt="Mountain"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Orca</div>
            <p className="text-gray-700 text-base">orca in the sea</p>
            <p className="text-gray-700 text-base">$1.00</p>
          </div>
        </div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <img
            className="w-full"
            src="https://i.gyazo.com/eae6a9a8a8e325c02c5abc2adf8d9413.png"
            alt="Mountain"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Orca</div>
            <p className="text-gray-700 text-base">orca in the sea</p>
            <p className="text-gray-700 text-base">$1.00</p>
          </div>
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
        </a>
      </footer>
    </div>
  );
};

export default Home;
