import React from "react";
import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";

export default function Header() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  function logout() {
    localStorage.removeItem("currentUser");
    window.localStorage.href = "/";
  }

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/home">Room-BooKing</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {user ? (
              <>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {user.name}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                    <Dropdown.Item href="/" onClick={logout}>
                      Logout
                    </Dropdown.Item>
                    {user.isAdmin ? (
                      <Dropdown.Item href="/dashboard">Dashboard</Dropdown.Item>
                    ) : (
                      ""
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>
                <Nav>
                  <Nav.Link href="/register">Register</Nav.Link>
                  <Nav.Link href="/">login</Nav.Link>
                </Nav>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
