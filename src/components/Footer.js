import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Navbar/secure_aging_logo_logo_v2.svg';

const Footer = () => {
    return (
        <footer className="bg-white rounded-lg shadow dark:bg-gray-900">
            <div className="footer px-4 sm:px-6 bg-gray-100 border-t border-b pb-4" >
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-8">
                    
                    {/* First Section: Logo and Project Name */}
                    <div className="flex flex-col items-center sm:items-start">
                        <a href="/" className="flex items-center lg:items-end ml-3 lg:ml-10 mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                            <img src={Logo} className="h-20" alt="Secure Aging Logo" />
                            
                        </a>
                        
                    </div>
                    
                    {/* Second Section: Scam Detection */}
                    <div>
                        <h6 className="text-[#3AAF9C] text-xl font-bold mb-3 ">Our Services</h6>
                        <ul className="text-md px-0">
                            <li className="mb-1">
                                <Link to="/detection" className="text-[#283618] hover:text-gray-900 hover:tracking-wider transition duration-250 ease-in-out" style={{ textDecoration: 'none' }}>Scam Detection</Link>
                            </li>
                            <li className="mb-1">
                                <Link to="/scam-classification" className="text-[#283618] hover:text-gray-900 hover:tracking-wider transition duration-250 ease-in-out" style={{ textDecoration: 'none' }}>Scam Classification</Link>
                            </li>
                            <li className="mb-1">
                                <Link to="/scamstats" className="text-[#283618] hover:text-gray-900 hover:tracking-wider transition duration-250 ease-in-out" style={{ textDecoration: 'none' }}>Statistics</Link>
                            </li>
                            <li className="mb-1">
                                <Link to="/scam" className="text-[#283618] hover:text-gray-900 hover:tracking-wider transition duration-250 ease-in-out" style={{ textDecoration: 'none' }}>Scam News</Link>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Third Section: Scam Classification */}
                    <div>
                        <h6 className="text-[#3AAF9C] text-xl font-bold mb-3 ">Detections</h6>
                        <ul className="text-md px-0">
                            <li className="mb-1">
                                <Link to="/email" className="text-[#283618] hover:text-gray-900 hover:tracking-wider transition duration-250 ease-in-out" style={{ textDecoration: 'none' }}>Email Detection</Link>
                            </li>
                            <li className="mb-1">
                                <Link to="/text" className="text-[#283618] hover:text-gray-900 hover:tracking-wider transition duration-250 ease-in-out" style={{ textDecoration: 'none' }}>Text Detection</Link>
                            </li>
                            <li className="mb-1">
                                <Link to="/url" className="text-[#283618] hover:text-gray-900 hover:tracking-wider transition duration-250 ease-in-out" style={{ textDecoration: 'none' }}>URL Detection</Link>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Fourth Section: Statistics */}
                    <div>
                        <h6 className="text-[#3AAF9C] text-xl font-bold mb-3 ">Education</h6>
                        <ul className="text-md px-0">
                            <li className="mb-1">
                                <Link to="/phishingpage" className="text-[#283618] hover:text-gray-900 hover:tracking-wider transition duration-250 ease-in-out" style={{ textDecoration: 'none' }}>Phishing Scam</Link>
                            </li>
                            <li className="mb-1">
                                <Link to="/investment-scam-page" className="text-[#283618] hover:text-gray-900 hover:tracking-wider transition duration-250 ease-in-out" style={{ textDecoration: 'none' }}>Investment Scam</Link>
                            </li>
                            <li className="mb-1">
                                <Link to="/lottery-scam-page" className="text-[#283618] hover:text-gray-900 hover:tracking-wider transition duration-250 ease-in-out" style={{ textDecoration: 'none' }}>Lottery Scam</Link>
                            </li>
                            <li className="mb-1">
                                <Link to="/romance-scams" className="text-[#283618] hover:text-gray-900 hover:tracking-wider transition duration-250 ease-in-out" style={{ textDecoration: 'none' }}>Romance Scam</Link>
                            </li>
                        </ul>
                    </div>
                    
                </div>
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 Secure Aging™. All Rights Reserved.</span>
            </div>
        </footer>
    );
}

export default Footer;
