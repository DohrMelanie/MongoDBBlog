"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Profile() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [username, setUsername] = useState("User");
    const [email, setEmail] = useState("user@example.com");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await fetch("/api/v1/me");
                if (res.ok) {
                    const userData = await res.json();
                    if (userData && typeof userData === 'object') {
                        setUsername(typeof userData.username === 'string' ? userData.username : "User");
                        setEmail(typeof userData.email === 'string' ? userData.email : "user@example.com");
                    }
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                setUsername("User");
                setEmail("user@example.com");
            }
        };

        fetchUserData();
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleSignOut = async () => {
        try {
            const res = await fetch("/api/auth/logout", {
                method: "POST"
            });
            if (res.ok) {
                console.log(res);
                window.location.href = "/";
            }
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button 
                type="button" 
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" 
                id="user-menu-button" 
                aria-expanded={isDropdownOpen}
                onClick={toggleDropdown}
            >
                <span className="sr-only">Open user menu</span>
                <img className="w-8 h-8 rounded-full" src="https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da8468a8cca35a5cdc005b564bb6" alt="user photo" />
            </button>
            <div className={`z-50 ${isDropdownOpen ? 'block' : 'hidden'} my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600 absolute translate-y-35`} id="user-dropdown">
                <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">{username}</span>
                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{email}</span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-create">
                    <li>
                        <Link href="/posts/create" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Create Post</Link>
                    </li>
                </ul>
                <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                        <Link href="/profile/posts" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Your Posts</Link>
                    </li>
                    <li>
                        <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</Link>
                    </li>
                    <li>
                        <button 
                            onClick={handleSignOut}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                            Sign out
                        </button>
                    </li>
                </ul>
            </div>
            <button 
                data-collapse-toggle="navbar-user" 
                type="button" 
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" 
                aria-controls="navbar-user" 
                aria-expanded={isMobileMenuOpen}
                onClick={toggleMobileMenu}
            >
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                </svg>
            </button>
        </div>
    );
}