import React, { useState } from 'react';
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import { useParams } from 'react-router-dom';
import { useTickets } from '../context/ticket';
import { useModal } from '../context/modal';

const AddNewTicketModal = () => {
  const { addNewTicket } = useTickets();
  const { isAddNewTicketModalOpened, setIsAddNewTicketModalOpened } = useModal();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const { projectId } = useParams();

  const handleCreateTicket = async (e: any) => {
    if (!projectId) return;
    e.preventDefault();

    await addNewTicket({ name, description }, projectId);

    setIsAddNewTicketModalOpened(false);

    setName('');
    setDescription('');
  };

  return (
    <>
      <MDBModal show={isAddNewTicketModalOpened} setShow={setIsAddNewTicketModalOpened} tabIndex="-1">
        <MDBModalDialog>
          <form onSubmit={handleCreateTicket}>
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

                <MDBBtn type="submit">Create</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </form>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default AddNewTicketModal;
