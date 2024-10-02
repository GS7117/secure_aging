import React from 'react';
//import {Link} from 'react-router-dom';
//import { HashLink } from 'react-router-hash-link';
import Logo from './Navbar/secure_aging_logo_logo_v2.svg'

const Footer = () => {
    return (
        <>
            <footer class="bg-white rounded-lg shadow dark:bg-gray-900">
                <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                    <div class="sm:flex sm:items-center sm:justify-between">
                        <a style={{ textDecoration: 'none' }} href="/" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                            <img src={Logo} class="h-20" alt="Secure Aging Logo" />
                            <span  class="self-center text-4xl font-semibold whitespace-nowrap " style={{ color: '#3CAE9B' }}>Secure Aging</span>
                        </a>
                        <ul class="flex flex-wrap items-center mb-6 text-xl font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                            <li>
                                <a style={{ textDecoration: 'none' }} href="#" class="dark:text-green-900 hover:underline me-4 md:me-6">About</a>
                            </li>
                            <li>
                                <a style={{ textDecoration: 'none' }} href="#" class="dark:text-green-900 hover:underline me-4 md:me-6">Scam Classification</a>
                            </li>
                            <li>
                                <a  style={{ textDecoration: 'none' }} href="#" class="dark:text-green-900 hover:underline me-4 md:me-6">Scam Detection</a>
                            </li>
                            {/* <li>
                                <a href="#" class="hover:underline">Contact</a>
                            </li> */}
                        </ul>
                    </div>
                    <hr class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                    <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 Secure Aging™. All Rights Reserved.</span>
                </div>
            </footer>
         </>
     )
 }
export default Footer;













//             <footer>
//                 <div className="footer   px-4 sm:px-6 bg-gray-100 border-t border-b py-30">

//                     {/* Top area: Blocks */}
//                     <div className="grid sm:grid-cols-8 gap-3 py-8 md:py-12 border-t border-gray-200 lg:ml-11">

//                     {/* 1st block */}
//                     <div className="col-span-8 lg:col-span-3">
                        
//                         <img src={Logo} alt='Logo' />
                        
//                     </div>

//                     {/* 2nd block */}
//                     <div className="col-span-6 md:col-span-6 lg:col-span-1 ml-7 mx-auto">
//                         <h6 className="text-[#283618] text-xl font-bold mb-4">LINKS</h6>
//                         <ul className="text-md">
//                         <li className="mb-2">
//                             <HashLink style={{ textDecoration: 'none' }} to="#" className="text-[#283618] hover:text-gray-900 hover:tracking-wider transition duration-250 ease-in-out">About</HashLink>
//                         </li>
//                         <li className="mb-2">
//                             <HashLink style={{ textDecoration: 'none' }} to="#" className="text-[#283618] hover:text-gray-900 hover:tracking-wider transition duration-250 ease-in-out">Services</HashLink>
//                         </li>
//                         <li className="mb-2">
//                             <HashLink style={{ textDecoration: 'none' }} to="#" className="text-[#283618] hover:text-gray-900 hover:tracking-wider transition duration-250 ease-in-out">Contact</HashLink>
//                         </li>                            
//                         </ul>
//                     </div>

//                     {/* 3rd block */}
//                     <div className="col-span-6 md:col-span-6 lg:col-span-4 mx-auto">
//                         <h6 className="text-[#283618] text-xl font-bold mb-4">OUR SERVICES</h6>
//                         <ul className="text-md">
//                         <li className="mb-2">
//                             <Link style={{ textDecoration: 'none' }} to="#" className="text-[#283618] hover:text-gray-900 hover:tracking-wider transition duration-250 ease-in-out">Email Scam detection</Link>
//                         </li>
//                         <li className="mb-2">
//                             <Link style={{ textDecoration: 'none' }} to="#" className="text-[#283618] hover:text-gray-900 hover:tracking-wider transition duration-250 ease-in-out">Text scam detection (coming soon)</Link>
//                         </li>
//                         <li className="mb-2">
//                             <Link style={{ textDecoration: 'none' }} to="#" className="text-[#283618] hover:text-gray-900 hover:tracking-wider transition duration-250 ease-in-out">Scam news (coming soon) </Link>
//                         </li>
                        
//                         </ul>
//                     </div>

//                     {/* 4th block */}
                              

//                     </div>

//                     <div className="flex flex-wrap items-center md:justify-between justify-center mx-auto px-4">
//                 <div className="w-full md:w-4/12 px-4 mx-auto text-center py-2">
//                     <div className="text-sm text-gray-200 font-semibold py-1">
//                     Copyright &copy; {new Date().getFullYear()}{"  "}
//                     <HashLink
//                         to="#"
//                         className=" hover:text-gray-900"
                        
//                     >
//                         Team 36
//                     </HashLink>. All rights reserved.
//                     </div>
//                 </div>
//                 </div>

//                 </div>
                
//             </footer>






