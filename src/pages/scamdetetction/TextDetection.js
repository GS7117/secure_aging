
import NavBar from '../../components/Navbar/NavBar';
import Footer from '../../components/Footer';
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import img4 from '../../images/Subject.png';

import SMSPopup from '../../components/SMSPopup';
import HighRiskAlert from '../../components/DetectAlert/HighRisk';
import MediumRiskAlert from '../../components/DetectAlert/MediumRisk';
import LowRiskAlert from '../../components/DetectAlert/LowRisk';
import ErrorAlert from '../../components/DetectAlert/ErrorAlert';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './ScamDetection.css';  // 自定义样式
import RemoveSMS from '../../components/EduComponent/RemoveSMS';
import SteptoDetect from '../../components/EduComponent/StepstoDetect';

const EmailDetection = () => {

    const [textInput, setTextInput] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const resultRef = useRef(null);


    const API_URL = 'https://v393yif444.execute-api.us-east-1.amazonaws.com/stage1/smsDetect';

    const detectScam = async () => {
        setLoading(true);
        try {
            const response = await axios.post(API_URL, {
                text: textInput
            });

            const { DetectionResult, notScamPercentage, ScamPercentage } = response.data;

            setResult({
                DetectionResult,
                notScamPercentage,
                ScamPercentage
            });
        } catch (error) {
            setResult({
                DetectionResult: 'Error',
                notScamPercentage: 'N/A',
                ScamPercentage: 'N/A'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (event) => {
        setTextInput(event.target.value);
        setResult(null);
    };

    const clearInput = () => {
        setTextInput('');
    };

    useEffect(() => {
        if (result && resultRef.current) {
            const element = resultRef.current;
            const elementRect = element.getBoundingClientRect();
            const absoluteElementTop = elementRect.top + window.pageYOffset;
            const middle = absoluteElementTop - (window.innerHeight / 2) + (elementRect.height / 2);
            window.scrollTo({ top: middle, behavior: 'smooth' });
        }
    }, [result]);

    const handleNavigation = (id) => {
        setTimeout(() => {
            const element = document.getElementById(id);
            if (element) {
                window.scrollTo({
                    top: element.offsetTop,
                    behavior: 'smooth'
                });
            }
        }, 100);  // A short delay to ensure the new page elements have rendered
    };

    return (
        <>
            <div>
                <NavBar />
            </div>

            <div id='steptodetect' className="text-page-blue py-6" >
                <section data-aos="zoom-in-down">
                    <div className="my-4 py-4">

                    </div>

                    <div className="my-4 pt-4" >
                        <h2 className="NRtextTiltle">Text Detection</h2>

                        {/* <div className="NRtextText" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '0 auto', // Corrects centering
                    marginLeft: '30px',
                    marginRight: '30px'
                }}>
                Tool to help understand the content you receive is scam or not ...</div> */}

                        <Link to="/text#emaildetect" className="button-blue hover:bg-blue-800 flex items-center justify-center px-6 py-2 my-4 text-lg shadow-xl rounded-xl"
                            style={{ textDecoration: 'none', margin: '0 auto', maxWidth: '200px' }}
                            onClick={() => handleNavigation('textdetect')}>
                            Start Detection
                            <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                        </Link>

                        <h2 className="NRtextTiltle">How it works ?</h2>



                        <div className="flex justify-center mx-12">
                            <SteptoDetect />

                        </div>
                        <br></br>
                        <br></br>

                        <div className="NRtextText" style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: '0 auto', // Corrects centering
                            marginLeft: '30px',
                            marginRight: '30px'
                        }}><p>
                                if you need assistance on <strong>how to safely copy & paste</strong> the text content,<br></br>
                                Click ‘view more’ </p></div>

                        <div className="flex justify-center items-center ">
                            < SMSPopup />
                        </div>


                    </div>
                </section>
            </div>


            {/* Email detection */}
            <div id='textdetect' className="flex justify-center items-center w-full py-12 lg:py-14 text-page-lightblue ">
                <div className="container my-8 px-4 lg:px-20" data-aos="zoom-in" >

                    {/* image box */}
                    <div className="absolute w-full lg:w-2/6 px-8  rounded-2xl">
                        <div className="flex flex-col text-white ">
                            <img src={img4} alt="Step Icon" className=" w-full h-full hidden lg:block object-cover " />
                        </div>
                    </div>


                    <div className="w-full lg:w-9/12 bg-white p-8 my-4 md:px-12 lg:px-0 lg:pl-32 lg:pr-16 rounded-2xl shadow-2xl ml-auto">
                        <div className="flex">
                            <h1 className="font-bold text-center lg:text-center text-blue-900 uppercase text-4xl">
                                Please COPY & PASTE the text into the text box below:</h1>
                        </div>

                        {/* textbox */}
                        <div className="my-2">
                            <>
                                <FloatingLabel
                                    controlId="floatingTextarea"
                                    label="Paste your email content here"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Leave a comment here"
                                        style={{ height: '280px' }}
                                        value={textInput}  // Control the value with state
                                        onChange={handleInputChange}  // Update state on change
                                    />
                                </FloatingLabel>

                            </>
                        </div>


                        <Container>
                            <Row>
                                <Col style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                    {/* Redirect to 'how it works' */}
                                    <Link to="/text#textdetect" style={{
                                        color: '#283618',
                                        textDecoration: 'underline',
                                        border: 'none',  // Removes default button border
                                        background: 'none',  // Removes default button background
                                        cursor: 'pointer',  // Makes it clear it's clickable
                                        display: 'flex',
                                        alignItems: 'center' // Aligns items in the button horizontally
                                    }}
                                        onClick={() => handleNavigation('steptodetect')}>
                                        How it works

                                        <svg className="ml-1 bi bi-arrow-up-short" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5" />
                                        </svg>

                                    </Link>

                                </Col>
                                <Col xs={6}>

                                    {/* Detect Button */}
                                    <button
                                        onClick={detectScam}
                                        // className="button-blue hover:bg-blue-800 flex items-center justify-center px-6 py-2 my-4 text-lg shadow-xl rounded-xl"
                                        className={`button-blue hover:bg-blue-800 flex items-center justify-center py-2 my-4 w-full text-lg shadow-xl rounded-xl  
                                ${loading ? 'loading' : ''}`}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <span className="spinner-border" role="status" aria-hidden="true"></span>
                                        ) : (
                                            'Detect'
                                        )}
                                    </button>
                                </Col>
                                <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    {/* Clearing Button */}
                                    <button
                                        style={{
                                            color: '#283618',
                                            textDecoration: 'underline',
                                            border: 'none',  // Removes default button border
                                            background: 'none',  // Removes default button background
                                            cursor: 'pointer',  // Makes it clear it's clickable
                                            display: 'flex',
                                            alignItems: 'center' // Aligns items in the button horizontally
                                        }}
                                        onClick={clearInput}
                                    >
                                        Clear Text <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 bi bi-eraser" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414zM8.746 13.547 3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293z" />
                                        </svg>
                                    </button>

                                </Col>
                            </Row>
                        </Container>

                    </div>

                    {/* Detection Result */}
                    <div ref={resultRef} className="flex-col justify-center items-center  mt-16 mb-4" style={{ display: 'flex', justifyContent: 'center' }}>
                        {result && (
                            result.DetectionResult === 'High risk' ? (
                                <HighRiskAlert percentage={result.ScamPercentage} />
                            ) : result.DetectionResult === 'Medium risk' ? (
                                <MediumRiskAlert percentage={result.ScamPercentage} />
                            ) : result.DetectionResult === 'Low risk' ? (
                                <LowRiskAlert percentage={result.notScamPercentage} />
                            ) : (
                                <ErrorAlert />
                            )
                        )}
                    </div>

                    {/* Check another SMS */}
                    <Link to="/text#textdetect" className=" flex items-center justify-center text-lg  rounded-xl"
                        style={{
                            color: '#283618',
                            textDecoration: 'underline',
                            border: 'none',  // Removes default button border
                            background: 'none',  // Removes default button background
                            cursor: 'pointer',  // Makes it clear it's clickable
                            display: 'flex',
                            alignItems: 'center' // Aligns items in the button horizontally
                        }} onClick={() => handleNavigation('textdetect')} >
                        Check another SMS

                        <svg className="ml-1 bi bi-arrow-up-short" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5" />
                        </svg>

                    </Link>

                    {/* Manage Email section */}
                    <div className="flex-col justify-center items-center  my-8">
                        <RemoveSMS />
                    </div>

                    {/* Back to Top */}
                    <Link to="/text" className=" flex items-center justify-center text-lg  rounded-xl"
                        style={{
                            color: '#283618',
                            textDecoration: 'underline',
                            border: 'none',  // Removes default button border
                            background: 'none',  // Removes default button background
                            cursor: 'pointer',  // Makes it clear it's clickable
                            display: 'flex',
                            alignItems: 'center' // Aligns items in the button horizontally
                        }} onClick={() => handleNavigation('steptodetect')} >
                        Back to Top

                        <svg className="ml-1 bi bi-arrow-up-short" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5" />
                        </svg>

                    </Link>
                </div>

            </div>


            <Footer />
        </>


    )
}

export default EmailDetection;
