// src/components/ScamMethods.js

import React from 'react';
import textImg from '../images/message_9227739.png'; 
import emailImg from '../images/email_2514505.png'; 
import phoneImg from '../images/phone_874555.png'; 
const ScamMethods = () => {

    const scamMethods = [
        {
            img: textImg,
            title: "Text",
            description: "Fraudulent messages pretend to be from trusted contacts or companies.",
            scale: 0.85
        },
        {
            img: emailImg,
            title: "Email",
            description: "Fake websites or emails mimic trusted sources to steal data.",
            scale: 0.80
        },
        {
            img: phoneImg,
            title: "Phone",
            description: "Impersonate government, businesses, or loved ones to steal money.",
            scale: 0.90
        }
    ];

    const ScamMethodCard = ({ img, title, description, scale }) => (
        <div className="transition-all ease-in-out duration-400 overflow-hidden hover:scale-110 rounded-lg p-3 flex flex-col">
            <div className="flex flex-col items-center">
                <div className="relative rounded-full bg-white p-2 w-48 h-48 flex items-center justify-center shadow-xl glow-on-hover">
                    <img src={img} alt={`${title} Icon`} className="w-full h-full object-cover" style={{ transform: `scale(${scale})` }} />
                </div>
                <h2 className="NRemailsubTiltle mt-4">{title}</h2>
                <p className="NRemailText">{description}</p>
            </div>
        </div>
    );
    
    
    return (
            <>
                <div className="scam-methods py-12" style={{ backgroundColor: '#CAD9A2' }}>
                    <h1 className="newsreaderfont text-center "  style={{ color: '#283618' }} data-aos="zoom-in" data-aos-delay="200">Scam Methods</h1>
                    <p className="text-center text-xl mb-8" data-aos="zoom-in" data-aos-delay="300">How scams come to you ?</p>
    
                    <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-3" style={{ margin: '0 auto', maxWidth: '1000px' }} data-aos="zoom-in" data-aos-delay="200">
                        {scamMethods.map(method => (
                            <ScamMethodCard key={method.title} img={method.img} title={method.title} description={method.description} scale={method.scale} />
                        ))}
                    </div>
                </div>
            </>
        );
}

export default ScamMethods;
