"use client";

import React, { useEffect, useState } from "react";
import {  encodeURL, TransferRequestURLFields, findReference, validateTransfer } from "@solana/pay";
import { Connection, PublicKey, Keypair } from "@solana/web3.js";
import BigNumber from "bignumber.js";
import { FaOpencart } from "react-icons/fa";
import Link from "next/link";

interface Product {
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

type QRCodeStylingType = new (options: any) => {
  append: (element: HTMLElement) => void;
};

const staticProducts: Product[] = [
  { name: "LS Serum", price: 0.2, quantity: 2, imageUrl: "./images/img1.jpg" },
  { name: "SkinCare", price: 0.3, quantity: 2, imageUrl: "/images/img2.jpg" },
];

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

export default function Buy() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [transactionSignature, setTransactionSignature] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [QRCodeStylingComponent, setQRCodeStylingComponent] =
    useState<QRCodeStylingType | null>(null);

  useEffect(() => {
    // Get the products from local storage
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    // Combine static products and stored products
    setProducts([...staticProducts, ...storedProducts]);
  }, []);

  useEffect(() => {
    import("qr-code-styling").then((module) => {
      setQRCodeStylingComponent(() => module.default as QRCodeStylingType);
    });
  }, []); // Added closing bracket here for the useEffect

  const handleProductSelection = (product: Product) => {
    setSelectedProduct(product);
    // Reset payment states when a new product is selected
    setPaymentConfirmed(false);
    setTransactionSignature(null);
    setLoading(false);
  };

  const verifyPayment = async (recipient: PublicKey, amount: BigNumber, reference: PublicKey) => {
    try {
      const interval = setInterval(async () => {
        try {
          // Search for a transaction with the reference
          const foundTransaction = await findReference(connection, reference);
          if (foundTransaction.signature) {
            clearInterval(interval); // Stop polling

            // Validate the transaction to ensure the correct recipient and amount
            const result = await validateTransfer(
              connection,
              foundTransaction.signature,
              {
                recipient,
                amount,
                reference,
              },
              { commitment: "confirmed" }
            );

            if (result) {
              setTransactionSignature(foundTransaction.signature);
              setPaymentConfirmed(true);
              setLoading(false);
            }
          }
        } catch (error) {
          console.log("No valid transaction found yet, retrying...");
        }
      }, 5000); // Poll every 5 seconds
    } catch (err) {
      console.error("Error verifying payment:", err);
    }
  };

  const handlePayment = async (product: Product) => {
    setLoading(true);
    const recipient = new PublicKey("54Xh2zCzKxLUtXmNrUJwMx54c4KDdqiQcWrye4NHYPkK");
    const amount = new BigNumber(product.price);
    const reference = new Keypair().publicKey;
    const label = product.name;
    const message = `${product.name} purchase`;

    const transactionDetails: TransferRequestURLFields = {
      recipient,
      amount,
      reference,
      label,
      message,
    };

    const url = encodeURL(transactionDetails);

    if (QRCodeStylingComponent) {
      const qrCode = new QRCodeStylingComponent({
        width: 300,
        height: 300,
        type: "svg",
        data: url.href,
        dotsOptions: {
          color: "#000000",
          type: "extra-rounded",
        },
        image: "/images/sol.png",
        backgroundOptions: {
          color: "#ffffff",
        },
        imageOptions: {
          hideBackgroundDots: true,
          crossOrigin: "anonymous",
          margin: 20,
        },
      });

    //   const qr = createQR(url.toString(), 400, "transparent");

      const qrCodeContainer = document.getElementById("qr-code-container");
      if (qrCodeContainer) {
        qrCodeContainer.innerHTML = "";
        qrCode.append(qrCodeContainer);
      }

      // Poll for payment confirmation using the reference
      await verifyPayment(recipient, amount, reference);
    }
  };


  return (
    <div className="w-full mt-3 mx-auto">
          <Link href="/">
        <button className='text-[#251206] text-[30px] p-20 text-bold'>Home</button>
    </Link>
      <ul className="flex flex-wrap gap-6">
    
        {products.map((product, index) => (
          <li
            key={index}
            className="w-[32%] m-10 sm:m-20 flex flex-col items-start bg-[#251206] p-4 shadow-md rounded-lg"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-[300px] rounded-lg object-cover mb-4"
            />
            <h3 className="text-xl font-medium">{product.name}</h3>
            <div className="center gap-2">
              <img src="/images/sol.png" height={15} width={15} alt="sol" />
              <p className="text-lg">{product.price} SOL</p>
            </div>
            <p className="text-sm text-gray-500">
              Quantity: {product.quantity}
            </p>
            <button
              onClick={() => handleProductSelection(product)}
              className="mt-4 bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white px-10 py-3 rounded-lg center gap-2"
            >
              
              <p>Pay Now</p>
            </button>
          </li>
        ))}
      </ul>

      {selectedProduct && (
        <div className="fixed bottom-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-[#251206]  fixed bottom-0 w-screen h-[90%] rounded-lg shadow-lg p-8 overflow-auto">
            <button
              className="absolute top-4 right-4 text-white text-4xl"
              onClick={() => setSelectedProduct(null)}
            >
              &times;
            </button>
            <div className="center sm:flex mt-10 gap-20">
              <div className="w-1/2 h-full">
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.name}
                  className="sm:w-[800px] sm:h-[700px] object-cover"
                />
              </div>

              <div className="w-1/2 sm:pt-[100px]">
                <h2 className="text-3xl font-bold mb-4">
                  {selectedProduct.name}
                </h2>
                <div className="flex items-center gap-2">
                  <img
                    src="/images/sol.png"
                    alt="sol"
                    className="size-[20px]"
                  />
                  <p className="text-2xl">{selectedProduct.price} SOL</p>
                </div>
                <p className="text-lg text-gray-600 mb-4">
                  Quantity: {selectedProduct.quantity}
                </p>
                <div id="qr-code-container" className="my-4 text-white"></div>

                {/* Button to Generate QR Code */}
                <button
                  className={`mt-4 bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white px-10 py-3 rounded-lg center gap-2 ${loading ? "cursor-not-allowed opacity-50" : ""}`}
                  onClick={() => handlePayment(selectedProduct)}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 mr-3 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        ></path>
                      </svg>
                      Awaiting Payment Confirmation...
                    </>
                  ) : (
                    "Generate QR Code for Payment"
                  )}
                </button>

                {paymentConfirmed && (
                  <div className="mt-6 text-green-500">
                    <p>Payment Confirmed!</p>
                    <p className="text-[0.7rem]">Transaction Signature: {transactionSignature}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

  );
}