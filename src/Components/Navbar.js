import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function CitizenNavbar() {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      variant="dark"
      className="shadow-sm"
      style={{
        background: "linear-gradient(90deg, #4b6cb7 0%, #182848 100%)",
        padding: "16px",
      }}
    >
      <Container>
        {/* 🔷 Logo / Title */}
        <Navbar.Brand
          href="/"
          className="text-white font-bold text-xl tracking-wide flex items-center gap-2"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/1024px-Emblem_of_India.svg.png"
            alt="emblem"
            width="28"
            height="28"
          />
          <span>CITIZEN GRIEVANCE PORTAL</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto text-sm">
            {/* 🔹 Home */}
            <Nav.Link href="/" className="text-white hover:text-indigo-300">
              Home
            </Nav.Link>

            {/* 🔹 About */}
            <Nav.Link href="/about" className="text-white hover:text-indigo-300">
              About
            </Nav.Link>

            {/* 🔹 Contact */}
            <Nav.Link
              href="/contact"
              className="text-white hover:text-indigo-300"
            >
              Contact
            </Nav.Link>

            {/* 🔹 Register */}
            <Nav.Link
              href="/register"
              className="text-white hover:text-indigo-300"
            >
              Register
            </Nav.Link>

            {/* 🔹 Login Dropdown */}
            <NavDropdown
              title={<span className="text-white">Login</span>}
              id="collasible-nav-dropdown"
              menuVariant="dark"
            >
              <NavDropdown.Item href="/login">Citizen</NavDropdown.Item>
              <NavDropdown.Item href="/login">Department Officer</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/login">Admin</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CitizenNavbar;
