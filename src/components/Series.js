import { ListGroup, Accordion, Button, ButtonGroup } from "react-bootstrap";

const Series = () => {
  return(
    <ListGroup.Item>
        <Accordion flush>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Name</Accordion.Header>
                <Accordion.Body>
                    <p>Filtered keywords: </p>
                    <ButtonGroup>
                        <Button variant="secondary">Edit keywords</Button>
                        <Button variant="danger">Remove series</Button>
                    </ButtonGroup> 
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    </ListGroup.Item>
  );
};

export default Series;