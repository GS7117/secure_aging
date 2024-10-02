import { useState } from 'react';
import { Badge, Card } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';

import SMSPopup from '../../components/SMSPopup';

function Steps() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button className="bg-gray-100 hover:bg-gray-200 flex items-center justify-center px-6 py-1  text-lg shadow-sm rounded-xl"
                onClick={handleShow}>
                How it works ?
            </button>

            {/* Enable both scrolling and backdrop */}
            <Offcanvas show={show} onHide={handleClose} scroll={true} backdrop={true} >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>How it Works?</Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body>
                    <Card border="primary" style={{ width: '20rem', marginBottom: '1rem', backgroundColor: '#E2EAFC' }}>
                        <Card.Body>
                            <Card.Title><Badge bg="primary">STEP 1</Badge></Card.Title>
                            <Card.Text>
                                <h5 style={{ "font-weight": "normal", 'fontFamily': 'Arial' }} >Copy and paste the content you received into the textbox.</h5>
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <Card border="primary" style={{ width: '20rem', marginBottom: '1rem', backgroundColor: '#E2EAFC' }}>
                        <Card.Body>
                            <Card.Title><Badge bg="primary">STEP 2</Badge></Card.Title>
                            <Card.Text>
                                <h5 style={{ "font-weight": "normal", 'fontFamily': 'Arial' }} >Hit on the 'Detect' button!</h5>
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <Card border="primary" style={{ width: '20rem', marginBottom: '1rem', backgroundColor: '#E2EAFC' }}>
                        <Card.Body>
                            <Card.Title><Badge bg="primary">STEP 3</Badge></Card.Title>
                            <Card.Text>
                                <h5 style={{ "font-weight": "normal", 'fontFamily': 'Arial' }} >You will receive the result of your input text.</h5>
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <Card border="primary" style={{ width: '20rem', marginBottom: '1rem' }}>
                        <Card.Body>
                            <Card.Title> How to copy & paste ? </Card.Title>
                            <Card.Text>
                                <div style={{ "font-weight": "normal", 'fontFamily': 'Arial' }}>
                                    <h5  >if you need assistance on how to safely copy & paste the text content,
                                        Click ‘view more’</h5>

                                    {/* NEED TO CHANGE THIS FOR DIFFERENT PAGES */}
                                    <SMSPopup />

                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>

                </Offcanvas.Body>

            </Offcanvas>
        </>
    );
}

export default Steps;
