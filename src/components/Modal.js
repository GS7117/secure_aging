import React from 'react';

const Modal = ({ show, onClose, title, children }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg relative">
                <h2 className="text-xl font-semibold">{title}</h2>
                <button className="absolute top-2 right-2 text-4xl text-green-900 hover:text-gray-800" onClick={onClose}>
                    &times;
                </button>
                {children}


                {/* <div className="flex justify-end border-t pt-3">
                <button
                    className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                    onClick={onClose}
                >
                    
                    Close
                </button>
                 </div> */}
            </div>
            
        </div>
    );
};

export default Modal;


