import React, { useEffect } from 'react';
import NavBar from '../components/Navbar/NavBar';
import Footer from '../components/Footer';
import ScamClassificationHero from '../components/ScamClassificationHero';
import ScamMethods from '../components/ScamMethods';
import ScamTypes from '../components/ScamTypes';
import Navigator from '../components/addComponent/Navigator'

// import Intro from '../components/Intro';
// import Portfolio from '../components/Portfolio';
// import Services from '../components/Services';


const ScamClassification = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            <NavBar />
            <ScamClassificationHero />
            <ScamMethods />
            <ScamTypes />
            
            {/* User Journey */}
            <div id='direction' className=" py-4 lg:px-10 " style={{ backgroundColor: '#E9EDC9' }}>

                <section data-aos="fade-down" className='mx-auto lg:px-2' style={{ maxWidth: '1600px' }}>

                    <div className=' grid grid-cols-12  mx-12 ' >
                        <div className="col-span-3 text-xl md:grid-cols-6 gap-1 mx-2 flex items-center ">
                            <Navigator
                                to="/detection"
                                textPrimary="Previous"
                                textSecondary="Scam Detection"
                                direction="left"
                                className="text-[#98BA7C] hover:text-green-900 hover:-translate-x-3"
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
                                className="text-[#98BA7C] hover:text-green-900 hover:translate-x-3"
                            />
                        </div>


                    </div>
                </section>
            </div>
            
            <Footer />
        </>

    )
}

export default ScamClassification;

