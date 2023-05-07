import React from 'react';
import UpdateTicket from '../components/UpdateTicket/UpdateTicket';
import { TicketContextProvider } from '../context/ticket';

const Ticket = () => {
  return (
    <TicketContextProvider>
      <UpdateTicket />
    </TicketContextProvider>
  );
};

export default Ticket;
