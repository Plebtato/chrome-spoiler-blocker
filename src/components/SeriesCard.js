import { ListGroup, Accordion, Button, ButtonGroup, Badge } from "react-bootstrap";

const SeriesCard = ({item, edit, remove}) => {
  return(
    <ListGroup.Item>
        <Accordion flush>
            <Accordion.Item eventKey="0">
                <Accordion.Header>{item.title}</Accordion.Header>
                <Accordion.Body>
                    <p>Filtered keywords: </p>
                    <Badge bg="primary" pill>Keyword</Badge>{' '}
                    <Badge bg="primary" pill>Keyword</Badge>{' '}
                    <Badge bg="primary" pill>Keyword</Badge>{' '}
                    <Badge bg="primary" pill>Keyword</Badge>{' '}
                    <Badge bg="primary" pill>Keyword</Badge>{' '}
                    <p></p>
                    <p>Options: </p>
                    <ButtonGroup>
                        <Button variant="secondary" onClick={() => edit(item.title)}>Edit keywords</Button>
                        <Button variant="danger" onClick={() => remove(item.title)}>Remove series</Button>
                    </ButtonGroup> 
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    </ListGroup.Item>
  );
};

export default SeriesCard;