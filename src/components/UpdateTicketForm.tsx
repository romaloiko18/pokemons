import React, { useContext, useEffect } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import { useTickets } from '../context/ticket';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateTicketForm = () => {
  const { fetchTicket } = useTickets();

  const { projectId, ticketId } = useParams();

  useEffect(() => {
    if (!projectId || !ticketId) return;

    fetchTicket(projectId, ticketId);
  }, []);

  return <div></div>;
};

export default UpdateTicketForm;
