import React from 'react';
import { Link } from 'react-router-dom';
import img3 from '../images/scam_detection.svg';
import img4 from '../images/scam_news.svg';
import img from '../images/ScamStatistics.png';
import img2 from '../images/ScamTypes.png';

const Services = () => {
    const cards = [
        {
            img: img3,
            title: "Scam Detection Tool",
            text: "We have created an optimized high-quality scam detection tool for people to help them identify potential scams.",
            link: "/detection",
            buttonLabel: "Learn More"
        },
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
            img: img4,
            title: "Scam News",
            text: "Stay updated with the latest scam news, including new fraud tactics, major cases, and security alerts.",
            // insert link to news
            link: "/scam", 
            buttonLabel: "Learn More"
        }
    ];
    

    return (
        <div id="services" className="pt-2 pb-16" style={{ backgroundColor: '#CAD9A2' }}>
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
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 dynamic-max-width">
                        {cards.map((card, index) => (
                            <div key={index} style={{ margin: '0 auto' ,maxWidth:'350px' }} className="bg-white transition-all ease-in-out duration-400 overflow-hidden text-gray-700 hover:bg-gray-500  hover:scale-[1.05] rounded-lg shadow-2xl p-3 group flex flex-col">
                                <div className="m-2  text-sm flex-grow">
                                <img alt="card img" className="rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out" src={card.img} />
                                
                                <h4 className="font-semibold my-4  text-center">{card.title}</h4>
                                    <div className="text-lg">{card.text}</div>
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
