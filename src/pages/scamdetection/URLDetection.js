import { HashLink } from 'react-router-hash-link';
import NavBar from '../../components/Navbar/NavBar';
import Footer from '../../components/Footer';
import React, { useRef, useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';
import img4 from '../../images/http_1674969.png';

import HighRiskAlert from '../../components/DetectAlert/HighRisk';
import MediumRiskAlert from '../../components/DetectAlert/MediumRisk';
import LowRiskAlert from '../../components/DetectAlert/LowRisk';
import ErrorAlert from '../../components/DetectAlert/ErrorAlert';
import Navigator from '../../components/addComponent/Navigator';
import { Form, FloatingLabel, Container, Row, Col, Button, Modal } from 'react-bootstrap';
import './ScamDetection.css';
import URLinfo from '../../components/EduComponent/URLinfo';
import DetectionStep from '../../components/EduComponent/DetectionSteps';

const URLDection = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [textInput, setTextInput] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const resultRef = useRef(null);
    const [loadingStage, setLoadingStage] = useState(0);




    const API_URL = 'https://v393yif444.execute-api.us-east-1.amazonaws.com/stage1/urlDetect';

    const detectScam = async () => {
        setLoading(true);
        try {
            const response = await axios.post(API_URL, {
                text: textInput
            });

            const { DetectionResult } = response.data;

            setResult({
                DetectionResult
            });
        } catch (error) {
            setResult({
                DetectionResult: 'Error'
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

    // Existing state and variables
    const urlInfoRef = useRef(null);  // Create a ref for the URLinfo component

    useEffect(() => {
        if (result && (result.DetectionResult === 'Phishing')) {
            if (urlInfoRef.current) {
                const element = urlInfoRef.current;
                const elementRect = element.getBoundingClientRect();
                const absoluteElementTop = elementRect.top + window.pageYOffset;
                const middle = absoluteElementTop - (window.innerHeight/2) + (elementRect.height /4);
                window.scrollTo({ top: middle, behavior: 'smooth' });
            }
        }
    }, [result]);  // Ensuring useEffect runs when result changes

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

            <div id='steptodetect' className="BG-URL-1 py-4" >
                <section data-aos="zoom-in-down">

                    <div  >

                        <h2 className="NRtextTiltle pt-20">URL Detection</h2>
                        <div className="flex justify-center mx-12">
                            <DetectionStep />
                        </div>

                    </div>
                </section>

            </div>


            {/* URL detection */}
            <div className="flex justify-center items-center w-full BG-URL-1 ">
                <>
                    <div className="container px-4 lg:px-20" data-aos="zoom-in" >

                        {/* image box */}
                        <div className="absolute w-full lg:w-2/6 px-8  rounded-2xl">
                            <div className="flex flex-col text-white ">
                                <img src={img4} alt="Step Icon" className=" w-full h-full hidden lg:block object-cover " />
                            </div>
                        </div>


                        <div className="w-full lg:w-9/12 bg-white p-8  md:px-12 lg:px-0 lg:pl-32 lg:pr-16 rounded-2xl shadow-2xl ml-auto">
                            <div className="flex">
                                <h1 className="font-bold text-center lg:text-center text-blue-900 uppercase text-3xl">
                                    COPY & PASTE the URL Link in below:</h1>
                            </div>

                            {/* textbox */}
                            <div className="my-2">
                                <>
                                    <FloatingLabel
                                        controlId="floatingTextarea"
                                        label="Put the URL Link here"
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            as="textarea"
                                            placeholder="Put the URL Link here"
                                            style={{ height: '200px' }}
                                            value={textInput}  // Control the value with state
                                            onChange={handleInputChange}  // Update state on change
                                        />
                                    </FloatingLabel>

                                </>
                            </div>


                            <Container>
                                <Row >
                                    {/* Detection Show result again */}
                                    <Col style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                        <div ref={resultRef} style={{ display: 'flex', justifyContent: 'center' }}>
                                            {result && (
                                                result.DetectionResult === 'Phishing' ? (
                                                    <HighRiskAlert />
                                                ) : result.DetectionResult === 'Legitimate' ? (
                                                    <LowRiskAlert  />
                                                ) : (
                                                    <ErrorAlert />
                                                )
                                            )}
                                        </div>
                                    </Col>

                                    <Col xs={6}>

                                        {/* Detect Button */}
                                        <button
                                        onClick={detectScam}
                                        className={`button-green hover:bg-green-600 flex items-center justify-center py-2 my-4 w-full text-lg shadow-xl rounded-xl ${loading ? 'loading' : ''}`}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            loadingStage === 1 ? 'Going through the URL...' : 'Almost there...'
                                        ) : (
                                            'Detect'
                                        )}
                                    </button>
                                    </Col>

                                    {/* Clearing Button */}
                                    <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
                        <br></br>
                        <br></br>
                    </div>
                </>
            </div>



            <div id='URLinfo' className="BG-URL-1" ref={urlInfoRef}>

                {result && (

                    (result.DetectionResult === 'Phishing' ) ? (
                        <section data-aos="zoom-in-down" className=' mx-4 lg:px-10'>
                            <div className="BG-URL-2 text-center py-4 lg:mx-auto shadow-md rounded-xl " style={{ maxWidth: '1300px' }}>
                                <>
                                    {/* URL Education page */}
                                    <div className="mt-0 mb-8 py-4 px-1 flex-col justify-center items-center ">
                                        <URLinfo />
                                    </div>

                                    {/* Back to Top */}
                                    <Link to="/url" className=" flex items-center justify-center text-lg pb-4 rounded-xl"
                                        style={{
                                            color: '#283618',
                                            textDecoration: 'underline',
                                            border: 'none',  // Removes default button border
                                            background: 'none',  // Removes default button background
                                            cursor: 'pointer',  // Makes it clear it's clickable
                                            display: 'flex',
                                            alignItems: 'center' // Aligns items in the button horizontally
                                        }} onClick={() => handleNavigation('steptodetect')} >
                                        Check another URL

                                        <svg className="ml-1 bi bi-arrow-up-short" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5" />
                                        </svg>

                                    </Link>
                                </>
                            </div>
                        </section>

                    ) : (
                        <></>
                    )


                )}


            </div>

            {/* User Journey */}
            <div id='direction' className="BG-URL-1 py-4 lg:px-10 " >

                <section data-aos="fade-down" className='mx-auto lg:px-2' style={{ maxWidth: '1600px' }}>

                    <div className=' grid grid-cols-12  mx-12 ' >
                        <div className="col-span-3 text-xl md:grid-cols-6 gap-1 mx-2 flex items-center ">
                            <Navigator
                                to="/detection"
                                textPrimary="Previous"
                                textSecondary="Detection Model"
                                direction="left"
                                className="text-[#6B88CA] hover:text-blue-900 hover:-translate-x-3"
                            />
                        </div>
                        <div className="col-span-6 md:grid-cols-0 mx-2">
                        </div>

                        <div className="col-span-3 text-xl md:grid-cols-6 mr-2 flex justify-end items-center">
                            <Navigator
                                to="/scamstats"
                                textPrimary="Next"
                                textSecondary="Scam Statistics"
                                direction="right"
                                className="text-[#6B88CA] hover:text-blue-900 hover:-translate-x-3"
                            />
                        </div>


                    </div>
                </section>
            </div>

            <Footer />
        </>


    )
}

export default URLDection;
