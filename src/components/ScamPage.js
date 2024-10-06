import React, { useState } from 'react';
import NavBar from './Navbar/NavBar';
import ImageModal from './ImageModal';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const ScamPage = ({ title, description,titleImg, sections, protectSection, prevLink, nextLink, prevLabel, nextLabel }) => {
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
        <div className="hero" id='hero'>
            <div>
                <NavBar />
            </div>
            <div className="m-auto overflow-hidden mx-4 mt-8 lg:mt-4 p-2 md:p-12 h-5/6" data-aos="zoom-in">
                <div id='hero' className="flex flex-col lg:flex-row py-8 justify-between text-center lg:text-left">
                    <div className="lg:w-1/2 flex flex-col justify-center" data-aos="zoom-in" data-aos-delay="200">
                        <h1 className="mb-5 md:text-5xl text-3xl font-bold pt-16" style={{ color: '#A9F285' }}>
                            {title}
                        </h1>
                        <div className="text-xl font-semibold tracking-tight mb-5 text-white">
                            {description}
                        </div>
                    </div>
                    <div className="flex lg:justify-end w-full lg:w-1/2 pt-8" data-aos="fade-up" data-aos-delay="700">
                            <img src={titleImg} alt="Scam Classification" className="rounded-t float-right duration-1000 h-full w-3/5" />
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
                <div className="flex justify-between px-8 mt-8">
                    <Link to={prevLink} className="text-green-700 hover:text-white inline-flex items-center justify-left px-4 py-2 mx-2">
                    <svg class="w-[25px] h-[25px] fill-[#426B1F]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                        <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z"></path>
                    </svg> {prevLabel}
                    </Link>
                    <Link to={nextLink} className="text-green-700 hover:text-white inline-flex items-center justify-right px-4 py-2 mx-2">
                        {nextLabel} <svg class="w-[25px] h-[25px] fill-[#426B1F]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">


                        <path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"></path>

                        </svg>
                    </Link>
                </div>
            </main>
            <div data-aos="zoom-in" data-aos-delay="200">
                {protectSection}
            </div>
            
                
                
            
            <footer className="text-center py-6">
                <a href="#hero" className="" style={{ color: '#A9F285' }}>Back to top</a>
            </footer>
            <ImageModal isOpen={modalIsOpen} onRequestClose={closeModal} imageSrc={selectedImage.src} imageAlt={selectedImage.alt} />
            <Footer />
        </div>
    );
}

export default ScamPage;
