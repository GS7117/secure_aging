import { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Image from 'react-bootstrap/Image';
import { Stack } from 'react-bootstrap';
// import Accordion from 'react-bootstrap/Accordion';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEnvelope, faTrash, faExclamationTriangle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import img1 from '../../images/ios-step.png'; 
import img2 from '../../images/andriod-step.png'; 



function RemoveSMS() {

    const [radioValue, setRadioValue] = useState('1');

    const radios = [
        { name: 'Apple IOS', value: '1' , icon: () => <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 bi bi-apple" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
            <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282"/>
            <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282"/>
          </svg> },
        { name: 'Andriod', value: '2', icon: () => <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 bi bi-android" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
            <path d="M2.76 3.061a.5.5 0 0 1 .679.2l1.283 2.352A8.9 8.9 0 0 1 8 5a8.9 8.9 0 0 1 3.278.613l1.283-2.352a.5.5 0 1 1 .878.478l-1.252 2.295C14.475 7.266 16 9.477 16 12H0c0-2.523 1.525-4.734 3.813-5.966L2.56 3.74a.5.5 0 0 1 .2-.678ZM5 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2m6 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
          </svg> }
    ];



    return (
      <>

            <section data-aos="zoom-in-down">
                    <div className="my-4 ">
                        <div className='flex justify-center'>
                        <h2 className="NRemailTiltle">How to Safely Delete the Suspicious SMS ?</h2>
                        </div>
                        
        
                        </div>
                        
                        <div className='flex justify-center'>
                        <ButtonGroup>
                            {radios.map((radio, idx) => (
                            <ToggleButton
                                key={idx}
                                id={`radio-${idx}`}
                                type="radio"
                                variant= 'outline-dark' 
                                name="radio"
                                value={radio.value}
                                checked={radioValue === radio.value}
                                onChange={(e) => setRadioValue(e.currentTarget.value)}
                                style={{ width: '150px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                {radio.icon()} {/* Call the function to render the icon */}
                                {radio.name}
                            </ToggleButton>
                            ))}
                        </ButtonGroup>
                        </div>
                        <br/>
        {/* APPLE IOS */}
        <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign:'center',                    
                    margin: '0 auto', // Corrects centering
                    marginLeft: '10px',
                    marginRight: '10px'
                }} >
        
        {radioValue === '1' && (
          
          <>
          <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8" style={{ margin: '0 auto' ,maxWidth:'1200px' }}>   
          <div className='flex justify-center'>
          <Stack gap={3}>
            <div className="p-2">
              <h3 className='highlight-blue'><strong>「STEP 1」</strong> Click "Report Junk"              </h3>
              <p className='text-center mx-2' style={{ fontSize: '20px' }}>There will be an option below the text message that says Report Junk. 
                <br/>Click this option (indicated by the green arrow in the picture).
              </p>
              <h3 className='highlight-blue'><strong>「Step 2」</strong> Delete and Report Junk              </h3>
              <p className='text-center mx-2' style={{ fontSize: '20px' }}>Click Delete and Report Junk (indicated by the green box in the picture), 
                <br/> which will delete the message from your device and report it to Apple and the relevant carriers to help reduce future spam messages.

              </p>
            
            </div>
          </Stack>
          
          </div>  
          <div className='flex justify-center'>
          <Stack gap={3}>
            <div className="p-2">
              
            <div className=" flex justify-center "><Image src={img1} fluid /> </div>
            </div>
          </Stack>
          
          </div> 
          </div>
          </>
          
        )}

        {/* Andriod */}
        {radioValue === '2' && (
          <>
          <div className='flex justify-center'>
          <Stack gap={3}>
            <div className="p-2">
              <h3 ><strong className='highlight-blue'>「STEP 1」</strong></h3>
              <p className='text-center mx-2' style={{ fontSize: '20px' }}>Click the three-dot menu in the upper right corner2
              In the upper right corner of the SMS interface, <br/>click the three-dot icon (as shown in the red box in the picture).
              </p>
              <h3 ><strong className='highlight-blue'>「Step 2」</strong> </h3>
              <p className='text-center mx-2' style={{ fontSize: '20px' }}>In the pop-up menu, select Block number (as shown in the red box in the picture). 
                <br/>This operation will block text messages and calls from this number.

              </p>
              <h3 ><strong className='highlight-blue'>「STEP 3」</strong></h3>
              <p className='text-center mx-2' style={{ fontSize: '20px' }}>In the pop-up confirmation box, click OK
              </p>
            <div className=" flex justify-center "><Image src={img2} fluid /> </div>
            </div>
          </Stack>
          </div>  
          </>
        )}
        </div>

        

        
        </section>
        </>
      );
    }

export default RemoveSMS;