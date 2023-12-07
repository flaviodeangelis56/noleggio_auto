import { Container, Nav, Navbar } from "react-bootstrap";
import { Image } from "react-bootstrap";

const TopBar = () => {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <Image
              src="https://imaghidelnoleggio.it/wp-content/uploads/2023/04/Logo-mdn-copia-03-ok-colori-solo-logo-e-sito.png"
              width="100px"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Parco macchine</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default TopBar;
