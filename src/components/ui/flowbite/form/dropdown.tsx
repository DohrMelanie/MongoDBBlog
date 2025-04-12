"use client";

import { useState, useRef, useEffect } from "react";

export default function Dropdown({ 
    label, 
    name, 
    options, 
    onUpdate,
    value
}: { 
    label: string, 
    name: string, 
    options: string[], 
    onUpdate?: (value: string) => void,
    value: string
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(value);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        setIsOpen(false);
        
        if (onUpdate) {
            onUpdate(option);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button 
                onClick={toggleDropdown}
                className="text-white bg-primary-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-primary-400 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
                type="button"
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                {selectedOption || label} 
                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
            </button>

            {isOpen && (
                <div className="z-10 absolute mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby={`${name}-dropdown`}>
                        {options.map((option, index) => (
                            <li key={index}>
                                <button
                                    type="button"
                                    onClick={() => handleOptionClick(option)}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    {option}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            
            <input type="hidden" name={name} value={selectedOption || ""} />
        </div>
    );
}