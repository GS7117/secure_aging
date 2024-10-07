import React, { useEffect } from 'react';
import img from '../images/image1.png';
import img2 from '../images/image2.png';
import img3 from '../images/image3.png';
// import img4 from '../images/Subject copy.png';
import NavBar from '../components/Navbar/NavBar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import '../components/styles.css';
import Navigator from '../components/addComponent/Navigator';


// Card Component
const DetectionCard = ({ img, title, description, link, buttonLabel }) => {
    return (
        <div className="bg-white transition-all ease-in-out duration-400 overflow-hidden text-gray-700 hover:scale-105 rounded-lg shadow-2xl p-3 flex flex-col"
            style={{ margin: '0 auto', maxWidth: '400px' }}>
            <div className="m-2 text-justify text-sm flex-1">
                <div className="image-container">
                    <img alt="card img" className="rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out" src={img} />
                </div>
                <h3 className="font-semibold my-4  text-center">{title}</h3>
                <div className="text-xl">
                    {description}
                </div>
            </div>
            <div className="flex justify-center mt-auto">
                <Link to={link} className="text-white bg-green-900 hover:bg-green-600 inline-flex items-center justify-center w-full px-6 py-3 my-4 text-lg shadow-xl rounded-xl"
                    style={{ textDecoration: 'none' }}>
                    {buttonLabel}
                    <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                </Link>
            </div>
        </div>
    );
}


const Detection = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const cards = [
        {
            img: img,
            title: "Email Detection",
            description: "Scan emails for fraudulent content and phishing attempts to safeguard your inbox.",
            link: "/email",
            buttonLabel: "Learn More"
        },
        {
            img: img2,
            title: "Text Detection",
            description: "Identify and filter out scam-related keywords and phrases in SMS and text messages.",
            link: "/text",
            buttonLabel: "Learn More"
        },
        {
            img: img3,
            title: "URL Detection",
            description: "Evaluate and flag suspicious links to prevent access to harmful or scam websites.",
            link: "/url",
            buttonLabel: "Learn More"
        }
    ];




    return (
        <>
            <div>
                <NavBar />
            </div>


            <div id="detection" className="myBGdarkgreen py-12" >
                <section data-aos="zoom-in-down">
                    <div className="my-12 ">

                    </div>




                    <div className="my-4 py-4" >
                        <h2 className="subtitleStyleBG">Scam Detection</h2>
                        <div className="myNewsreaderStyle" style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            margin: '0 auto', // Corrects centering
                            marginLeft: '30px',
                            marginRight: '30px'
                        }}>
                            Tool to help understand the content you receive is scam or not ...
                        </div>

                        <h2 className="subtitleStyleBG">Start on choosing the scam type</h2>

                        <div className='flex justify-center'>
                            <div className='py-2 w-24 border-b-4 border-dashed border-LightGray mb-8'></div>
                        </div>

                        <div className="px-12" data-aos="fade-down" data-aos-delay="600">


                            <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-12" style={{ margin: '0 auto', maxWidth: '1200px' }}>
                                {cards.map((card, index) => (
                                    <DetectionCard key={index} img={card.img} title={card.title} description={card.description} link={card.link} buttonLabel={card.buttonLabel} />
                                ))}
                            </div>




                        </div>
                    </div>

                    {/* User Journey */}
                    <div id='direction' className=" py-4 lg:px-10 " >

                        <section data-aos="fade-down" className='mx-auto lg:px-2' style={{ maxWidth: '1600px' }}>

                            <div className=' grid grid-cols-12  mx-12 ' >
                                <div className="col-span-3 text-xl md:grid-cols-6 gap-1 mx-2 flex items-center ">
                                    <Navigator
                                        to="/"
                                        textPrimary="Previous"
                                        textSecondary="Homepage"
                                        direction="left"
                                        className="text-[#BBCACD] hover:text-white hover:-translate-x-3"
                                    />
                                </div>
                                <div className="col-span-6 md:grid-cols-0 mx-2">
                                </div>

                                <div className="col-span-3 text-xl md:grid-cols-6 mr-2 flex justify-end items-center">
                                    <Navigator
                                        to="/scamstats"
                                        textPrimary="Next"
                                        textSecondary="Scam Statistics"
                                        direction="right"
                                        className="text-[#BBCACD] hover:text-white hover:translate-x-3"
                                    />
                                </div>


                            </div>
                        </section>
                    </div>


                </section>
            </div>




            <Footer />
        </>
    )
}

export default Detection;