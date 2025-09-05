"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import Link from 'next/link';

interface Product {
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export default function List() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const router = useRouter();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setImageUrl(reader.result as string); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct: Product = { name, price, quantity, imageUrl };

    const existingProducts = JSON.parse(localStorage.getItem('products') || '[]');

    const updatedProducts = [...existingProducts, newProduct];

    localStorage.setItem('products', JSON.stringify(updatedProducts));

    setName('');
    setPrice(0);
    setQuantity(1);
    setImageUrl('');
    setImagePreview(null);

    router.push('/buy');
  };

  return (

    <>
    <Link href="/">
        <button className='text-[#251206] text-[30px] p-20 text-bold'>Home</button>
    </Link>
    <div className="flex min-h-screen flex-col gap-20 text-[#ffa366] items-center px-24 pb-24 w-screen">
    <form onSubmit={handleAddProduct} className="w-full max-w-lg bg-[#251206]  shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-[#ffa366]">Add a New Product</h2>

      <div className="mb-4">
        <label className="block text-[#ffa366] font-bold mb-2">Product Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter product name"
          className="w-full px-3 py-2 border rounded-md text-[#ffa366] focus:outline-none focus:border-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-[#ffa366] font-bold mb-2">Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          placeholder="Enter product price"
          className="w-full px-3 py-2 border rounded-md text-[#ffa366] focus:outline-none focus:border-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-[#ffa366] font-bold mb-2">Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
          placeholder="Enter quantity"
          className="w-full px-3 py-2 border rounded-md text-[#ffa366] focus:outline-none focus:border-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-[#ffa366] font-bold mb-2">Product Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full text-sm text-[#ffa366] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {imagePreview && (
          <div className="mt-4">
            <img src={imagePreview} alt="Preview" className="w-full h-64 object-cover rounded-lg" />
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white font-bold py-2 px-4 rounded-md hover:opacity-90 transition duration-200"
      >
        Add Product
      </button>
    </form>
    </div>
    </>
  );
}