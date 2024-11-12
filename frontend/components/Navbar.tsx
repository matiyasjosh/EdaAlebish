"use client"
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import from next/navigation for App Router compatibility
import Button from "./ui/Button";

const Navbar = () => {
  const pathname = usePathname(); // Get the current path

  const getLinkStyle = (path: string) => {
    return pathname === path
      ? "border-b-2 border-white"
      : "hover:border-b-2 hover:border-gray-1";
  };

  return (
    <div className="w-[85%] flex justify-between py-5 items-center mx-auto mt-5">
      <h1 className="text-3xl font-bold">
        Eda<span className="text-red-600">Alebish</span>
      </h1>

      <div className="bg-[#00078F] opacity-25 text-white px-10 py-2 rounded-full">
        <ul className="flex justify-between lg:w-60 text-md mt-2 font-bold">
          <Link href={"/"}>
            <li className={`cursor-pointer ${getLinkStyle("/")}`}>Home</li>
          </Link>
          <Link href={"/debt"}>
            <li className={`cursor-pointer ${getLinkStyle("/debt")}`}>Debts</li>
          </Link>
          <Link href={"/about"}>
            <li className={`cursor-pointer ${getLinkStyle("/about")}`}>About</li>
          </Link>
        </ul>
      </div>

      <div>
        <Link href={"/login"}>
          <Button
            content="login"
            backgroundColor="bg-[#bec4e1]"
            textColor="text-white"
            paddingHorizontal="4"
            paddingVertical="2"
          />
        </Link>
        <Link href={"/signup"}>
          <Button
            content="sign up"
            backgroundColor="bg-white"
            textColor="text-[#bec4e1]"
            paddingHorizontal="4"
            paddingVertical="2"
          />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
