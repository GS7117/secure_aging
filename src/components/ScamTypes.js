import React from 'react';
import { Link } from 'react-router-dom';
import phishingImg from '../images/Phising.png'; 
import investmentImg from '../images/investment_scam.png'; 
import lotteryImg from '../images/lottery_scam.png';
import romanceImg from '../images/romance_scam.png';

const ScamTypes = () => {
    const scamTypes = [
        {
            img: phishingImg,
            title: "Phishing Scams",
            description: "Scammers send fake emails or text messages pretending to be legitimate organizations, like banks, to steal personal information.",
            link: "/phishingpage"
        },
        {
            img: investmentImg,
            title: "Investment Scams",
            description: "Fraudsters promise high returns with little risk, often involving fake investment opportunities, including cryptocurrency schemes.",
            link: "/investment-scam-page"
        },
        {
            img: lotteryImg,
            title: "Lottery or Prize Scams",
            description: "Victims are told they've won a large sum of money or a prize but must pay a fee or provide personal information to claim it.",
            link: "/lottery-scam-page"
        },
        {
            img: romanceImg,
            title: "Romance Scams",
            description: "Scammers create fake profiles on dating sites or social media to gain victims' trust and then ask for money or personal information.",
            link: "/romance-scams"
        }
    ];

    return (
        <div className="scam-types py-12 " style={{ backgroundColor: '#E9EDC9' }}>
            <section data-aos="zoom-in" data-aos-delay="200">
            <h1 className="newsreaderfont text-center "   style={{ color: '#283618' }}>Scam Types</h1>
            <p className="text-center text-xl mb-8" data-aos="zoom-in" data-aos-delay="300">Click 'Learn More' to see more information</p>

            <div className="flex flex-col space-y-8 mt-8 px-8 ">
                {scamTypes.map((scam, index) => (
                    <div key={index} className="flex flex-col md:flex-row items-center bg-white p-4 rounded-lg shadow-lg max-w-3xl mx-auto" data-aos="zoom-in" data-aos-delay="200">
                        <img src={scam.img} alt={scam.title} className="w-32 h-32 mb-4 md:mb-0 md:mr-8" />
                        <div className="ml-3">
                            <h3 className="text-2xl font-semibold">{scam.title}</h3>
                            <p className="interfont text-xl text-gray-700 mb-4">{scam.description}</p>
                            <Link style={{textDecoration: 'none'}} to={scam.link} className="text-white bg-green-900 hover:bg-green-700 inline-flex items-center justify-center px-4 py-2 text-lg shadow-xl rounded-2xl">
                                Learn More
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            </section>
        </div>
    );
}

export default ScamTypes;