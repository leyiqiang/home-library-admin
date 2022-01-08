import { Toast, ToastContainer } from 'react-bootstrap';
import { useState } from 'react';

const AlertMessage = ({message, bg, show} : {message: string, bg: string, show:boolean}) => {
  const [currentShow, setCurrentShow] = useState(show);

  return (
    <>
        <ToastContainer className="p-3">
          <Toast onClose={() => setCurrentShow(false)} show={currentShow} bg={bg}>
            <Toast.Body>{message}</Toast.Body>
          </Toast>
        </ToastContainer>
    </>
  )
}

export default AlertMessage;
