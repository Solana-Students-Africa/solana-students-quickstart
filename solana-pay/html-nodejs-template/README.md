# Solana Pay QR Code Generator

A simple HTML project that generates Solana Pay QR codes for cryptocurrency payments. Users can scan the QR codes with their mobile wallets to complete payments.

## Features

- 🚀 **QR Code Generation**: Generate Solana Pay QR codes instantly
- 📱 **Mobile Wallet Compatible**: Works with any Solana wallet that supports Solana Pay
- 🔒 **Secure Transactions**: Uses Solana's native transaction system with proper references
- 🎨 **Modern UI**: Clean, responsive design with smooth animations
- ⚡ **Real-time Payment Monitoring**: Automatically detects when payments are completed
- ✅ **Payment Confirmation**: Shows transaction signatures when payments are confirmed
- 📊 **Input Validation**: Validates Solana addresses and amounts

## How It Works

### QR Code Payment Flow

1. **Generate QR Code**: Enter amount, recipient address, and optional memo
2. **Scan with Mobile Wallet**: Use any Solana wallet app to scan the QR code
3. **Complete Payment**: Approve the transaction in your mobile wallet
4. **Automatic Confirmation**: The app monitors for payment completion
5. **Success Display**: Shows transaction signature when payment is confirmed

### Key Components

- **QR Code Generation**: Creates proper Solana Pay URLs with references
- **Payment Monitoring**: Uses Solana Web3.js to track transaction status
- **Address Validation**: Validates Solana wallet addresses in real-time
- **Amount Handling**: Precise SOL amount calculations using BigNumber
- **Reference Tracking**: Unique transaction references for payment verification

## Prerequisites

Before using this QR code generator, you'll need:

1. **A Solana Wallet App**: Install [Phantom](https://phantom.app/), [Solflare](https://solflare.com/), or another Solana wallet on your mobile device
2. **Devnet SOL**: Get some devnet SOL for testing (real SOL for mainnet)
3. **Web Browser**: Any modern browser with JavaScript enabled

## Getting Started

### 1. Clone or Download

```bash
git clone <repository-url>
cd html-solana-pay
```

### 2. Open the Project

Simply open `index.html` in your web browser - that's it! No server needed.

> **Note**: Since this project uses CDN links for all dependencies, it works perfectly by just opening the HTML file directly in your browser.

### Optional: Run with a local server

If you prefer to serve the files locally, run:

```bash
cd /solana-students-quickstart/solana-pay/html-nodejs-template && npx --yes http-server -p 5173 -c-1 .
```

Then open `http://localhost:5173` in your browser.

### 3. Generate QR Code

1. Enter the amount of SOL you want to receive
2. Provide your Solana wallet address as the recipient
3. Add an optional memo/note
4. Click "📱 Generate QR Code"
5. The QR code will appear instantly

### 4. Complete Payment

1. Open your Solana wallet app on your mobile device
2. Look for "Scan QR Code" or "Pay with QR Code" option
3. Scan the generated QR code
4. Review and approve the transaction
5. Wait for confirmation (the app will show "Payment Confirmed!")

## Project Structure

```
html-solana-pay/
├── index.html          # Main HTML file with payment form
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript for QR generation and payment monitoring
└── README.md           # This file
```

## Technical Details

### Solana Pay URL Format

The app generates URLs in the Solana Pay format:
```
solana:RECIPIENT_ADDRESS?amount=AMOUNT&label=LABEL&message=MESSAGE&reference=REFERENCE
```

### Payment Monitoring

- **Reference Generation**: Creates unique `PublicKey` references for each payment
- **Transaction Search**: Monitors blockchain for transactions with the specific reference
- **Validation**: Verifies transaction success and confirms payment completion
- **Real-time Updates**: Checks every 5 seconds for payment confirmation

### Dependencies

- **@solana/web3.js**: Core Solana blockchain interaction
- **BigNumber.js**: Precise decimal arithmetic for SOL amounts
- **QR Server API**: External service for QR code generation

## Configuration

### Network Selection

By default, the app uses Solana's devnet. To switch to mainnet:

```javascript
// In script.js, change the connection URL:
this.connection = new solanaWeb3.Connection(
    'https://api.mainnet-beta.solana.com',  // Mainnet
    'confirmed'
);
```

### Custom RPC Endpoint

You can use a custom RPC endpoint for better performance:

```javascript
this.connection = new solanaWeb3.Connection(
    'https://your-rpc-endpoint.com',
    'confirmed'
);
```

## Supported Mobile Wallets

This QR code generator works with any Solana wallet that supports Solana Pay:

- ✅ **Phantom Mobile** (recommended)
- ✅ **Solflare Mobile**
- ✅ **Backpack Mobile**
- ✅ **Slope Mobile**
- ✅ **Other Solana Pay compatible wallets**

## Development

### Adding Features

To extend this QR code generator, you can:

1. **Custom QR Styling**: Add branded QR codes with logos
2. **Payment History**: Store and display past QR codes and payments
3. **Bulk QR Generation**: Generate multiple QR codes for different amounts
4. **Webhook Integration**: Send notifications when payments are received
5. **Analytics**: Track QR code scans and payment success rates

### Testing

For testing, use Solana's devnet:

1. Get devnet SOL from a faucet
2. Use devnet wallet addresses
3. Test with small amounts
4. Verify payments appear in your wallet

## Troubleshooting

### Common Issues

1. **QR Code Not Generating**
   - Check that recipient address is valid
   - Ensure amount is greater than 0
   - Refresh the page and try again

2. **Payment Not Detected**
   - Wait up to 30 seconds for confirmation
   - Check that you're on the correct network (devnet/mainnet)
   - Verify the transaction was successful in your wallet

3. **QR Code Not Scanning**
   - Ensure your mobile wallet supports Solana Pay
   - Try refreshing the QR code
   - Check that the URL is properly formatted

### Debug Mode

Enable debug logging by opening browser console (F12) and checking for error messages. The app logs:
- QR code generation details
- Payment monitoring status
- Transaction validation results

## Security Notes

- This is a demo project for educational purposes
- QR codes contain public information only (no private keys)
- Always verify transaction details in your wallet before approving
- Use HTTPS in production environments
- Consider implementing additional security measures for production use

## Use Cases

This QR code generator is perfect for:

- **Merchants**: Accept SOL payments in physical stores
- **Events**: Sell tickets or merchandise with QR codes
- **Donations**: Generate QR codes for fundraising
- **Personal Payments**: Share QR codes for quick payments
- **Testing**: Learn Solana Pay integration

## Contributing

Feel free to submit issues, feature requests, or pull requests to improve this QR code generator.

## License

This project is open source and available under the MIT License.

## Resources

- [Solana Documentation](https://docs.solana.com/)
- [Solana Pay Specification](https://github.com/solana-labs/solana-pay)
- [Phantom Wallet](https://phantom.app/)
- [Solana Web3.js](https://github.com/solana-labs/solana-web3.js)
- [Solana Pay QR Code Guide](https://docs.solana.com/developing/payment#qr-code)