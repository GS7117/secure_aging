import React, {useEffect} from 'react';
import ScamPage from './ScamPage';
import PageImg from '../images/lottery_scam_titleImg.png'; 
import lotteryImage1 from '../images/LotteryScam_eg1.png';
import lotteryImage2 from '../images/LotteryScam_eg2.png';
import lotteryImage3 from '../images/LotteryScam_eg1_redbox.png';
import lotteryImage4 from '../images/LotteryScam_eg2_redbox.png';

const lotterySections = [
    {
        image: lotteryImage1,
        alt: "Phishing Example 1",
        hint: "",
        subTitle: "Can you tell what is wrong with the image. To know ",
        content: "",
        buttonLabel: "Click me",
        buttonLink: lotteryImage3
    },
    {
        image: lotteryImage2,
        alt: "Phishing Example 2",
        hint: "",
        subTitle: "Can you tell what is wrong with the image. To know ",
        content: "",
        buttonLabel: "Click me",
        buttonLink: lotteryImage4
    }
];
const protectYourselfSection =[
    <section className="bg-red-50 p-10 mt-5 mx-5">
            <h2 className="mb-5 text-red-700 text-3xl font-bold">Protect Yourself</h2>
            <div className="">
            <h3 className="text-2xl font-semibold">Never Pay to Claim a Prize:</h3>
        <p className="mb-4 text-lg">Legitimate lotteries and contests will never ask you to pay fees, taxes, or provide personal information to claim a prize. If someone asks for payment, it's a scam.</p>

    <h3 className="text-2xl font-semibold">Verify the Source:</h3>
    <p className="mb-4 text-lg">If you receive a winning notification, double-check the legitimacy of the organization by contacting them directly through official channels. Never trust unsolicited messages or calls.</p>

    <h3 className="text-2xl font-semibold">Be Skeptical of Unsolicited Wins:</h3>
    <p className="text-lg">If you didn’t enter a lottery or contest, you can’t win. Be wary of any message claiming you won a prize you didn’t apply for.
        
    </p>
  
    <h3 className="text-2xl font-semibold">Protect Your Information:</h3>
    <p className="text-lg">Never share your bank details, Social Security number, or other sensitive information with someone who contacts you about a prize. Scammers can use this information for identity theft or fraud.</p>
  
  </div>
</section>

];

const LotteryScamPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <ScamPage
            title="Lottery Scams"
            description="Lottery or prize scams are when scammers tell you that you've won a large sum of money or a valuable prize, even if you never entered a contest. They usually ask you to pay a fee or provide personal information in order to claim your prize."
            titleImg = {PageImg}
            sections={lotterySections}
            protectSection={protectYourselfSection}
            prevLink="/investment-scam-page" 
            nextLink="/romance-scams"
            prevLabel="Investment Scam" 
            nextLabel="Romance Scam"
        />
    );
}

export default LotteryScamPage;
