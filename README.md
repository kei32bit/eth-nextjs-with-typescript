# NFTmarket-nextjs-with-typescript

This project is a simple NFT market.
Using these stacks.

- Typescript
- NextJS
- Tailwind CSS
- [Hardhat](https://hardhat.org/)
- [NFT.STORAGE](https://nft.storage/)
- [INFURA](https://infura.io/)

[Scaffold-Eth repository](https://github.com/scaffold-eth/scaffold-eth) helps me so much✨

# Get Started

Clone the project and `yarn install`

```
git clone git@github.com:kei32bit/eth-nextjs-with-typescript.git
cd eth-nextjs-with-typescript
yarn install

```

# How to work

These NFT smart contract can work on localhost, Rinkeby, Matic Network.

You should get API_KEY of [NFT.STORAGE](https://nft.storage/).

## localhost Network

First set up an environment of hardhat.
Overwrite origin contract address with these contract address.(`packages/frontend/config/address.ts`)

```
cd packages/hardhat
yarn deploy

--------
Compilation finished successfully
NFT Market Contract deployed:  0x0165878A594ca255338adfa4d48449f69242Eb8F
NFT Contract deployed:  0xa513E6E4b8f2a923D98304ec87F64353C4D5C853
✨  Done in 11.82s.
--------
```

## Rinkeby Network

You should get API_KEY of [INFURA](https://infura.io/) andcreate `.env.local` file.

```
# eth-nextjs-with-typescript/packages/hardhat/.env.local

INFURA_ID=XXX....
PRIVATE_KEY=XXX...
```

Deploy contracts to Rinkeby.

```
yarn deploy:rinkeby
```

## Mumbai Network

Almost the same as Rinkeby.

```
yarn deploy:mumbai
```
