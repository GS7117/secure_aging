import React, { useEffect } from 'react';
import NavBar from '../components/Navbar/NavBar';
import Footer from '../components/Footer';
import ScamClassificationHero from '../components/ScamClassificationHero';
import ScamMethods from '../components/ScamMethods';
import ScamTypes from '../components/ScamTypes';

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
            
            
            {/* <Intro /> */}
            {/* <Services /> */}
            {/* <Portfolio />
            <Clients />
            <Cta/> */}
            <Footer />
        </>

    )
}

export default ScamClassification;

