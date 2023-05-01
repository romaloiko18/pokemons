import React, { memo, useMemo, useState } from 'react';
import { MDBModal, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import { useModal } from '../../context/modal';
import { Button } from 'react-bootstrap';
import { useProjects } from '../../context/project';
import { SelectOption } from '../../types/inputs';
import Select from '../Select';

const TeamModal = () => {
  const { setIsTeamModalOpened, isTeamModalOpened } = useModal();
  const { addNewContributor, currentProject } = useProjects();

  const [email, setEmail] = useState('');

  const selectOptions: SelectOption[] = useMemo(() => {
    if (!currentProject?.contributors.length) return [];

    return currentProject?.contributors.map(({ _id, email }) => ({
      value: _id,
      name: email
    }));
  }, [currentProject?.contributors.length]);

  const handleAttachUserToProject = async () => {
    await addNewContributor({ email });

    setEmail('');
  };

  return (
    <>
      <MDBModal show={isTeamModalOpened} setShow={setIsTeamModalOpened}>
        <MDBCard className="bg-white my-5 mx-auto" style={{ borderRadius: '1rem', maxWidth: '500px' }}>
          <MDBCardBody className="p-5 w-100 d-flex flex-column">
            <div className="d-flex g-1">
              <MDBInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                wrapperClass="mb-4 w-100"
                label="Description"
                id="formControlLg"
                type="text"
                size="lg"
              />

              <Button style={{ maxHeight: 50 }} variant="primary" size="sm" onClick={handleAttachUserToProject}>
                Attach contributor
              </Button>
            </div>

            <Select value={{ value: NaN, name: 'Team' }} options={selectOptions} />
          </MDBCardBody>
        </MDBCard>
      </MDBModal>
    </>
  );
};

export default memo(TeamModal);
