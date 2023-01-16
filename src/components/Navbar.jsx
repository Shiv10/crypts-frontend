import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavbarComponent() {
    return (
      <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky='top'>
          <Container>
            <Navbar.Brand><span className='textColor'><strong>Balance : </strong>Wallet not Connected</span></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#features"></Nav.Link>
                <Nav.Link href="#pricing"></Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link href="#deets"><span className='textColor'>Owned 🥚</span></Nav.Link>
                <Nav.Link href="#memes">
                  <span className='textColor'>
                    Withdraw
                  </span>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    )
};

export default NavbarComponent;