import img from '../../images/copy-paste.png'; 
import img2 from '../../images/searching tool.png';
import img3 from '../../images/Emergency siren icon_ Hazard warning light, ambulance route alarm.png';

function SteptoDetect() {
    return (
        <>
        <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-3" style={{ margin: '0 auto' ,maxWidth:'1000px' }} data-aos="zoom-in" data-aos-delay="200">

                
        {/* Step 1 */}
        <div className="transition-all ease-in-out duration-400 overflow-hidden  hover:scale-110  rounded-lg  p-3 flex flex-col">
        <div className="flex flex-col items-center">
            <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center shadow-xl glow-on-hover ">
                <img src={img} alt="Step Icon" className="rounded-full w-full h-full object-cover " style={{ transform: 'scale(1.05)'}}/>
            </div>
            <h2 className="NRemailsubTiltle mt-4">Step 1</h2>
            <p className="NRemailText">Copy and paste the content you received into the textbox.</p>
        </div>
    </div>

    {/* Step 2 */}
    <div className="transition-all ease-in-out duration-400 overflow-hidden  hover:scale-110 rounded-lg  p-3 flex flex-col">
        <div className="flex flex-col items-center">
            <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center shadow-xl glow-on-hover">
                <img src={img2} alt="Step Icon" className="rounded-full w-full h-full object-cover " />
            </div>
            <h2 className="NRemailsubTiltle mt-4">Step 2</h2>
            <p className="NRemailText">Hit on the 'Detect' button!</p>
        </div>
    </div>

    {/* Step 3 */}
    <div className="transition-all ease-in-out duration-400 overflow-hidden  hover:scale-110 rounded-lg  p-3 flex flex-col">
        <div className="flex flex-col items-center">
            <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center shadow-xl glow-on-hover">    
            <img src={img3} alt="Step Icon" className="rounded-full w-full h-full object-cover " style={{ transform: 'scale(0.9)'}}/>
            </div>
            <h2 className="NRemailsubTiltle mt-4">Step 3</h2>
            <p className="NRemailText">You will receive the result of your input text.</p>
        </div>
    </div>
    </div>
    </>
    );
}

export default SteptoDetect;