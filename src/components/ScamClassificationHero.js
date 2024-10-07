// src/components/ScamClassificationHero.js

import React from 'react';
//import { Link } from 'react-router-dom';
import NavBar from '../components/Navbar/NavBar';
import heroImg from '../images/hosting.svg'; // replace with the correct image path

const ScamClassificationHero = () => {
    return (
        <>
            <div className="hero" id='hero'>
                <div>
                    <NavBar />
                </div>
                
                <div className="m-auto overflow-hidden mx-4 mt-8 lg:mt-4 p-2 md:p-12 h-5/6" data-aos="zoom-in">
                    <div id='hero' className="flex flex-col lg:flex-row py-8 justify-between text-center lg:text-left">
                        <div className="lg:w-1/2 flex flex-col justify-center" data-aos="zoom-in" data-aos-delay="200">
                            <h1 className="mb-5 md:text-5xl text-3xl font-bold pt-16 lg:pt-0" style={{ color: '#A9F285' }}>
                                Scam Classification
                            </h1>
                            <div className="text-xl font-semibold tracking-tight mb-5 text-white">
                                Tool to help understand the content you receive is scam or not ...
                            </div>
                        </div>
                        <div className="flex lg:justify-end w-full lg:w-1/2 mb-8 lg:mb-0" data-aos="fade-up" data-aos-delay="700">
                            <img src={heroImg} alt="Scam Classification" className="rounded-t float-right duration-1000 h-full w-full lg:w-3/5" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ScamClassificationHero;
