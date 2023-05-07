import React, { FormEvent, useEffect, useMemo, useState } from 'react';
import { MDBModal, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import { useParams } from 'react-router-dom';
import { useModal } from '../../context/modal';
import { useTickets } from '../../context/ticket';
import { Button } from 'react-bootstrap';
import { SelectOption } from '../../types/inputs';
import { useProjects } from '../../context/project';
import Select from '../Select';
import CloseButton from 'react-bootstrap/CloseButton';

const NO_ASSIGNEE = 'No assigned user';

const UpdateTicketFormModal = () => {
  const { currentProject } = useProjects();
  const { fetchTicket, currentTicket, updateTicket } = useTickets();
  const { isUpdateTicketModalOpened, setIsUpdateTicketModalOpened } = useModal();

  const [name, setName] = useState(currentTicket?.name || '');
  const [description, setDescription] = useState(currentTicket?.description || '');
  const [selectedOption, setSelectedOption] = useState<SelectOption>(() => {
    if (!currentTicket?.assignee) return { value: NaN, name: NO_ASSIGNEE };

    return {
      name: currentTicket.assignee.email,
      value: currentTicket.assignee._id
    };
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { projectId, ticketId } = useParams();

  const selectOptions: SelectOption[] = useMemo(() => {
    if (!currentProject?.contributors.length) return [];

    return currentProject?.contributors.map(({ _id, email }) => ({
      value: _id,
      name: email
    }));
  }, [currentProject?.contributors]);

  const handleUpdateTicket = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      const assignee = Number.isNaN(selectedOption.value) ? undefined : selectedOption.value;

      await updateTicket({ name, description, assignee }, projectId);
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
        <form onSubmit={handleUpdateTicket}>
          <MDBCard className="bg-white my-5 mx-auto" style={{ borderRadius: '1rem', maxWidth: '500px' }}>
            <MDBCardBody className="p-5 w-100 d-flex flex-column">
              <div className="d-flex justify-content-end">
                <CloseButton onClick={() => setIsUpdateTicketModalOpened(false)} />
              </div>

              <h2 className="fw-bold mb-2 text-center">Create new ticket</h2>

              <Select onSelect={setSelectedOption} value={selectedOption} options={selectOptions} />

              <hr />

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
      </MDBModal>
    </>
  );
};

export default UpdateTicketFormModal;
