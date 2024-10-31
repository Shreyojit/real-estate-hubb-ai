// src/components/Dashboard/Navbar.jsx

"use client";

import useStore from "@/store/useStore";
import { Bell, Menu, Settings, Moon, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const toggleSidebar = useStore((state) => state.toggleSidebar);
  const isDarkMode = useStore((state) => state.isDarkMode);
  const toggleTheme = useStore((state) => state.toggleTheme);

  return (
    <div className="flex justify-between items-center w-full mb-7">
      <div className="flex justify-between items-center gap-5">
        <button
          className="px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100 dark:bg-gray-700"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>

        <div className="relative">
          <input
            type="search"
            placeholder="Start typing to search groups & products"
            className="pl-10 pr-4 py-2 w-50 md:w-60 border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Bell className="text-gray-500 dark:text-gray-300" size={20} />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center gap-5">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 dark:bg-gray-700"
        >
          {isDarkMode ? (
            <Sun className="text-yellow-400" size={20} />
          ) : (
            <Moon className="text-gray-600" size={20} />
          )}
        </button>

        <div className="hidden md:flex justify-between items-center gap-5">
          <div className="relative">
            <Bell className="cursor-pointer text-gray-500 dark:text-gray-300" size={24} />
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-red-100 bg-red-400 rounded-full">
              3
            </span>
          </div>
          <hr className="w-0 h-7 border border-solid border-l border-gray-300 dark:border-gray-600 mx-3" />
          <div className="flex items-center gap-3 cursor-pointer">
            <Image
              src="https://images.unsplash.com/photo-1546881963-ac8d67aee789?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fHww"
              alt="Profile"
              width={20}
              height={20}
              className="rounded-full h-full object-cover"
            />
            <span className="font-semibold dark:text-gray-200">Ed Roh</span>
          </div>
        </div>
        <Link href="/settings">
          <Settings className="cursor-pointer text-gray-500 dark:text-gray-300" size={24} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
