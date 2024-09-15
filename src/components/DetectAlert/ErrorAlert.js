import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';


function ErrorAlert() {
    const [show, setShow] = useState(true);

    if (show) {
    return (


      <Alert variant='warning' data-aos="zoom-in" className="alert-custom"
      onClose={() => setShow(false)} dismissible>

        <div className="grid sm:grid-cols-1 lg:grid-cols-4 gap-6" style={{ marginLeft: '30px', marginRight: '30px' }}> 
            <div className="col-span-1 flex items-center justify-center ">
        <div className=" text-justify text-sm flex-1">
                                    <div className="alart-container">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" fill="currentColor" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
</svg>
                                    </div>
                                    <h2 className="font-semibold text-xl text-center">ERROR</h2>
                                    
            </div>
        </div>
        <div className=" col-span-3 flex items-center justify-center">
        <h4 className=" text-center">An error occurred during detection<br /> Please try again </h4>
        
        </div>
        
        </div>
      </Alert>
    );
  }
  return (<Button variant="secondary" onClick={() => setShow(true)}>Show Error</Button>);
}

  
  export default ErrorAlert;