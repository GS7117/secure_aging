import { Accordion, Image } from 'react-bootstrap';
import img1 from '../../images/url_img1.png';
import img2 from '../../images/url_img2.png';


function URLinfo() {

  return (
    <>

      <section data-aos="zoom-in-down">
        <div className="my-2 ">
          <>
            <div className='flex justify-center'>
              <h2 className="NRemailTiltle"> Frequently Asked Questions</h2>
            </div >

            <div className='mx-auto ' style={{ maxWidth: '900px' }}>

              <Accordion defaultActiveKey="0" className="custom-accordion">
                <Accordion.Item eventKey="0">
                  <Accordion.Header><h3>How can you identify a suspicious URL?</h3></Accordion.Header>
                  <Accordion.Body>
                    <Image src={img1} fluid />
                    First, look for HTTPS in the URL, not just HTTP. Check for any spelling mistakes in the web address, like “gooogle.com” instead of “google.com.” 
                    <br/>Hover over the link (or press and hold on mobile) to see where it really goes—if it looks strange, don’t click it. 
                    <br/>For short links (like bit.ly), use a tool to expand them before clicking. Be careful of long URLs with weird symbols like %, $, or #. 
                    <br/>Finally, don’t trust links that claim urgent actions, like “Your account will be closed if you don’t click now.”
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header><h3>What to do If You Click on a Malicious Link</h3></Accordion.Header>
                  <Accordion.Body>
                    <Image src={img2} fluid />
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header><h3>Why Should I Check If a Link is Safe?</h3></Accordion.Header>
                  <Accordion.Body>
                    You should check if a link is safe to protect yourself from potential risks like **phishing**, **viruses**, or **malware**. Clicking on a suspicious link can lead to stolen personal information, hacked accounts, or infected devices. By checking links first, you avoid these dangers and keep your information secure.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </>
        </div>






      </section>
    </>
  );
}

export default URLinfo;