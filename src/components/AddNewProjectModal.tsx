import React, { useState } from 'react';
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import { useParams } from 'react-router-dom';
import { useTickets } from '../context/ticket';
import { useModal } from '../context/modal';
import CloseButton from 'react-bootstrap/CloseButton';
import { useProjects } from '../context/project';

const AddNewProjectModal = () => {
  const { addNewProject } = useProjects();
  const { isAddNewProjectModalOpened, setIsAddNewProjectModalOpened } = useModal();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateProject = async (e: any) => {
    e.preventDefault();

    await addNewProject({ name, description });

    setIsAddNewProjectModalOpened(false);

    setName('');
    setDescription('');
  };

  return (
    <>
      <MDBModal show={isAddNewProjectModalOpened} setShow={setIsAddNewProjectModalOpened} tabIndex="-1">
        <form onSubmit={handleCreateProject}>
          <MDBCard className="bg-white my-5 mx-auto" style={{ borderRadius: '1rem', maxWidth: '500px' }}>
            <MDBCardBody className="p-5 w-100 d-flex flex-column">
              <div className="d-flex justify-content-end">
                <CloseButton onClick={() => setIsAddNewProjectModalOpened(false)} />
              </div>

              <h2 className="fw-bold mb-2 text-center">Create new project</h2>

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
      </MDBModal>
    </>
  );
};

export default AddNewProjectModal;
