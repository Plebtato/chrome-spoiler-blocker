import { ListGroup, Accordion, Button, ButtonGroup } from "react-bootstrap";
import { useState } from "react";
import KeywordBadge from "./KeywordBadge";
import AddKeywordModal from "./AddKeywordModal";

const SeriesCard = ({ item, addKeyword, deleteKeyword, deleteItem }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleOpen = () => setShowModal(true);

  return (
    <ListGroup.Item>
      <Accordion flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>{item.title}</Accordion.Header>
          <Accordion.Body>
            <p>Filtered keywords: </p>
            {item.keywords.map((keyword) => (
              <KeywordBadge
                keyword={keyword}
                item={item.title}
                remove={deleteKeyword}
                key={keyword}
              />
            ))}
            <p></p>
            <p>Options: </p>
            <ButtonGroup>
              <Button
                variant="primary"
                onClick={handleOpen}
              >
                Add keywords
              </Button>
              <Button variant="danger" onClick={() => deleteItem(item.title)}>
                Remove series
              </Button>
            </ButtonGroup>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <AddKeywordModal show={showModal} handleClose={handleClose} item={item.title} addKeyword={addKeyword}/>
    </ListGroup.Item>
  );
};

export default SeriesCard;
