import React, { FC, PropsWithChildren } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useProjects } from '../context/project';
import { useModal } from '../context/modal';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { currentProject } = useProjects();
  const { setIsTeamModalOpened } = useModal();

  const showTeam = !!currentProject?.contributors;

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">Logo</Navbar.Brand>

          <Nav className="me-auto">
            <Nav.Link href="/projects">Projects</Nav.Link>

            <Nav.Link href="/about">About</Nav.Link>

            {showTeam && (
              <Button variant="primary" onClick={() => setIsTeamModalOpened(true)}>
                Team
              </Button>
            )}
          </Nav>
        </Container>
      </Navbar>

      <Container>{children}</Container>
    </>
  );
};

export default Layout;
