import React, { useState, useEffect } from 'react';
import NavBar from './Navbar/NavBar';
import ImageModal from './ImageModal';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import Navigator from '../components/addComponent/Navigator';

const ScamPage = ({ title, description, titleImg, sections, protectSection, prevLink, nextLink, prevLabel, nextLabel }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState({ src: '', alt: '' });

    const openModal = (imageSrc, imageAlt) => {
        setSelectedImage({ src: imageSrc, alt: imageAlt });
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <>
            <div className="hero pt-10 pb-0 lg:pt-2" id='hero'>
                <div>
                    <NavBar />
                </div>
                <div className="flex justify-center items-center overflow-hidden  mx-4 mt-8 px-12   " data-aos="zoom-in">
                    <div id='hero' className="flex flex-col lg:flex-row  justify-between items-center text-left" style={{ maxWidth: '1400px' }}>
                        <div className="mx-4 md:mx-8 lg:w-1/2 flex flex-col justify-center" data-aos="zoom-in" data-aos-delay="200" >
                            <h1 className="newsreaderfont mr-3 mb-5 text-5xl pt-16" style={{ color: '#A9F285' }}>
                                {title}
                            </h1>
                            <div className="newsreaderfont text-xl mr-5 tracking-tight mb-5 text-white">
                                {description}
                            </div>
                        </div>
                        <div className="flex lg:justify-end w-full lg:w-1/2 pt-8" data-aos="fade-up" data-aos-delay="700">
                            <img src={titleImg} alt="Scam Classification" className="rounded-t lg:float-right duration-1000 h-full w-4/7 mx-auto float-center" />
                        </div>
                    </div>
                </div>
                <main className="scam-page py-12" style={{ backgroundColor: '#CAD9A2' }}>
                    <div className="flex flex-col space-y-8 mt-8 px-8">
                        {sections.map((section, index) => (
                            <div key={index} className="flex flex-col md:flex-row items-center bg-white p-4 rounded-lg shadow-lg max-w-4xl mx-auto" data-aos="zoom-in" data-aos-delay="200">
                                <img src={section.image} alt={section.alt} className="w-full md:w-full rounded-lg cursor-pointer" onClick={() => openModal(section.image, section.alt)} />
                                <div className="mt-4 md:mt-0 md:ml-6">
                                    <h2 className="text-2xl font-semibold">{section.hint}</h2>
                                    <h3 className="text-xl font-bold">{section.subTitle}</h3>
                                    <p className="mt-2">{section.content}</p>
                                    <button onClick={() => openModal(section.buttonLink, section.alt)} className="text-white bg-green-900 hover:bg-green-700 inline-flex items-center justify-center px-4 py-2 text-lg shadow-xl rounded-2xl">
                                        {section.buttonLabel}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                </main>


            </div>
            <div className='pt-4  px-12 bg-[#EDF5D7]' >
                <div data-aos="zoom-in" data-aos-delay="200">

                    <section className="text-center bg-white p-10 mt-3 mx-auto shadow-xl px-10 rounded-xl border border-gray-300" style={{ maxWidth: '1000px' }} >
                    {protectSection}
                    </section>

                </div>
                <footer className="text-center py-6">
                    <a href="#hero" className="" style={{ color: '#004754' }}>Back to top</a>
                </footer>

            </div>


            <ImageModal isOpen={modalIsOpen} onRequestClose={closeModal} imageSrc={selectedImage.src} imageAlt={selectedImage.alt} />
            
            {/* User Journey */}
            <div id='direction' className="bg-[#EDF5D7] pb-4 lg:px-10 " >

                <section data-aos="fade-down" className='mx-auto lg:px-2' style={{ maxWidth: '1600px' }}>

                    <div className=' grid grid-cols-12  mx-12 ' >
                        <div className="col-span-3 text-xl md:grid-cols-6 gap-1 mx-2 flex items-center ">
                            <Navigator
                                to={prevLink}
                                textPrimary="Previous"
                                textSecondary={prevLabel}
                                direction="left"
                                className="text-[#789179] hover:text-green-900 hover:-translate-x-3"
                            />
                        </div>
                        <div className="col-span-6 md:grid-cols-0 mx-2">
                        </div>

                        <div className="col-span-3 text-xl md:grid-cols-6 mr-2 flex justify-end items-center">
                            <Navigator
                                to={nextLink}
                                textPrimary="Next"
                                textSecondary={nextLabel}
                                direction="right"
                                className="text-[#789179] hover:text-green-900 hover:translate-x-3"
                            />
                        </div>


                    </div>
                </section>
            </div>
            
            <Footer />

        </>
    );
}

export default ScamPage;