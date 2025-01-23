'use client';
import Link from "next/link";
import Image from "next/image";

const MyNavbar = () => {
  return (
    <nav className="bg-gray-800 shadow-lg border-b border-gray-700">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center space-x-6">
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={50} height={50} className="rounded-full" />
          </Link>
          <Link href="/todo" className="text-white hover:text-blue-400 transition duration-200 text-xl font-semibold">
            Todo
          </Link>
          <Link href="/table" className="text-white hover:text-blue-400 transition duration-200 text-xl font-semibold">
            Table
          </Link>
        </div>
        <div>
          <Link href="/signin">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-500 transition duration-200 shadow-lg">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default MyNavbar;
