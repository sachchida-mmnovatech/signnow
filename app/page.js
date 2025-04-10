'use client'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [signingUrl, setSigningUrl] = useState('');

  const startSigning = async () => {
    const res = await fetch('/api/signnow', { method: 'POST' });
    const data = await res.json();

    console.log(res)
    if (res.ok) {
      setSigningUrl(data.signingLink);
      handleShow();
    } else {
      alert(data.error || 'Something went wrong');
    }
  };


  return (
    <>
      <Button variant="primary" onClick={startSigning}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose} fullscreen={true}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body><iframe
              src={signingUrl}
              title="SignNow Embedded Signing"
              width="100%"
              height="600px"
              className="border-none"
            /></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}