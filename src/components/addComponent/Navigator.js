import React from 'react';
import { HashLink } from 'react-router-hash-link';

const NavigationLink = ({
    to,
    textPrimary,
    textSecondary,
    direction,
    className
}) => {
    const isLeft = direction === 'left';
   
    return (
        <HashLink
            to={to}
            style={{ textDecoration: 'none' }}
            className={`transform transition duration-250 ease-in-out flex items-center ${className}`}
        >
            {isLeft && (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="mr-3 bi bi-arrow-left-circle" viewBox="0 0 16 16" style={{ stroke: 'currentColor', strokeWidth: '0.5' }}>
                    <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H4.5z" />
                </svg>
            )}
            <div className={`flex ${isLeft ? 'flex-col items-start text-left' : 'flex-col items-end text-right'}`}>
                <h3 className='mb-0'>{textPrimary}</h3>
                <span>{textSecondary}</span>
            </div>
            {!isLeft && (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="ml-3 bi bi-arrow-right-circle" viewBox="0 0 16 16" style={{ stroke: 'currentColor', strokeWidth: '0.5' }}>
                    <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3 a.5.5 0 1 0-.708.708 L10.293 7.5H4.5z" />
                </svg>
            )}
        </HashLink>
    );
};

export default NavigationLink;
