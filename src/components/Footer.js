import React from 'react';
import {Link} from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import Logo from './Navbar/secure_aging_logo_logo_v2.svg'

const Footer = () => {
    return (
        <>
            <footer>
                <div className="footer max-w-full mx-auto px-4 sm:px-6 bg-gray-100 border-t border-b py-30">

                    {/* Top area: Blocks */}
                    <div className="grid sm:grid-cols-12 gap-5 py-8 md:py-12 border-t border-gray-200 lg:ml-11">

                    {/* 1st block */}
                    <div className="col-span-12 lg:col-span-4">
                        
                        <img class="w-64 h-auto" src={Logo} alt='Logo' />
                        
                    </div>

                    {/* 2nd block */}
                    <div className="col-span-6 md:col-span-6 lg:col-span-1 ml-7 mx-auto">
                        <h6 className="text-[#283618] text-xl font-bold mb-4">LINKS</h6>
                        <ul className="text-md">
                        <li className="mb-2">
                            <HashLink style={{ textDecoration: 'none' }} to="#" className="text-[#283618] hover:text-gray-900 hover:tracking-wider transition duration-250 ease-in-out">About</HashLink>
                        </li>
                        <li className="mb-2">
                            <HashLink style={{ textDecoration: 'none' }} to="#" className="text-[#283618] hover:text-gray-900 hover:tracking-wider transition duration-250 ease-in-out">Services</HashLink>
                        </li>
                        <li className="mb-2">
                            <HashLink style={{ textDecoration: 'none' }} to="#" className="text-[#283618] hover:text-gray-900 hover:tracking-wider transition duration-250 ease-in-out">Contact</HashLink>
                        </li>                            
                        </ul>
                    </div>

                    {/* 3rd block */}
                    <div className="col-span-6 md:col-span-6 lg:col-span-4 mx-auto">
                        <h6 className="text-[#283618] text-xl font-bold mb-4">OUR SERVICES</h6>
                        <ul className="text-md">
                        <li className="mb-2">
                            <Link style={{ textDecoration: 'none' }} to="#" className="text-[#283618] hover:text-gray-900 hover:tracking-wider transition duration-250 ease-in-out">Email Scam detection</Link>
                        </li>
                        <li className="mb-2">
                            <Link style={{ textDecoration: 'none' }} to="#" className="text-[#283618] hover:text-gray-900 hover:tracking-wider transition duration-250 ease-in-out">Text scam detection (coming soon)</Link>
                        </li>
                        <li className="mb-2">
                            <Link style={{ textDecoration: 'none' }} to="#" className="text-[#283618] hover:text-gray-900 hover:tracking-wider transition duration-250 ease-in-out">Scam news (coming soon) </Link>
                        </li>
                        
                        </ul>
                    </div>

                    {/* 4th block */}
                              

                    </div>

                    <div className="flex flex-wrap items-center md:justify-between justify-center mx-auto px-4">
                <div className="w-full md:w-4/12 px-4 mx-auto text-center py-2">
                    <div className="text-sm text-gray-200 font-semibold py-1">
                    Copyright &copy; {new Date().getFullYear()}{"  "}
                    <HashLink
                        to="#"
                        className=" hover:text-gray-900"
                        
                    >
                        Team 36
                    </HashLink>. All rights reserved.
                    </div>
                </div>
                </div>

                </div>
                
            </footer>
        </>
    )
}
export default Footer;
