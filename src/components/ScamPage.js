import React, { useState } from 'react';
import NavBar from './Navbar/NavBar';
import ImageModal from './ImageModal';
import Footer from './Footer';

const ScamPage = ({ title, description, sections, protectSection }) => {
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
                        <h1 className="mb-5 md:text-5xl text-3xl font-bold" style={{ color: '#A9F285' }}>
                            {title}
                        </h1>
                        <div className="text-xl font-semibold tracking-tight mb-5 text-white">
                            {description}
                        </div>
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
