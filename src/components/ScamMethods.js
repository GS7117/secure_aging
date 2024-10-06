// src/components/ScamMethods.js

import React from 'react';
import { Link } from 'react-router-dom';
import textImg from '../images/text_scam.svg'; // replace with the correct image path
import emailImg from '../images/email_scam.svg'; // replace with the correct image path
import phoneImg from '../images/phone_scam.svg'; // replace with the correct image path

const ScamMethods = () => {
    return (
        <div className="scam-methods py-12" style={{ backgroundColor: '#CAD9A2' }}>
            <h2 className="text-center text-3xl uppercase font-bold" style={{ color: '#283618' }} data-aos="zoom-in" data-aos-delay="200">Scam Methods</h2>
            <p className="text-center text-xl mb-8" data-aos="zoom-in" data-aos-delay="300">How scams come to you</p>
            <div className="flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-15">
                <div className="text-center max-w-xs mx-auto" data-aos="fade-up" data-aos-delay="500">
                    <img src={textImg} alt="Text Scam" className="rounded-full mb-4 mx-auto" />
                    <h3 className="font-semibold text-xl mb-2">Text</h3>
                    <p className="text-center">Fraudulent messages pretend to be from trusted contacts or companies.</p>
                </div>
                <div className="text-center max-w-xs mx-auto" data-aos="fade-up" data-aos-delay="500">
                    <img src={emailImg} alt="Email Scam" className="rounded-full mb-4 mx-auto" />
                    <h3 className="font-semibold text-xl mb-2">Email</h3>
                    <p className="text-center">Fake websites or emails mimic trusted sources to steal data.</p>
                </div>
                <div className="text-center max-w-xs mx-auto" data-aos="fade-up" data-aos-delay="500">
                    <img src={phoneImg} alt="Phone Scam" className="rounded-full mb-4 mx-auto"/>
                    <h3 className="font-semibold text-xl mb-2">Phone</h3>
                    <p className="text-center">Impersonate government, businesses, or loved ones to steal money.</p>
                </div>
            </div>
            
        </div>
    );
}

export default ScamMethods;
