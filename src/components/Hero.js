import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/Navbar/NavBar';
import { Link as ScrollLink } from 'react-scroll';
import seniorImg from '../images/5 Best Smartphones for Seniors 2023 1.png';

const Hero = () => {
    return (
        <>
            <div className="hero pt-20 pb-0 lg:pt-10 " id='hero'>
                <NavBar />
                <div className="flex justify-center items-center overflow-hidden  mx-4 mt-8 px-12   h-5/6 ">
                    <div className="flex flex-col lg:flex-row  justify-between items-center text-left" style={{ maxWidth: '1400px' }}>
                        <div className="lg:w-1/2 flex flex-col justify-center">
                            <p className="newsreaderfont mb-5 md:text-5xl text-4xl" style={{ color: '#A9F285' }}>
                                STOP, Better Safe than Scammed.
                            </p>
                            <div className="newsreaderfont text-xl tracking-tight mb-5 text-white">
                                Our platform raises awareness by offering a comprehensive database of past and ongoing scams, delivering timely news updates, and connecting users with personal security assistance.
                            </div>
                            <div className="space-x-0 md:space-x-2">
                                <Link to="/detection" style={{ textDecoration: 'none' }} className="text-white bg-yellow-500 hover:bg-amber-500 inline-flex items-center justify-center w-full px-6 py-2 my-2 text-lg shadow-xl rounded-2xl sm:w-auto">
                                    Get Started
                                </Link>
                                <ScrollLink style={{ textDecoration: 'none' }} to="services" smooth={true} duration={1000} className="text-yellow-500 hover:text-amber-600 inline-flex items-center justify-center px-6 cursor-pointer">
                                    Explore More
                                    <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                    </svg>
                                </ScrollLink>
                                
                            </div>
                            <br></br>
                            <br></br>
                        </div>
                        <div className="lg:w-1/2 lg:justify-end flex ">
                            <img src={seniorImg} alt="card img" className="hidden lg:block rounded-t duration-1000 h-full w-full lg:max-w-xs" />
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    );
}

export default Hero;
