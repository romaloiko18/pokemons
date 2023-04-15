import React, { useEffect, useMemo, useState } from 'react';
import { useTickets } from '../../context/ticket';
import { useParams } from 'react-router-dom';
import { Badge, Button, Card } from 'react-bootstrap';
import { STATUS_SELECT_OPTIONS, TicketStatus } from '../../constants/ticket';
import StatusSelect from './Select';
import UpdateTicketFormModal from './UpdateTicketFormModal';
import { useModal } from '../../context/modal';
import { StatusSelectOption } from '../../types/inputs';

const getCurrentValue = (ticketStatus: TicketStatus = TicketStatus.OPEN) =>
  STATUS_SELECT_OPTIONS.find(({ name }) => name === ticketStatus) || STATUS_SELECT_OPTIONS[0];

const UpdateTicket = () => {
  const { fetchTicket, currentTicket, updateTicket } = useTickets();
  const { setIsUpdateTicketModalOpened } = useModal();
  const selectedStatus = useMemo(() => getCurrentValue(currentTicket?.status), [currentTicket]);

  const [isUpdating, setIsUpdating] = useState(false);

  const { projectId, ticketId } = useParams();

  const handleUpdateStatus = async (option: StatusSelectOption) => {
    try {
      setIsUpdating(true);

      await updateTicket({ status: option.name }, projectId);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    if (!projectId || !ticketId) return;

    fetchTicket(projectId, ticketId);
  }, []);

  return !!currentTicket ? (
    <>
      <div className="w-50">
        <Card>
          <Card.Body>
            <Badge bg="" text="dark">
              Status
            </Badge>
            <div className="d-flex gap-1">
              <StatusSelect value={selectedStatus} options={STATUS_SELECT_OPTIONS} onSelect={handleUpdateStatus} disabled={isUpdating} />
            </div>

            <hr />

            <Badge bg="" text="dark">
              Name
            </Badge>

            <h2>
              <Badge bg="light" text="dark" className="w-100 text-start">
                {currentTicket.name}
              </Badge>
            </h2>

            <hr />

            <Badge bg="" text="dark">
              Description
            </Badge>

            <Badge bg="light" text="dark" className="w-100 text-start fw-normal hover-shadow">
              {currentTicket.description}
            </Badge>

            <hr />

            <Button variant="primary" size="sm" onClick={() => setIsUpdateTicketModalOpened(true)}>
              Update ticket
            </Button>
          </Card.Body>
        </Card>
      </div>

      <UpdateTicketFormModal />
    </>
  ) : null;
};

export default UpdateTicket;
