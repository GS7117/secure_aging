import React, { useEffect } from 'react';
import ScamPage from './ScamPage';
import PageImg from '../images/Investment_scam_tiltleImg.png';
import InvestmentImage1 from '../images/InvestmentScam_eg1.png';
import InvestmentImage2 from '../images/InvestmentScam_eg2.png';
import InvestmentImage3 from '../images/InvestmentScam_eg1_redbox.png';
import InvestmentImage4 from '../images/InvestmentScam_eg2_redbox.png';

const investmentSections = [
    {
        image: InvestmentImage1,
        alt: "Phishing Example 1",
        hint: "",
        subTitle: "Can you tell what is wrong with the image. To know ",
        content: "",
        buttonLabel: "Click me",
        buttonLink: InvestmentImage3
    },
    {
        image: InvestmentImage2,
        alt: "Phishing Example 2",
        hint: "",
        subTitle: "Can you tell what is wrong with the image. To know ",
        content: "",
        buttonLabel: "Click me",
        buttonLink: InvestmentImage4
    }
];


const protectYourselfSection = [
    <div className="text-center mx-auto" style={{ maxWidth: '900px' }}>
        <h2 className="mb-3 text-green-700 text-3xl font-bold">Protect Yourself</h2>

        <h3 className="text-2xl font-semibold">Do Your Homework:</h3>
        <span className="mb-4 text-lg" >Before investing, research the company or opportunity. Verify their legitimacy through official financial regulators and look up reviews or complaints online. If something feels off, trust your instincts.</span>

        <h3 className="text-2xl font-semibold">Question High Returns:</h3>
        <span className="mb-4 text-lg" >Be cautious of any investment promising unusually high returns with little risk. Scammers often lure victims with guarantees that are too good to be true. Remember, legitimate investments come with risks.
        </span>

        <h3 className="text-2xl font-semibold">Take Your Time:</h3>
        <span className="mb-4 text-lg" > Scammers often create a false sense of urgency, pushing you to invest immediately. Take your time to evaluate the offer carefully and consult with a trusted financial advisor if necessary.</span>

        <h3 className="text-2xl font-semibold">Protect Your Information:</h3>
        <span className="mb-4 text-lg" >Never share your financial details, like bank account numbers or credit card information, with someone you don’t know or trust. Be especially wary of unsolicited investment offers that require personal information upfront.
        </span>

    </div>


];


const InvestmentScamPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <ScamPage
            title="Investment Scams"
            description="Investment scams are a type of online fraud where scammers trick victims into investing in fake investment opportunities, promising high returns with low risk. They often use fake websites, social media or emails to pretend they are legitimate."
            titleImg={PageImg}
            sections={investmentSections}
            protectSection={protectYourselfSection}
            prevLink="/phishingpage"
            nextLink="/lottery-scam-page"
            prevLabel="Phishing Scam"
            nextLabel="Lottery Scam"
        />
    );
}

export default InvestmentScamPage;
