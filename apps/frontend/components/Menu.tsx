import { Navbar, Container, Nav } from "react-bootstrap";

interface MenuProps {
  openModal: (eventKey: string | null) => void;
}

const Menu = (props: MenuProps) => {
  const handleSelect = (
    eventKey: string | null,
    // event?: React.SyntheticEvent<unknown, Event>
  ) => {
    if (eventKey) {
      props.openModal(eventKey);
      // alert(`selected ${eventKey}`);
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary" onSelect={handleSelect}>
      <Container>
        <Navbar.Brand href="/">FJD Information Technologies</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item>
              <Nav.Link eventKey="choseEmployee" title="choseEmployee">
                Mitarbeiter aus Liste auswählen
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="addEmployee" title="addEmployee">
                Mitarbeiter hinzufügen
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
