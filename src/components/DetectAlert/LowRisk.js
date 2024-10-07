import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import TooltipInfo from './tooltipInfo';


function LowRiskAlert({ percentage }) {
  const [show, setShow] = useState(true);  // Start with the modal shown

  const handleClose = () => setShow(false);

  if (show) {
    return (
      <>

        <Modal show={show} onHide={handleClose} centered >
          <Modal.Header style={{ borderBottom: 'none','background-color': '#F3FFF3' }} className='pb-0' closeButton >
            {/* <Modal.Title >Detection Result</Modal.Title> */}
          </Modal.Header>
          <Modal.Body className='py-0 text-green-700 ' style={{'background-color': '#F3FFF3'}}>
            <div className=" grid grid-cols-3 gap-6" style={{ marginLeft: '30px', marginRight: '30px' }}>
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
                  It is <strong>SAFE</strong> </h1>
              </div>

            </div>

          </Modal.Body>

          <Modal.Footer style={{'background-color': '#F3FFF3'}} className=" modal-footer border-0 pt-0" >
          <div className="grid grid-cols-2 gap-6">
          <div className='flex justify-center'>
              <TooltipInfo text={'Low risk. Less than 40% chance this is a scam, but stay alert.'} />
            </div>
          <Button variant="success" onClick={handleClose}>
            Close
          </Button>
          </div>
        </Modal.Footer>
        </Modal>

      </>
    );
  }
  return (
    <button onClick={() => setShow(true)}
      style={{
        color: '#283618',
        textDecoration: 'underline',
        border: 'none',  // Removes default button border
        background: 'none',  // Removes default button background
        cursor: 'pointer',  // Makes it clear it's clickable
        display: 'flex',
        alignItems: 'center' // Aligns items in the button horizontally
      }}>
      Previous Result
    </button>
  );
}


export default LowRiskAlert;