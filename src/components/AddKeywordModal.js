import { Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";

const AddKeywordModal = ({ show, handleClose, item, addKeyword }) => {
  const [newKeyword, setNewKeyword] = useState("");

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add keywords</Modal.Title>
      </Modal.Header>

      <Form.Group controlId="formBasicEmail" onSubmit={addKeyword(item, newKeyword)}>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Characters, other titles for the series, etc"
            required
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
          />
          <Form.Text className="text-muted">
            Add several keywords by separating them with commas.
          </Form.Text>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleClose} disabled={!newKeyword}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Form.Group>
    </Modal>
  );
};

export default AddKeywordModal;
