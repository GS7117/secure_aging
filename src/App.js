import React, { useEffect } from 'react';
import AOS from 'aos';
import "aos/dist/aos.css";
import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
// All pages
import Home from './pages/Home';
import Contact from './pages/Contact';
import DemoProduct from './pages/DemoProduct';
import ScamClassification from './pages/ScamClassification';
import PhishingPage from './components/PhishingPage';
import InvestmentScamPage from './components/InvestmentScamPage';
import LotteryScam from './components/LotteryScam';
import RomanceScamPage from './components/RomanceScam';
import {useDocTitle} from './components/CustomHook';
import ScrollToTop from './components/ScrollToTop';

function App() {
  useEffect(() => {
    const aos_init = () => {
      AOS.init({
        once: true,
        duration: 1000,
        easing: 'ease-out-cubic',
      });
    }

    window.addEventListener('load', () => {
      aos_init();
    });
  }, []);

  useDocTitle("Secure Aging");

  return (
    <>
      <Router>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/get-demo" element={<DemoProduct />} /> 
            <Route path="/scam-classification" element={<ScamClassification />} />
            <Route path="/phishingpage" element={<PhishingPage />} />
            <Route path="/investment-scam-page" element={<InvestmentScamPage />} />
            <Route path="/lottery-scam-page" element={<LotteryScam />} />
            <Route path="/romance-scams" element={<RomanceScamPage />} />  
          </Routes>
        </ScrollToTop>
      </Router>
    </>
  );
}


export default App;
