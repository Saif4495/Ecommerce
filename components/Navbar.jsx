"use client";
import React, { useState } from "react";
import { assets, BagIcon, CartIcon } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { isSeller, router, user } = useAppContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
        <Image
          className="cursor-pointer w-28 md:w-32"
          onClick={() => router.push("/")}
          src={assets.logo}
          alt="logo"
        />
        
        {/* Desktop Menu */}
        <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
          <Link href="/" className="hover:text-gray-900 transition">
            Home
          </Link>
          <Link href="/all-products" className="hover:text-gray-900 transition">
            Shop
          </Link>
          <Link href="/" className="hover:text-gray-900 transition">
            About Us
          </Link>
          <Link href="/" className="hover:text-gray-900 transition">
            Contact
          </Link>

          {isSeller && (
            <button
              onClick={() => router.push("/seller")}
              className="text-xs border px-4 py-1.5 rounded-full"
            >
              Seller Dashboard
            </button>
          )}
        </div>

        {/* Desktop User Actions */}
        <ul className="hidden md:flex items-center gap-4">
          <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />
          {user ? (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Cart"
                  labelIcon={<CartIcon />}
                  onClick={() => router.push("/cart")}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Orders"
                  labelIcon={<BagIcon />}
                  onClick={() => router.push("/my-orders")}
                />
              </UserButton.MenuItems>
            </UserButton>
          ) : (
            <button
              onClick={openSignIn}
              className="flex items-center gap-2 hover:text-gray-900 transition"
            >
              <Image src={assets.user_icon} alt="user icon" />
              Account
            </button>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleSidebar}
          className="md:hidden flex flex-col gap-1 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-300 ${isSidebarOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-gray-700 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-300 ${isSidebarOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
            <button
              onClick={closeSidebar}
              className="p-2 hover:bg-gray-100 rounded-full"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* User Section */}
              <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
                {user ? (
                  <div className="flex items-center gap-3">
                    <UserButton />
                    <span className="text-sm text-gray-600">Welcome back!</span>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      openSignIn();
                      closeSidebar();
                    }}
                    className="flex items-center gap-3 w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <Image src={assets.user_icon} alt="user icon" className="w-6 h-6" />
                    <span className="font-medium">Sign In</span>
                  </button>
                )}
              </div>

              {/* Navigation Links */}
              <div className="space-y-3">
                <Link
                  href="/"
                  onClick={closeSidebar}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span className="font-medium">Home</span>
                </Link>

                <Link
                  href="/all-products"
                  onClick={closeSidebar}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span className="font-medium">Shop</span>
                </Link>

                <Link
                  href="/"
                  onClick={closeSidebar}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">About Us</span>
                </Link>

                <Link
                  href="/"
                  onClick={closeSidebar}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">Contact</span>
                </Link>
              </div>

              {/* User Actions */}
              {user && (
                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      router.push("/cart");
                      closeSidebar();
                    }}
                    className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-50 transition"
                  >
                    <CartIcon className="w-5 h-5" />
                    <span className="font-medium">Cart</span>
                  </button>

                  <button
                    onClick={() => {
                      router.push("/my-orders");
                      closeSidebar();
                    }}
                    className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-50 transition"
                  >
                    <BagIcon className="w-5 h-5" />
                    <span className="font-medium">My Orders</span>
                  </button>
                </div>
              )}

              {/* Seller Dashboard */}
              {isSeller && (
                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      router.push("/seller");
                      closeSidebar();
                    }}
                    className="flex items-center gap-3 w-full p-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span className="font-medium">Seller Dashboard</span>
                  </button>
                </div>
              )}

              {/* Search */}
              <div className="pt-4 border-t border-gray-200">
                <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-50 transition">
                  <Image src={assets.search_icon} alt="search icon" className="w-5 h-5" />
                  <span className="font-medium">Search</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;