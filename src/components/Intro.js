import React from 'react';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import ScamStatisticsIcon from '../images/scam_statistics.svg';
import ScamTypesIcon from '../images/ScamTypes.png';
import ScamDetectionIcon from '../images/scam_detection.svg';
import ScamNewsIcon from '../images/scam_news.svg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const cards = [
    {
        icon: ScamDetectionIcon,
        title: "Scam Detection Tool",
        bodyText: "Our fraud detection tool is a special design to protect you from scamming. It can automatically analyze the text messages and emails you received to help you identify possible fraud.",
        link: "/scam-detection",
        buttonText: "Learn More"
    },
    {
        icon: ScamTypesIcon,
        title: "Scam Types",
        bodyText: "Get to know about the type of scams and how you can prevent yourself from becoming a target.",
        link: "/scam-types",
        buttonText: "Learn More"
    },
    {
        icon: ScamStatisticsIcon,
        title: "Scam Detection Tool",
        bodyText: "Use our advance scam detection tools to find out that email/text message you got is a scam or not",
        link: "/scam-detection-tool",
        buttonText: "Learn More"
    },
    {
        icon: ScamNewsIcon,
        title: "Scam News",
        bodyText: "Stay upto date with the latest scams and scam related news",
        link: "/scam-news",
        buttonText: "Coming Soon"
    }
];

const Intro = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };
    
    return (
        <>
            <div className="m-auto max-w p-2 md:p-12 h-5/6 " style={{backgroundColor : '#CAD9A2'}} id='about' >

                <div className="flex flex-col py-8 justify-center text-center lg:text-left"  data-aos="fade-up">
                    <h2 className="text-4xl font-bold mb-8 text-center" style={{color : '#283618'}}>Start on exploring our website</h2>
                    <Slider {...settings}>
                        {cards.map((card, index) => (
                            <div key={index}>
                                <Card {...card} />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </>
    );
};

const Card = ({ icon, title, bodyText, link, buttonText }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between h-3/4 w-auto">
            <img src={icon} alt={title} className="w-1/3 h-auto mr-4" />
            <div className="flex flex-col w-2/3">
                <h3 className="text-2xl font-bold mb-2">{title}</h3>
                <p className="text-gray-600 mb-4">{bodyText}</p>
                <div className="mt-auto">
                    <Link to={link} className="text-white bg-green-900 hover:bg-green-700 inline-flex items-center justify-center px-6 py-2 text-lg shadow-xl rounded-2xl">
                        {buttonText}
                    </Link>
                </div>
            </div>
        </div>
    );
};

const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: "block",
                background: "transparent",
                right: "10px",
                zIndex: 1,
            }}
            onClick={onClick}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="green"
                className="w-6 h-6"
            >
                <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                />
            </svg>
        </div>
    );
};

const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: "block",
                background: "transparent",
                left: "10px",
                zIndex: 1,
            }}
            onClick={onClick}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="green"
                className="w-6 h-6"
            >
                <path
                    fillRule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                />
            </svg>
        </div>
    );
};

export default Intro;
