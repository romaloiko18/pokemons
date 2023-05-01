import React, { useEffect } from 'react';
import UpdateTicket from '../components/UpdateTicket/UpdateTicket';
import { TicketContextProvider } from '../context/ticket';
import { useProjects } from '../context/project';
import { useParams } from 'react-router-dom';

const Ticket = () => {
  return (
    <TicketContextProvider>
      <UpdateTicket />
    </TicketContextProvider>
  );
};

export default Ticket;
