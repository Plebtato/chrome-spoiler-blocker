import "./App.css";
import SeriesList from "./components/SeriesList";
import Searchbar from "./components/Searchbar";
import {
  Navbar,
  Container,
} from "react-bootstrap";

function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand className="title">Spoiler Blocker</Navbar.Brand>
        </Container>
      </Navbar>
      <SeriesList />
      <Navbar bg="dark" variant="dark" fixed="bottom">
        <Searchbar/>
      </Navbar>
    </>
  );
}

export default App;
