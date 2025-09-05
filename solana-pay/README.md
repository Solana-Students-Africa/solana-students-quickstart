## Solana Pay Templates

This folder contains two templates for building with Solana Pay:

- HTML + Vanilla JS template for a simple, static QR payment demo
- Next.js template for a richer, componentized dApp

### HTML + Vanilla JS Template

Path: `solana-pay/html-nodejs-template`

- **Purpose**: Generate Solana Pay QR codes and verify payments in-browser using CDN scripts.
- **Features**:
  - Create Solana Pay URLs and render QR codes
  - Poll and validate payments on Solana devnet
  - Clean, responsive UI

**Live demo**: [vanilla-js-solana-pay-scafford.vercel.app](https://vanilla-js-solana-pay-scafford.vercel.app/)

#### Run locally

- Open the HTML directly:
```bash
open /solana-students-quickstart/solana-pay/html-nodejs-template/index.html
```

- Or serve with a local server:
```bash
cd /solana-students-quickstart/solana-pay/html-nodejs-template && npx --yes http-server -p 5173 -c-1 .
# Visit http://localhost:5173
```

### Next.js Template

Path: `solana-pay/nextjs-template/my-app`

- **Purpose**: A Next.js dApp that lists products and lets users pay via Solana Pay QR with on-chain verification.
- **Features**:
  - Product listing and buy pages
  - Branded QR generation (client-side)
  - Payment monitoring and confirmation

**Live demo**: [solana-pay-dapp.vercel.app](https://solana-pay-dapp.vercel.app/)

#### Install
```bash
npm install
```

Recommended packages:
```bash
npm i @solana/pay
npm install @solana/web3.js
npm install qr-code-styling
npm install qrcode.react
```

- **Why `@solana/pay`**: helpers to construct and verify Solana Pay requests.
- **Why `@solana/web3.js`**: core SDK for RPC, `PublicKey`, and transaction reads.
- **Why `qr-code-styling`**: customizable client QR codes (colors, shapes, logos).
- **Why `qrcode.react`**: lightweight React QR component (SVG/Canvas).

#### Develop
```bash
npm run dev
# Visit http://localhost:3000
```

#### Notes
- Both templates default to Solana devnet. Switch RPCs for mainnet as needed.
- Validate recipient addresses and amounts before initiating payments.
- Always confirm details in-wallet before approving.

---

References:
- HTML demo: [vanilla-js-solana-pay-scafford.vercel.app](https://vanilla-js-solana-pay-scafford.vercel.app/)
- Next.js demo: [solana-pay-dapp.vercel.app](https://solana-pay-dapp.vercel.app/)
 - Presentation: [Solana Pay + Transaction Logging](https://docs.google.com/presentation/d/1s7VqpGtkoRDcS86EXNfCYOKrHDW26FbeaALOOLL5ilU/edit?slide=id.g377deacc26f_0_0#slide=id.g377deacc26f_0_0)