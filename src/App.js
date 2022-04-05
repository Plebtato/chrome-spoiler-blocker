import './App.css';
import SeriesList from './components/SeriesList';
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';

function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand className='title'>Spoiler Blocker</Navbar.Brand>
        </Container>
      </Navbar>
      <SeriesList/>
    </>
  );
}

export default App;
