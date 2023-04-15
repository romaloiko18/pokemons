import React, { useContext, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';

import { TicketContextProvider } from '../context/ticket';
import { useModal } from '../context/modal';
import TicketsList from '../components/TicketsList';
import AddNewTicketModal from '../components/AddNewTicketModal';

function Project() {
  const { setIsAddNewTicketModalOpened } = useModal();

  return (
    <TicketContextProvider>
      <Container>
        <TicketsList />

        <hr />
        <Button onClick={() => setIsAddNewTicketModalOpened(true)}>Create new</Button>
      </Container>

      <AddNewTicketModal />
    </TicketContextProvider>
  );
}

export default Project;
