import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function EmailPopup() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button onClick={handleShow} className="button-green hover:bg-green-600 flex items-center justify-center px-4 py-1 my-1 text-lg shadow-xl rounded-xl">
        View More
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>How to copy & paste the email message? </Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <div className='flex justify-center'>
            {/* Insert link here */}
            <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/HLZMxAq7LuA?si=X1S3W_YHJKuFoDpe"
              title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe></div>
          To close this tab, please click the button 'Close'.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EmailPopup;