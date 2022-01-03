import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  return (
    <>
      <Navbar bg="light" variant="light" fixed="top">
        <Container>
          <Navbar.Brand as={Link} to="">HomeLibrary Admin</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="">Books</Nav.Link>
            <Nav.Link as={Link} to="/book/new">Add Book</Nav.Link>
            <Nav.Link as={Link} to="/reservation">Reservation</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/user"><FontAwesomeIcon icon={faUser}/> </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar;
