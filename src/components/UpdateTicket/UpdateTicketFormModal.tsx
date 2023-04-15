import React, { FormEvent, useEffect, useState } from 'react';
import { MDBModal, MDBModalDialog, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import { useParams } from 'react-router-dom';
import { useModal } from '../../context/modal';
import { useTickets } from '../../context/ticket';
import { Button } from 'react-bootstrap';

const UpdateTicketFormModal = () => {
  const { fetchTicket, currentTicket, updateTicket } = useTickets();
  const { isUpdateTicketModalOpened, setIsUpdateTicketModalOpened } = useModal();

  const [name, setName] = useState(currentTicket?.name || '');
  const [description, setDescription] = useState(currentTicket?.description || '');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { projectId, ticketId } = useParams();

  const handleUpdateTicket = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      await updateTicket({ name, description }, projectId);
    } finally {
      setIsSubmitting(false);
      setIsUpdateTicketModalOpened(false);
    }
  };

  useEffect(() => {
    if (!projectId || !ticketId) return;

    fetchTicket(projectId, ticketId);
  }, []);

  return (
    <>
      <MDBModal show={isUpdateTicketModalOpened} setShow={setIsUpdateTicketModalOpened} tabIndex="-1">
        <MDBModalDialog>
          <form onSubmit={handleUpdateTicket}>
            <MDBCard className="bg-white my-5 mx-auto" style={{ borderRadius: '1rem', maxWidth: '500px' }}>
              <MDBCardBody className="p-5 w-100 d-flex flex-column">
                <h2 className="fw-bold mb-2 text-center">Create new ticket</h2>

                <MDBInput
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  wrapperClass="mb-4 w-100"
                  label="Name"
                  id="formControlLg"
                  type="text"
                  size="lg"
                />
                <MDBInput
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  wrapperClass="mb-4 w-100"
                  label="Description"
                  id="formControlLg"
                  type="text"
                  size="lg"
                />

                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  Update ticket
                </Button>
              </MDBCardBody>
            </MDBCard>
          </form>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default UpdateTicketFormModal;
