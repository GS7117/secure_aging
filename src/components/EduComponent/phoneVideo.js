import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function PhoneVideo() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button onClick={handleShow} className="button-blue hover:bg-blue-800 flex items-center justify-center px-4 py-1 my-1 text-lg shadow-xl rounded-xl">
                Smartphone
            </button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>How to copy & paste the on Smartphone? </Modal.Title>
                </Modal.Header>

                <Modal.Body >
                    <div className='flex justify-center '>
                        {/* Insert link here */}
                        
                        
                            <iframe width="560" height="315" src="https://youtube.com/embed/rgKqjF-587M?feature=shared" 
                            title="YouTube video player" frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                            </div>
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

export default PhoneVideo;