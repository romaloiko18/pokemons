import React, { useContext, useEffect } from 'react';
import { Container } from 'react-bootstrap';

import { MDBBtn } from 'mdb-react-ui-kit';
import { TicketContextProvider, useTickets } from '../context/ticket';
import { ModalContext, useModal } from '../context/modal';
import TicketsList from '../components/TicketsList';
import AddNewTicketModal from '../components/AddNewTicketModal';
import { useParams } from 'react-router-dom';

function Project() {
  const { setIsAddNewTicketModalOpened } = useModal();

  return (
    <TicketContextProvider>
      <Container>
        <MDBBtn onClick={() => setIsAddNewTicketModalOpened(true)}>Create new</MDBBtn>

        <TicketsList />
      </Container>

      <AddNewTicketModal />
    </TicketContextProvider>
  );
}

export default Project;
