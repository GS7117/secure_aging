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
        <div className="relative">
            <HashLink style={{ textDecoration: 'none' }} className="px-4 font-extrabold text-gray-500 hover:text-green-900" smooth to="/">
                Home Page
            </HashLink>
            <div className="relative inline-block" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <button className="px-4 font-extrabold text-gray-500 hover:text-green-900 focus:outline-none">
                    Scam Awareness
                </button>
                {dropdownOpen && (
                    <ul className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md">
                        <li className="">
                            <HashLink smooth to="/scam-classification" className="px-4 font-extrabold text-gray-500 hover:text-green-900">
                                Scam Types
                            </HashLink>
                        </li>
                        <li>
                            <HashLink smooth to="/scamstats" className="block px-4 py-2 font-extrabold text-gray-500 hover:text-green-900">
                                Scam Statistics
                            </HashLink>
                        </li>
                    </ul>
                )}
            </div>
            <HashLink style={{ textDecoration: 'none' }} className="px-4 font-extrabold text-gray-500 hover:text-green-900" to="/detection">
                Scam Detection
            </HashLink>
        </div>
    );
};

export default NavLinks;
