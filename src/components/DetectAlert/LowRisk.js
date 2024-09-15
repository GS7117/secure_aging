import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import TooltipInfo from './tooltipInfo';


function LowRiskAlert({ percentage }) {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <>


        <Alert variant='success' data-aos="zoom-in" className="alert-custom"
          onClose={() => setShow(false)} dismissible>

          <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-6" style={{ marginLeft: '30px', marginRight: '30px' }}>
            <div className="col-span-1 flex items-center justify-center">
              <div className="m-2 text-justify text-sm flex-1">
                <div className="alart-container">
                  <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" fill="currentColor" className="bi bi-check2-circle" viewBox="0 0 16 16">
                    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
                    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                  </svg>
                </div>
                <h2 className="font-semibold text-xl text-center">LOW RISK</h2>

              </div>
            </div>
            <div className=" col-span-2 flex items-center justify-center ">
              <h1 className=" text-center">
                {/* There is a <strong>{percentage}%</strong> chance that <br/> */}
                It is <strong>SAFE</strong> </h1>
            </div>

          </div>
        </Alert>
        <div><TooltipInfo text={'Low risk. Less than 40% chance this is a scam, but stay alert. '} /></div>

      </>
    );
  }
  return (<Button variant="secondary" onClick={() => setShow(true)} >Show Result Again</Button>);
}


export default LowRiskAlert;