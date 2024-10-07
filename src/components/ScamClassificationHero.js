// src/components/ScamClassificationHero.js

import React from 'react';
//import { Link } from 'react-router-dom';
import NavBar from '../components/Navbar/NavBar';
import classImg from '../images/scam-classification-img.png'; // replace with the correct image path

const ScamClassificationHero = () => {
    return (
        <>
            <div className="hero pt-20 pb-0 lg:pt-10 " id='hero'>
                <NavBar />
                <div className="flex justify-center items-center overflow-hidden  mx-4 mt-8 px-12   h-5/6 ">
                    <div className="flex flex-col lg:flex-row  justify-between items-center text-left" style={{ maxWidth: '1400px' }}>
                        <div className="lg:w-1/2 flex flex-col justify-center">
                            <p className="newsreaderfont mb-5 md:text-5xl text-4xl" style={{ color: '#A9F285' }}>
                                Scam Classification
                            </p>
                            <div className="newsreaderfont text-xl tracking-tight lg:mb-5 lg:mr-10 text-white">
                            This page helps you clearly classify different types of scams, empowering you to easily understand the threat and take the right steps to protect yourself.
                            </div>
                           
                            <br></br>
                            <br></br>
                        </div>
                        <div className="lg:w-1/2 lg:justify-end flex ">
                            <img src={classImg} alt="card img" className=" rounded-t duration-1000 h-full w-full lg:w-5/3" />
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    );
}

export default ScamClassificationHero;
