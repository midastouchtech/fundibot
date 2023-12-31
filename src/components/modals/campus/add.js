import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import provicesJson from "@/data/provinces.json";
import { v4 as uuidv4 } from "uuid";
import { set } from "ramda";

const CampusModal = ({ show, handleClose, handleAddCampus, edit }) => {
  const [name, setCampusName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState({
    street: "",
    suburb: "",
    city: "",
    postalCode: "",
    province: "",
    str: "",
  });

  useEffect(() => {
    if (edit) {
      setCampusName(edit?.name);
      setEmail(edit.email);
      setContactNumber(edit.contactNumber);
      setAddress(edit.address);
    }
  }, [edit]);

  const handleNameChange = (e) => {
    setCampusName(e.target.value);
  };

  const handleContactNumberChange = (e) => {
    setContactNumber(e.target.value);
  };

  const saveDetails = () => {
    handleAddCampus({
      id: edit?.id || uuidv4(),
      name,
      contactNumber,
      email,
      address,
    });
    handleClose();
    setCampusName("");
    setContactNumber("");
    setEmail("");
    setAddress({
      street: "",
      suburb: "",
      city: "",
      postalCode: "",
      province: "",
      str: "",
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Institution Campus</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              onChange={handleNameChange}
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
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="street">
            <Form.Label>Street</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter street"
              onChange={(e) =>
                setAddress((prevAddress) => ({
                  ...prevAddress,
                  street: e.target.value,
                  str: `${address.street}, ${address.suburb}, ${address.city}, ${address.postalCode}, ${address.province}`,
                }))
              }
              value={address.street}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="suburb">
            <Form.Label>Suburb</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter suburb"
              onChange={(e) =>
                setAddress((prevAddress) => ({
                  ...prevAddress,
                  suburb: e.target.value,
                  str: `${address.street}, ${address.suburb}, ${address.city}, ${address.postalCode}, ${address.province}`,
                }))
              }
              value={address.suburb}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city"
              onChange={(e) =>
                setAddress((prevAddress) => ({
                  ...prevAddress,
                  city: e.target.value,
                  str: `${address.street}, ${address.suburb}, ${address.city}, ${address.postalCode}, ${address.province}`,
                }))
              }
              value={address.city}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="postalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter postal code"
              onChange={(e) =>
                setAddress((prevAddress) => ({
                  ...prevAddress,
                  postalCode: e.target.value,
                  str: `${address.street}, ${address.suburb}, ${address.city}, ${address.postalCode}, ${address.province}`,
                }))
              }
              value={address.postalCode}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="province">
            <Form.Label>Province</Form.Label>
            <Form.Select
              onChange={(e) =>
                setAddress((prevAddress) => ({
                  ...prevAddress,
                  province: e.target.value,
                  str: `${address.street}, ${address.suburb}, ${address.city}, ${address.postalCode}, ${address.province}`,
                }))
              }
              value={address.province}
            >
              <option value="">Select province</option>
              {provicesJson.map((province) => (
                <option value={province.name}>{province.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={saveDetails}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CampusModal;
