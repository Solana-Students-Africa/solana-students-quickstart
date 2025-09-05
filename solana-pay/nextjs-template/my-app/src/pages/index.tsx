import Image from "next/image";
import localFont from "next/font/local";
import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable}  font-[family-name:var(--font-geist-sans)]`}
    >
      <div className="min-h-screen w-full flex items-center justify-center">

        <div className="grid place-items-center text-center">
          <h1 className="sm:w-[700px] p-10 font-bold text-[50px] sm:text-[82px] sm:leading-[5rem] text-[#251206]">
            List on sol and Pay with QR code
          </h1>  
          <div className="p-10 flex justify-center gap-8">

          <Link href="list">
          <button  className="!bg-gradient-to-r from-[#35d6ab] to-[#cd32fc] px-5 py-3 rounded-md">
            List Now
          </button>
          </Link>

          <Link href="buy">
          <button className="!bg-gradient-to-r from-[#35d6ab] to-[#cd32fc] px-5 py-3 rounded-md">
            Buy a product
          </button>
          </Link>

          </div> 
        </div>
        
        
      </div>
    </div>
  );
}