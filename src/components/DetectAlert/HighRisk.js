import { useState } from 'react';
import { Modal , Button} from 'react-bootstrap';
import TooltipInfo from './tooltipInfo';


function HighRiskAlert({ percentage }) {
  const [show, setShow] = useState(true);  // Start with the modal shown

  const handleClose = () => setShow(false);

  if (show) {
    return (
      <>

        <Modal show={show} onHide={handleClose} centered >
          <Modal.Header style={{ borderBottom: 'none' }} className='bg-red-100 pb-0' closeButton >
            {/* <Modal.Title >Detection Result</Modal.Title> */}
          </Modal.Header>
          <Modal.Body className='py-0 bg-red-100 text-red-600 '>
          <div className="grid grid-cols-3 gap-6" style={{ marginLeft: '30px', marginRight: '30px' }}>
            <div className="col-span-1 flex items-center justify-center ">
              <div className=" text-justify ">
                <div className="alart-container">
                  <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" fill="currentColor" className="bi bi-exclamation-triangle" viewBox="0 0 16 16">
                    <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z" />
                    <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                  </svg>
                </div>
                <h2 className="font-semibold text-xl text-center">HIGH RISK</h2>

              </div>
            </div>
            <div className=" col-span-2 flex items-center justify-center ">
              <h1 className=" text-center">
                {/* There is a <strong>{percentage}%</strong> chance that <br /> */}
                It is <strong>SCAM</strong></h1>
            </div>

          </div>
            


          </Modal.Body>

          <Modal.Footer style={{'background-color': '#FFE4E4 '}} className=" modal-footer border-0 " >
          <div className="grid grid-cols-2">
          <div className='flex justify-center '>
            <TooltipInfo text={'High risk. More than 60% chance this is a scam. '} />
            </div>
          <Button variant="danger" onClick={handleClose}>
            Close & See More Info
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


export default HighRiskAlert;





