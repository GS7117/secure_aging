import React, { useState, useRef } from 'react';
import { HashLink } from 'react-router-hash-link';

const NavLinks = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const closeTimeoutRef = useRef(null);

    const handleMouseEnter = () => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
        setDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        closeTimeoutRef.current = setTimeout(() => {
            setDropdownOpen(false);
        }, 200); // Delay in milliseconds
    };

    return (
        <div className="relative flex space-x-4">
            <HashLink style={{ textDecoration: 'none' }} className="px-4 font-extrabold text-gray-500 hover:text-green-900" smooth to="/">
                Home Page
            </HashLink>
            <HashLink style={{ textDecoration: 'none' }} className="px-4 font-extrabold text-gray-500 hover:text-green-900" to="/detection">
                Scam Detection
            </HashLink>
            <div className="relative inline-block" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <button className="px-4 font-extrabold text-gray-500 hover:text-green-900 focus:outline-none">
                    Scam Awareness
                    <svg className="w-4 h-4 ml-1 inline" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l4 4 4-4" />
                    </svg>
                </button>
                {dropdownOpen && (
                    <div className="absolute left-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-lg z-10">
                        <ul className="" aria-labelledby="dropdownDelayButton">
                            <li>
                                <HashLink smooth to="/scam-classification" className=" text-m text-gray-500 hover:text-green-900 block font-extrabold py-2  focus:outline-none" style={{ textDecoration: 'none' }}>
                                    Scam Types
                                </HashLink>
                            </li>
                            <li>
                                <HashLink smooth to="/scamstats" className="text-m text-gray-500 hover:text-green-900 block font-extrabold py-2  focus:outline-none" style={{ textDecoration: 'none' }}>
                                    Scam Statistics
                                </HashLink>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavLinks;
