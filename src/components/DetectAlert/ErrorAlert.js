import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import TooltipInfo from './tooltipInfo';


function ErrorAlert({ percentage }) {
  const [show, setShow] = useState(true);  // Start with the modal shown

  const handleClose = () => setShow(false);

  if (show) {
    return (
      <>
        <Modal show={show} onHide={handleClose} centered >
          <Modal.Header style={{ borderBottom: 'none', 'background-color': '#FFE8AE' }} className='pb-0' closeButton >
            {/* <Modal.Title >Detection Result</Modal.Title> */}
          </Modal.Header>
          <Modal.Body className='py-0 text-orange-800 ' style={{ 'background-color': '#FFE8AE ' }}>
            <div className="grid grid-cols-4 gap-6" style={{ marginLeft: '30px', marginRight: '30px' }}>
              <div className="col-span-1 flex items-center justify-center ">
                <div className=" text-justify text-sm flex-1">
                  <div className="alart-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" fill="currentColor" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                    </svg>
                  </div>
                  <h2 className="font-semibold text-xl text-center">ERROR</h2>

                </div>
              </div>
              <div className=" col-span-3 flex items-center justify-center">
                <h4 className=" text-center">An error occurred during detection<br /> Please try again </h4>

              </div>

            </div>

          </Modal.Body>

          <Modal.Footer style={{ 'background-color': '#FFE8AE ' }} className=" modal-footer border-0 pt-0 " >

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


export default ErrorAlert;
