import React from 'react';
import { HashLink } from 'react-router-hash-link';

const NavLinks = () => {
    return (
        <>
            <HashLink className="px-4 font-extrabold text-gray-500 hover:text-green-900" smooth to="/#about">
                Home Page
            </HashLink>
            <HashLink className="px-4 font-extrabold text-gray-500 hover:text-green-900" smooth to="/#services">
                Scam Awareness
            </HashLink>
            <HashLink className="px-4 font-extrabold text-gray-500 hover:text-green-900" to="/detection">
                Scam Detection
            </HashLink>
            {/* <HashLink className="px-4 font-extrabold text-gray-500 hover:text-green-900" to="/contact#contact">
                Scam News
            </HashLink> */}
            {/* <HashLink className="text-white bg-blue-900 hover:bg-blue-800 inline-flex items-center justify-center w-auto px-6 py-3 shadow-xl rounded-xl" smooth to="/get-demo#demo">
                Demo our products
            </HashLink> */}
        </>
    )
}

export default NavLinks;
