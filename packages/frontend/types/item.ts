export interface MarketItem {
  itemId: number;
  nftContract: string;
  tokenId: number;
  seller: string;
  owner: string;
  price: string;
  sold: boolean;
}

export interface ShowItem {
  itemId: number;
  tokenId: number;
  seller: string;
  owner: string;
  price: string;
  image: string;
  name: string;
  desc: string;
}
