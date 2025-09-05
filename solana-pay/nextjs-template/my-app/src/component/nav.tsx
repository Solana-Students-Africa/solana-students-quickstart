import Link from "next/link";

export default function Nav() {
  return (
    <nav className="between w-full ">
      <button className="!bg-gradient-to-r from-[#35d6ab] to-[#cd32fc] rounded-md">
            List Now
          </button>
      <div>
        <Link href="/">Home</Link>
      </div>
      <ul className="center gap-10">
        <li>
          <Link href="/products/list">All items</Link>
        </li>
        <li>
          <Link href="/products/add">Add items</Link>
        </li>
      </ul>
    </nav>
  );
}