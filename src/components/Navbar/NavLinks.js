import React, { useState, useRef } from 'react';
import { HashLink } from 'react-router-hash-link';
import { Dropdown } from 'react-bootstrap';

const NavLinks = () => {
    const [showScamDetection, setShowScamDetection] = useState(false);
    const [showScamAwareness, setShowScamAwareness] = useState(false);

    const handleMouseEnter = (setter) => {
        setter(true);
    };

    const handleMouseLeave = (setter) => {
        setter(false);
    };

    return (
        <div className="d-flex flex-column flex-md-row align-items-center">
            <HashLink style={{ textDecoration: 'none' }} className="px-4 font-bold text-gray-500 hover:text-green-900" smooth to="/#hero">
            Home Page
            </HashLink>
            
            <Dropdown as="span" 
                      onMouseEnter={() => handleMouseEnter(setShowScamDetection)}
                      onMouseLeave={() => handleMouseLeave(setShowScamDetection) }
                      show={showScamDetection}>
                <Dropdown.Toggle as="button" className="px-4 font-bold text-gray-500 hover:text-green-900">
                <HashLink style={{ textDecoration: 'none' }} className=" font-bold text-gray-500 hover:text-green-900" smooth to="/detection">
            Scam Detection
            </HashLink>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item as={HashLink} to="/email">Email Detection</Dropdown.Item>
                    <Dropdown.Item as={HashLink} to="/text">Text Detection</Dropdown.Item>
                    <Dropdown.Item as={HashLink} to="/url">URL Detection</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown as="span" 
                      onMouseEnter={() => handleMouseEnter(setShowScamAwareness)}
                      onMouseLeave={() => handleMouseLeave(setShowScamAwareness)}
                      show={showScamAwareness}>
                <Dropdown.Toggle as="button" className="px-4 font-bold text-gray-500 hover:text-green-900">
                    Scam Awareness
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item as={HashLink} to="/scam-classification">Scam Types</Dropdown.Item>
                    <Dropdown.Item as={HashLink} to="/scamstats">Scam Statistics</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            {/* Scam News */}
            <HashLink 
                style={{ textDecoration: 'none' }} 
                className="px-4 font-bold text-gray-500 hover:text-green-900" 
                smooth 
                to="/scam"  // 修改这个路由为 /scam
            >
            Scam News
            </HashLink>
        </div>
    );
};

export default NavLinks;

