import { Button, Modal, Form, FormControl, FormText } from "react-bootstrap";
import { useState } from "react";

const AddKeywordModal = ({ show, handleClose, item, addKeyword }) => {
  const [newKeyword, setNewKeyword] = useState("");

  const closeModal = () => {
    handleClose();
    setNewKeyword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addKeyword(item, newKeyword);
    closeModal();
  };

  return (
    <Modal show={show} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add keywords</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <FormControl
            type="text"
            placeholder="Characters, other series names, etc"
            required
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
          />
          <br/>
          <FormText className="text-muted">
            Add several keywords by separating them with commas.
          </FormText>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" type="submit" disabled={!newKeyword}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddKeywordModal;
