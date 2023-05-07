import React, { useEffect, useMemo } from 'react';
import { Button, Container } from 'react-bootstrap';

import { TicketContextProvider } from '../context/ticket';
import { useModal } from '../context/modal';
import TicketsList from '../components/TicketsList';
import AddNewTicketModal from '../components/AddNewTicketModal';
import { useProjects } from '../context/project';
import { useParams, useSearchParams } from 'react-router-dom';
import TeamModal from '../components/TeamModal/TeamModal';
import UpdateTicketSideView from '../components/UpdateTicket/UpdateTicketSideView';

function Project() {
  const { setIsAddNewTicketModalOpened } = useModal();
  const { fetchProject, currentProject } = useProjects();

  const [sideViewTicketIdQuery] = useSearchParams();

  const { projectId } = useParams();

  const showSideViewTicket = !!sideViewTicketIdQuery.get('openedSideViewTicket');

  useEffect(() => {
    if (!projectId) return;

    fetchProject(projectId);
  }, []);

  return (
    <TicketContextProvider>
      <Container>
        <div className="d-flex justify-content-between">
          <div className="w-100">
            <TicketsList />

            <hr />
            <Button onClick={() => setIsAddNewTicketModalOpened(true)}>Create new</Button>
          </div>

          {showSideViewTicket && <UpdateTicketSideView />}
        </div>
      </Container>

      <AddNewTicketModal />

      <TeamModal />
    </TicketContextProvider>
  );
}

export default Project;
