import React, { FC, PropsWithChildren } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useProjects } from '../context/project';
import { useModal } from '../context/modal';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';
import { authService } from '../services/auth';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { currentProject } = useProjects();
  const { setIsTeamModalOpened } = useModal();

  const location = useLocation();

  const showTeam = !!currentProject?.contributors;

  const showMainPage = location.pathname === '/';

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">TeamW</Navbar.Brand>

          <Nav className="me-auto">
            <div className="d-flex justify-content-between w-100">
              <Nav.Link href="/projects">Projects</Nav.Link>

              {showTeam && (
                <Button variant="primary" onClick={() => setIsTeamModalOpened(true)}>
                  Team
                </Button>
              )}

              <Button
                variant="primary"
                onClick={() => {
                  authService.removeToken();
                  window.location.reload();
                }}>
                SignOut
              </Button>
            </div>
          </Nav>
        </Container>
      </Navbar>

      <div style={{ minHeight: '100vh' }}>{showMainPage ? children : <Container>{children}</Container>}</div>

      <Footer />
    </>
  );
};

export default Layout;
