import { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Stack from 'react-bootstrap/Stack';
import Image from 'react-bootstrap/Image';
// import Accordion from 'react-bootstrap/Accordion';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEnvelope, faTrash, faExclamationTriangle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import gmailIcon from '../../images/gmail-icon.png';  // Path to Gmail icon
import yahooIcon from '../../images/yahoo-icon.png';  // Path to Yahoo icon
import outlookIcon from '../../images/outlook-icon.png';  // Path to Outlook icon
import img1 from '../../images/gmail-step12.png';
import img2 from '../../images/gmail-step34.png';
import img3 from '../../images/yahoo-step12.png';
import img4 from '../../images/yahoo-step34.png';
import img5 from '../../images/outlook-step12.png';
import img6 from '../../images/outlook-step34.png';


function RemoveEmail() {
  const [radioValue, setRadioValue] = useState('1');

  const radios = [
    { name: 'Gmail', value: '1', icon: gmailIcon },
    { name: 'Yahoo', value: '2', icon: yahooIcon },
    { name: 'Outlook', value: '3', icon: outlookIcon },
  ];

  return (
    <>

      <section data-aos="zoom-in-down">
        <div className="my-4 ">
          <div className='flex justify-center'>
            <h1 className="NRemailTiltle">How to Safely Remove the Suspicious Email ?</h1>
          </div>


        </div>
        <div className='flex justify-center'>
          <ButtonGroup className='flex justify-center '>
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant='outline-light'
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
                style={{ width: '150px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}  // Button style
              >
                <img src={radio.icon} alt={radio.name} style={{ maxWidth: '100%', maxHeight: '180%', height: 'auto' }} /> {/* Image style */}

              </ToggleButton>
            ))}
          </ButtonGroup>
        </div>
        <br />

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          margin: '0 auto', // Corrects centering
          marginLeft: '10px',
          marginRight: '10px'
        }} >
          {/* Gmail */}
          {radioValue === '1' && (

            // <Accordion defaultActiveKey="0" style={{width: '100%', maxWidth:'1000px'}} flush>
            //   <Accordion.Item eventKey="0">
            //     <Accordion.Header className='accordion-header-active'>
            //       <h3 ><strong>STEP 1 & 2</strong>  Select the Email</h3>
            //       </Accordion.Header>
            //     <Accordion.Body >
            //     <h4 className='text-center mx-2'>Find the email you think is spam in your inbox and click the <strong>Report Spam</strong> button in the toolbar (2).</h4>
            //     <div className=" flex justify-center "><Image src={img1} fluid /> </div>
            //     </Accordion.Body>
            //   </Accordion.Item>

            //   <Accordion.Item eventKey="1">
            //     <Accordion.Header><h3 ><strong>STEP 3 & 4</strong> Delete the spam email</h3></Accordion.Header>
            //     <Accordion.Body>
            //     <h4 className='text-center mx-2'>In the mailbox directory on the left, click the Spam folder (3) to view the content marked as spam, and click the Delete all spam messages now button (4) at the top.</h4>
            //     <div className=" flex items-center justify-center "><Image src={img2} fluid /> </div>
            //     </Accordion.Body>
            //   </Accordion.Item>
            // </Accordion>

            <>
              <div className='flex justify-center'>
                <Stack gap={3}>
                  <div className="p-2 "><h3 ><strong className='highlight-green'>「STEP 1 & 2」</strong> Select the Email</h3>
                    <p className='text-center mx-2' style={{ fontSize: '20px' }}>Find the email you think is spam in your inbox <br />
                      and click the <strong>Report Spam</strong> button in the toolbar (2).</p>
                    <div className=" flex justify-center "><Image src={img1} fluid /> </div>
                  </div>
                  <div className="p-2">
                    <h3 ><strong className='highlight-green'>「STEP 3 & 4」</strong> Delete the spam email</h3>
                    <p className='text-center mx-2' style={{ fontSize: '20px' }}>In the mailbox directory on the left,
                      click the Spam folder (3) to view the content marked as spam,
                      <br />and click the Delete all spam messages now button (4) at the top.</p>
                    <div className=" flex justify-center "><Image src={img2} fluid /> </div>
                  </div>
                </Stack>
              </div>
            </>
          )}

          {/* Yahoo */}
          {radioValue === '2' && (


            <div className='flex justify-center'>
              <Stack gap={3}>
                <div className="p-2">
                  <h3 ><strong className='highlight-green'>「STEP 1」</strong> Select the Email</h3>
                  <p className='text-center mx-2' style={{ fontSize: '20px' }}>
                    In the main interface of the mailbox, find the email you think is spam. <br />Click the checkbox (1) to the left of the email to select it.
                  </p>
                  <h3 ><strong className='highlight-green'>「STEP 2」</strong> Mark as spam </h3>
                  <p className='text-center mx-2' style={{ fontSize: '20px' }}>
                    After selecting the email, click the Spam button (2) in the toolbar. <br />This will move the email to the spam folder
                  </p>
                  <div className=" flex justify-center "><Image src={img3} fluid /> </div>
                </div>
                <div className="p-2">
                  <h3 ><strong className='highlight-green'>「STEP 3 & 4」</strong> Delete spam
                  </h3>
                  <p className='text-center mx-2' style={{ fontSize: '20px' }}>In the mailbox directory on the left, find and click the Spam folder (3). <br />If you are sure that the email is spam,
                    you can click the Delete button (4)<br /> in the spam folder to completely delete the email.</p>
                  <div className=" flex justify-center "><Image src={img4} fluid /> </div>
                </div>
              </Stack>
            </div>
          )}

          {/* Outlook */}
          {radioValue === '3' && (
            <>
              <div className='flex justify-center'>
                <Stack gap={3}>
                  <div className="p-2">
                    <h3 ><strong className='highlight-green'>「STEP 1」</strong> Select the Email</h3>
                    <p className='text-center mx-2' style={{ fontSize: '20px' }}>
                      Find the email you think is junk in your inbox, then click the checkbox (1) on the left to select the email.
                    </p>
                    <h3 ><strong className='highlight-green'>「STEP 2」</strong> Mark as junk </h3>
                    <p className='text-center mx-2' style={{ fontSize: '20px' }}>
                      Click the Junk button (2) in the toolbar, then select Junk.
                    </p>
                    <div className=" flex justify-center "><Image src={img5} fluid /> </div>
                  </div>
                  <div className="p-2">
                    <h3 ><strong className='highlight-green'>「STEP 3 & 4」</strong> Deal with the junk folder</h3>
                    <p className='text-center mx-2' style={{ fontSize: '20px' }}>In the folder directory on the left, click the Junk Email folder (3). If you are sure that the emails in the junk folder are unnecessary,
                      click the Empty folder button (4) in the toolbar to permanently delete all the emails in the folder.</p>
                    <div className=" flex justify-center "><Image src={img6} fluid /> </div>
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

export default RemoveEmail;