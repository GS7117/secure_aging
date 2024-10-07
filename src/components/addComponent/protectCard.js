import React, { useEffect } from 'react';

// Card Component
const ProtectCard = ({ img, title, description }) => {
    return (
        <div className="bg-white transition-all ease-in-out duration-400 overflow-hidden text-gray-700 hover:scale-105 rounded-lg shadow-2xl p-3 flex flex-col"
            style={{ margin: '0 auto', maxWidth: '320px' }}>
            <div className="m-2 text-justify text-sm flex-1">
                <div className="flex justify-center h-32">
                    <img alt="card img" className="rounded-t scale-50 group-hover:scale-[1.15] transition duration-1000 ease-in-out" src={img} />
                </div>
                <h3 className="font-semibold mb-4  text-center">{title}</h3>
                <div className="text-lg">
                    {description}
                </div>
            </div>
            <div className="flex justify-center mt-auto">
            </div>
        </div>
    );
}


export default ProtectCard;