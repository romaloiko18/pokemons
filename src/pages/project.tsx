import React, { useContext, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';

import { TicketContextProvider } from '../context/ticket';
import { useModal } from '../context/modal';
import TicketsList from '../components/TicketsList';
import AddNewTicketModal from '../components/AddNewTicketModal';
import { useProjects } from '../context/project';
import { useParams } from 'react-router-dom';
import TeamModal from '../components/TeamModal/TeamModal';

function Project() {
  const { setIsAddNewTicketModalOpened } = useModal();
  const { fetchProject, currentProject } = useProjects();

  const { projectId } = useParams();

  useEffect(() => {
    if (!projectId) return;

    fetchProject(projectId);
  }, []);

  return (
    <TicketContextProvider>
      <Container>
        <TicketsList />

        <hr />
        <Button onClick={() => setIsAddNewTicketModalOpened(true)}>Create new</Button>
      </Container>

      <AddNewTicketModal />

      <TeamModal />
    </TicketContextProvider>
  );
}

export default Project;
