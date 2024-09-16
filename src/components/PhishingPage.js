import React, {useEffect} from 'react';
import ScamPage from './ScamPage';
import PageImg from '../images/phishing_page_img.png';
import phishingImage1 from '../images/Phishing_eg1.png';
import phishingImage2 from '../images/Phishing_eg2.png';
import phishingImage3 from '../images/Phishing1_redbox.png';
import phishingImage4 from '../images/Phishing2_redbox.png';

const phishingSections = [
    {
        image: phishingImage1,
        alt: "Phishing Example 1",
        hint: "",
        subTitle: "Can you tell what is wrong with the image. To know ",
        content: "",
        buttonLabel: "Click me",
        buttonLink: phishingImage3
    },
    {
        image: phishingImage2,
        alt: "Phishing Example 2",
        hint: "",
        subTitle: "Can you tell what is wrong with the image. To know ",
        content: "",
        buttonLabel: "Click me",
        buttonLink: phishingImage4
    }
];

const protectYourselfSection =[
    <section className="bg-red-50 p-10 mt-5 mx-5">
            <h2 className="mb-5 text-red-700 text-3xl font-bold">Protect Yourself</h2>
            <div className="">
            <h3 className="text-2xl font-semibold">Never Send Money:</h3>
        <p className="mb-4 text-lg">Don't send money, gift cards, or personal details to someone you haven't met in person, no matter how long you've been in contact. Never agree to transfer money for others; this could involve you in illegal activities like money laundering.</p>

    <h3 className="text-2xl font-semibold">Verify Who You're Talking To:</h3>
    <p className="mb-4 text-lg">Take your time when meeting people online. Search their name with ‘scam’ or do a reverse image search to check for inconsistencies. Educate yourself about common scams to spot red flags.</p>

    <h3 className="text-2xl font-semibold">Be Careful What You Share:</h3>
    <p className="text-lg">Never send intimate photos or videos to people you don't know well. Share your online relationship with someone you trust to spot potential warning signs. Be cautious with personal details like your job or family information, as scammers can use this against you.</p>
  </div>
</section>

];


const PhishingPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <ScamPage
            title="Phishing Scams"
            description="Our platform raises awareness by offering a comprehensive database of past and ongoing scams, delivering timely news updates, and connecting users with personal security assistance."
            titleImg = {PageImg}
            sections={phishingSections}
            protectSection={protectYourselfSection}
            prevLink="/scam-classification" // Link to the previous page or scam
            nextLink="/investment-scam-page"
            prevLabel="Scam Classifications" 
            nextLabel="Investment Scam"
        />
    );
}

export default PhishingPage;
