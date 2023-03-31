import React, { FC, PropsWithChildren } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">Logo</Navbar.Brand>

          <Nav className="me-auto">
            <Nav.Link href="/projects">Projects</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/team">Team</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container>{children}</Container>
    </>
  );
};

export default Layout;
