import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const ContactModal = ({ show, handleClose, handleAddContact, edit }) => {
  const [name, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  useEffect(() => {
    if (edit?.name) {
      setContactName(edit?.name);
    }
    if (edit?.email) {
      setEmail(edit?.email);
    }
    if (edit?.contactNumber) {
      setContactNumber(edit?.contactNumber);
    }
  }, [edit]);

  const handleContactNameChange = (e) => {
    setContactName(e.target.value);
  };

  const handleContactNumberChange = (e) => {
    setContactNumber(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const cleanState = () => {
    setContactName("");
    setContactNumber("");
    setEmail("");
  };
  const saveDetails = () => {
    handleAddContact({ id: edit?.id || uuidv4(), name, email, contactNumber });
    handleClose();
    cleanState();
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        handleClose();
        cleanState();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Accomodation Contact</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              onChange={handleContactNameChange}
              value={name}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="cellphoneNumber">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter phone number"
              onChange={handleContactNumberChange}
              value={contactNumber}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email"
              onChange={handleEmailChange}
              value={email}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            handleClose();
            cleanState();
          }}
        >
          Close
        </Button>
        <Button variant="primary" onClick={saveDetails}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ContactModal;
