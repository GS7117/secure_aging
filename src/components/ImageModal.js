import React from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '90%',
        maxHeight: '90%',
        overflow: 'hidden',
        padding: '0',
        zIndex: '1000', // Ensure the modal is on top
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: '1000', // Ensure the overlay is on top
    }
};

Modal.setAppElement('#root');

const ImageModal = ({ isOpen, onRequestClose, imageSrc, imageAlt }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel="Image Modal"
        >
            <button onClick={onRequestClose} className="absolute top-0 right-0 p-2 text-black">Close</button>
            <img src={imageSrc} alt={imageAlt} className="w-full h-full object-contain" />
        </Modal>
    );
}

export default ImageModal;
