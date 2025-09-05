/**
 * Solana Pay QR Code Generator with Payment Verification
 * 
 * This class handles the generation of Solana Pay QR codes and monitors
 * for payment completion using blockchain transaction tracking.
 * 
 * Features:
 * - QR code generation for Solana Pay URLs
 * - Real-time payment monitoring
 * - Address validation
 * - Payment confirmation display
 */
class SolanaPayQRGenerator {
    constructor() {
        // Initialize class properties
        this.connection = null;        // Solana blockchain connection
        this.paymentInterval = null;   // Interval for payment monitoring
        this.paymentConfirmed = false; // Payment confirmation status
        this.transactionSignature = null; // Transaction signature when payment is confirmed
        this.loading = false;          // Loading state for UI feedback
        
        // Start the application
        this.init();
    }

    /**
     * Initialize the Solana Pay QR Generator
     * Sets up blockchain connection and event listeners
     */
    init() {
        // Initialize Solana connection to devnet (for testing)
        // Change to mainnet-beta for production use
        this.connection = new solanaWeb3.Connection(
            'https://api.devnet.solana.com',
            'confirmed'
        );
        
        // Set up user interface event listeners
        this.setupEventListeners();
    }

    /**
     * Set up event listeners for user interactions
     * Handles button clicks and input validation
     */
    setupEventListeners() {
        // QR code generation button
        const qrButton = document.getElementById('generateQR');
        qrButton.addEventListener('click', () => this.handlePayment());

        // Real-time input validation
        const amountInput = document.getElementById('amount');
        const recipientInput = document.getElementById('recipient');

        // Validate inputs as user types
        amountInput.addEventListener('input', () => this.validateInputs());
        recipientInput.addEventListener('input', () => this.validateInputs());
    }

    /**
     * Validate user inputs in real-time
     * Enables/disables the generate button based on input validity
     */
    validateInputs() {
        const amount = parseFloat(document.getElementById('amount').value);
        const recipient = document.getElementById('recipient').value.trim();
        const qrButton = document.getElementById('generateQR');

        // Check if inputs are valid: amount > 0, recipient exists, and is valid Solana address
        if (amount > 0 && recipient.length > 0 && this.isValidSolanaAddress(recipient)) {
            qrButton.disabled = false;
            this.showStatus('Ready to generate QR code!', 'info');
        } else {
            qrButton.disabled = true;
            this.showStatus('Please enter valid amount and recipient address', 'error');
        }
    }


    /**
     * Validate Solana wallet address format
     * @param {string} address - The address to validate
     * @returns {boolean} - True if address is valid Solana format
     */
    isValidSolanaAddress(address) {
        // Solana addresses are base58 encoded and typically 32-44 characters
        // This regex checks for valid base58 characters and reasonable length
        return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
    }


    /**
     * Display status messages to the user
     * @param {string} message - The message to display
     * @param {string} type - The type of message ('success', 'error', 'info')
     */
    showStatus(message, type = 'info') {
        const statusElement = document.getElementById('status');
        statusElement.textContent = message;
        statusElement.className = `status ${type}`;
        
        // Auto-hide success messages after 5 seconds for better UX
        if (type === 'success') {
            setTimeout(() => {
                statusElement.textContent = '';
                statusElement.className = 'status';
            }, 5000);
        }
    }


    /**
     * Main payment handling function
     * Generates QR code and starts payment monitoring
     */
    async handlePayment() {
        // Get user inputs
        const amount = parseFloat(document.getElementById('amount').value);
        const recipient = document.getElementById('recipient').value.trim();
        const memo = document.getElementById('memo').value.trim();

        // Validate recipient address before proceeding
        if (!this.isValidSolanaAddress(recipient)) {
            this.showStatus('Please enter a valid recipient address first', 'error');
            return;
        }

        // Set loading state and reset payment status
        this.setLoading(true);
        this.paymentConfirmed = false;
        this.transactionSignature = null;

        try {
            // Convert inputs to Solana objects
            const recipientPubkey = new solanaWeb3.PublicKey(recipient);
            const amountBN = new BigNumber(amount); // Use BigNumber for precise decimal handling
            const reference = new solanaWeb3.Keypair().publicKey; // Generate unique reference for this payment or use any public key you want
            const label = 'Solana Pay Demo';
            const message = memo || `Payment of ${amount} SOL`;

            // Log transaction details for debugging
            console.log('Creating transaction details:', {
                recipient: recipientPubkey.toString(),
                amount: amountBN.toString(),
                reference: reference.toString(),
                label,
                message
            });

            // Manually create the Solana Pay URL (more reliable than external package)
            // Format: solana:RECIPIENT?amount=AMOUNT&label=LABEL&message=MESSAGE&reference=REFERENCE
            const params = new URLSearchParams();
            params.append('amount', amountBN.toString());
            if (memo && memo.trim() !== '') {
                params.append('memo', memo);
            }
            params.append('label', label);
            params.append('message', message);
            params.append('reference', reference.toString());
            
            const url = {
                href: `solana:${recipientPubkey.toString()}?${params.toString()}`
            };
            console.log('Generated URL:', url.href);

            // Generate QR code from the URL
            await this.generateQRCode(url.href);

            // Start monitoring for payment completion
            await this.verifyPayment(recipientPubkey, amountBN, reference);

        } catch (error) {
            console.error('Payment error:', error);
            this.showStatus(`Payment failed: ${error.message}`, 'error');
            this.setLoading(false);
        }
    }

    /**
     * Generate QR code from Solana Pay URL
     * @param {string} url - The Solana Pay URL to encode in QR code
     */
    async generateQRCode(url) {
        try {
            // Get the QR code container element
            const qrCodeImage = document.getElementById('qrCodeImage');
            
            if (!qrCodeImage) {
                this.showStatus('QR code container not found', 'error');
                return;
            }
            
            // Use external QR code service for reliable generation
            // This service creates PNG QR codes from URLs
            const qrServiceUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}&format=png&margin=2`;
            
            // Create image element for the QR code
            const img = document.createElement('img');
            img.src = qrServiceUrl;
            img.alt = 'QR Code';
            img.style.border = '1px solid #e2e8f0';
            img.style.borderRadius = '4px';
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
            
            // Clear container and add the new QR code image
            qrCodeImage.innerHTML = '';
            qrCodeImage.appendChild(img);

            // Show the QR code container
            const qrContainer = document.getElementById('qrCode');
            if (qrContainer) {
                qrContainer.style.display = 'block';
            }
            
            // Display the URL for debugging/copying
            const qrUrlElement = document.getElementById('qrUrl');
            if (qrUrlElement) {
                qrUrlElement.textContent = url;
            }

            this.showStatus('QR code generated! Scan with your mobile wallet', 'success');
        } catch (error) {
            console.error('Error generating QR code:', error);
            this.showStatus('Failed to generate QR code', 'error');
        }
    }

    /**
     * Monitor for payment completion using blockchain transaction tracking
     * @param {PublicKey} recipient - The recipient's public key
     * @param {BigNumber} amount - The expected payment amount
     * @param {PublicKey} reference - The unique reference for this payment
     */
    async verifyPayment(recipient, amount, reference) {
        try {
            // Set up polling interval to check for payment every 5 seconds
            const interval = setInterval(async () => {
                try {
                    // Search for transactions that involve our reference
                    // This finds any transaction that used our unique reference
                    const signatures = await this.connection.getSignaturesForAddress(reference, { limit: 10 });
                    
                    if (signatures.length > 0) {
                        clearInterval(interval); // Stop polling once we find a transaction

                        // Validate the transaction to ensure it's successful
                        try {
                            const transaction = await this.connection.getTransaction(signatures[0].signature, {
                                commitment: 'confirmed'
                            });
                            
                            // Check if transaction exists and was successful (no errors)
                            if (transaction && transaction.meta && !transaction.meta.err) {
                                this.transactionSignature = signatures[0].signature;
                                this.paymentConfirmed = true;
                                this.setLoading(false);
                                this.showPaymentSuccess();
                            }
                        } catch (error) {
                            console.log("Transaction validation failed:", error);
                        }
                    }
                } catch (error) {
                    console.log("No valid transaction found yet, retrying...");
                }
            }, 5000); // Check every 5 seconds
        } catch (err) {
            console.error("Error verifying payment:", err);
        }
    }

    /**
     * Display payment success message and transaction details
     */
    showPaymentSuccess() {
        this.showStatus('✅ Payment confirmed!', 'success');
        
        // Add a success message to the QR code container
        const qrContainer = document.getElementById('qrCode');
        if (qrContainer) {
            const successDiv = document.createElement('div');
            successDiv.innerHTML = `
                <div style="background: #c6f6d5; color: #22543d; padding: 1rem; border-radius: 8px; margin-top: 1rem; border: 1px solid #9ae6b4;">
                    <h4 style="margin: 0 0 0.5rem 0;">🎉 Payment Confirmed!</h4>
                    <p style="margin: 0; font-size: 0.8rem;"><strong>Transaction Signature:</strong> ${this.transactionSignature}</p>
                </div>
            `;
            qrContainer.appendChild(successDiv);
        }
    }

    /**
     * Update loading state and button appearance
     * @param {boolean} loading - Whether the app is in loading state
     */
    setLoading(loading) {
        this.loading = loading;
        const qrButton = document.getElementById('generateQR');
        
        if (loading) {
            // Disable button and show loading spinner with "Waiting..." text
            qrButton.disabled = true;
            qrButton.innerHTML = `
                <svg style="width: 12px; height: 12px; margin-right: 6px; animation: spin 1s linear infinite;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Waiting...
            `;
        } else {
            // Re-enable button and show normal text
            qrButton.disabled = false;
            qrButton.innerHTML = '📱 Generate QR Code';
        }
    }
}

// Initialize the app when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new SolanaPayQRGenerator();
});