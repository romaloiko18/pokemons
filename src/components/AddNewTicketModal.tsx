import React, { FC, useState } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBCard,
  MDBCardBody,
  MDBInput
} from 'mdb-react-ui-kit';
import { Link, useParams } from 'react-router-dom';
import { http } from '../services/api';
import { Ticket } from '../types/ticket';

type Props = {
  isOpened: boolean;
  setIsOpened: (condition: boolean) => void;
  attachTicket: (ticket: Ticket) => void;
};

const AddNewTicketModal: FC<Props> = ({ isOpened, setIsOpened, attachTicket }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const { projectId } = useParams();

  const handleCreateTicket = async (e: any) => {
    if (!projectId) return;

    e.preventDefault();

    const { data } = await http.post<{ ticket: Ticket; success: boolean }>(`/ticket/${projectId}`, { name, description });

    attachTicket(data.ticket);

    setIsOpened(false);
  };

  return (
    <>
      <MDBModal show={isOpened} setShow={setIsOpened} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <form onSubmit={handleCreateTicket}>
              <MDBCard className="bg-white my-5 mx-auto" style={{ borderRadius: '1rem', maxWidth: '500px' }}>
                <MDBCardBody className="p-5 w-100 d-flex flex-column">
                  <h2 className="fw-bold mb-2 text-center">Sign up</h2>
                  <p className="text-white-50 mb-3">Please enter your login and password!</p>

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
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default AddNewTicketModal;
