## Solana Pay Next.js Template

## Live Demo

- Live site: [solana-pay-dapp.vercel.app](https://solana-pay-dapp.vercel.app/)

Add the Solana Pay SDK to your project:

```bash
npm i @solana/pay
```

Why: `@solana/pay` provides helpers to construct Solana Pay URLs, encode/decode request parameters, and verify payment references used in wallet-to-merchant flows.

Also install Solana Web3.js:

```bash
npm install @solana/web3.js
```

Why: `@solana/web3.js` is the core Solana SDK used to create `PublicKey`s, connect to RPC, fetch transactions, and perform on-chain validations for payments.

### Install QR Code Styling (optional)

Add a customizable QR code renderer for the browser:

```bash
npm install qr-code-styling
```

Why: `qr-code-styling` lets you render QR codes on the client with customizable colors, shapes, and embedded logos—useful for generating branded Solana Pay codes in your UI.

### Install qrcode.react (optional)

Add a lightweight React QR component that renders to SVG/Canvas:

```bash
npm install qrcode.react
```

Why: `qrcode.react` renders QR codes directly in React without external services, works well for embedding Solana Pay URLs, and is simple to use in both client and SSR contexts.

## Installation

Install project dependencies:

```bash
npm install
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.