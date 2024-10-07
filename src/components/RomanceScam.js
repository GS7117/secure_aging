import React , {useEffect} from 'react';
import ScamPage from './ScamPage';
import PageImg from '../images/romance_page_titleImg.png';
import RomanceImage1 from '../images/Romance_Scam_eg1.png';
import RomanceImage2 from '../images/Romance_Scam_eg2_cropped.png';
import RomanceImage3 from '../images/Romance_Scam_eg1_redbox.png';
import RomanceImage4 from '../images/Romance_Scam_eg2_redbox.png';

const romanceSections = [
    {
        image: RomanceImage1,
        alt: "Phishing Example 1",
        hint: "",
        subTitle: "Can you tell what is wrong with the image. To know ",
        content: "",
        buttonLabel: "Click me",
        buttonLink: RomanceImage3
    },
    {
        image: RomanceImage2,
        alt: "Phishing Example 2",
        hint: "",
        subTitle: "Can you tell what is wrong with the image. To know ",
        content: "",
        buttonLabel: "Click me",
        buttonLink: RomanceImage4
    }
];

const protectYourselfSection =[
    <div className="text-center mx-auto" style={{ maxWidth: '900px' }}>
            <h2 className="mb-3 text-green-700 text-3xl font-bold">Protect Yourself</h2>
            
            <h3 className="text-2xl font-semibold">Never Send Money:</h3>
            <span className="mb-4 text-lg" >Don't send money, gift cards, or personal details to someone you haven't met in person, no matter how long you've been in contact. Never agree to transfer money for others; this could involve you in illegal activities like money laundering.</span>

    <h3 className="text-2xl font-semibold">Verify Who You're Talking To:</h3>
    <span className="mb-4 text-lg" >Take your time when meeting people online. Search their name with ‘scam’ or do a reverse image search to check for inconsistencies. Educate yourself about common scams to spot red flags.</span>

    <h3 className="text-2xl font-semibold">Be Careful What You Share:</h3>
    <span className="mb-4 text-lg" >Never send intimate photos or videos to people you don't know well. Share your online relationship with someone you trust to spot potential warning signs. Be cautious with personal details like your job or family information, as scammers can use this against you.</span>
  
    <h3 className="text-2xl font-semibold">Watch for Red Flags:</h3>
    <span className="mb-4 text-lg" >Be wary if they avoid meeting in person, quickly express strong emotions, or ask for money. Scammers often build trust before making a request</span>
  
  </div>


];

const RomanceScamPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <ScamPage
            title="Romance Scams"
            description="In romance scams, scammers create fake profiles on dating sites or social media to develop an emotional relationship with their targets. They build trust over time and then fabricate a crisis to ask victims for money for emergencies such as medical bills or travel expenses."
            titleImg = {PageImg}
            sections={romanceSections}
            protectSection={protectYourselfSection}
            prevLink="/lottery-scam-page" 
            nextLink="/scam-classification"
            prevLabel="Romance Scam" 
            nextLabel="Scam Classifications"
        />
        
        
    );
}

export default RomanceScamPage;
