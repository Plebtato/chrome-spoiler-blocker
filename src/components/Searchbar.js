import { InputGroup, FormControl, Button } from "react-bootstrap";

const Searchbar = () => {
  return (
    <InputGroup className="mb-3">
      <FormControl
        placeholder="Enter a show"
        aria-label="Enter a show"
        aria-describedby="basic-addon2"
      />
      <Button variant="secondary" id="button-addon2">
        Add
      </Button>
    </InputGroup>
  );
};

export default Searchbar;
