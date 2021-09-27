// import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";

function MyNFTs() {
  // return <Component {...pageProps} />;
  return (
    <div className="p-10">
      {/* Card 1 */}
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
    </div>
  );
}

export default MyNFTs;
