import React from 'react';
import { Link } from 'react-router-dom';
import img3 from '../images/scam_detection.svg';
import img4 from '../images/scam_news.svg';
import img from '../images/ScamStatistics.png';
import img2 from '../images/ScamTypes.png';

const Services = () => {
    const cards = [
        {
            img: img,
            title: "Scam Statistics",
            text: "We provide real-time scam statistics, offering insights into trends and affected demographics for awareness.",
            link: "/scamstats",
            buttonLabel: "Learn More"
        },
        {
            img: img2,
            title: "Scam Type",
            text: "We categorize common scam types like phishing, and online fraud, helping you avoid potential risks.",
            link: "/scam-classification",
            buttonLabel: "Learn More"
        },
        {
            img: img3,
            title: "Scam Detection Tool",
            text: "We have created an optimized high-quality, scam detection tool for people to help them identify potential scams.",
            link: "/detection",
            buttonLabel: "Learn More"
        },
        {
            img: img4,
            title: "Scam News",
            text: "Stay updated with the latest scam news, including new fraud tactics, major cases, and security alerts.",
            link: "",
            buttonLabel: "Coming Soon"
        }
    ];

    return (
        <div id="services" className="py-12" style={{ backgroundColor: '#CAD9A2' }}>
            <section data-aos="zoom-in-down">
                <div className="my-4 py-4">
                    <h2 className="my-2 text-center text-3xl uppercase font-bold" style={{ color: '#283618' }}>
                        Start exploring our website
                    </h2>
                    <div className='flex justify-center'>
                        <div className='w-24 border-b-4 border-green-900'></div>
                    </div>
                </div>
                <div className="px-12" data-aos="fade-down" data-aos-delay="600">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {cards.map((card, index) => (
                            <div key={index} className="bg-white transition-all ease-in-out duration-400 overflow-hidden text-gray-700 hover:bg-gray-500  hover:scale-[1.05] rounded-lg shadow-2xl p-3 group flex flex-col"
                            style={{ margin: '0 auto' ,maxWidth:'400px' }}>
                                <img alt="card img" className="rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out" src={card.img} />
                                <div className="m-2 text-justify text-sm flex-grow">
                                    <h2 className="font-semibold my-4 text-2xl text-center">{card.title}</h2>
                                    <p className="text-md font-medium">{card.text}</p>
                                </div>
                                <Link
                                    to={card.link}
                                    style={{ textDecoration: 'none' }}
                                    className="text-white bg-green-900 hover:bg-green-700 inline-flex items-center justify-center px-6 py-2 text-lg shadow-xl rounded-2xl mt-4"
                                >
                                    {card.buttonLabel}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Services;
