import { MDBTabs, MDBTabsContent, MDBTabsItem, MDBTabsLink, MDBTabsPane } from 'mdb-react-ui-kit';
import React, { useState } from 'react';
import { authService } from '../services/auth';
import { Button } from 'react-bootstrap';
import { useModal } from '../context/modal';

const UsefulLinksProjects = () => {
  const { setIsAddNewProjectModalOpened } = useModal();

  const [justifyActive, setJustifyActive] = useState('tab1');

  const handleJustifyClick = (value: string) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  return (
    <>
      <MDBTabs pills justify className="mb-3">
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
            Create project
          </MDBTabsLink>
        </MDBTabsItem>

        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
            Create Ticket
          </MDBTabsLink>
        </MDBTabsItem>

        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab3')} active={justifyActive === 'tab3'}>
            Add team member
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={justifyActive === 'tab1'}>
          To create new project click{' '}
          <Button variant="primary" onClick={() => setIsAddNewProjectModalOpened(true)}>
            Create new Project
          </Button>
        </MDBTabsPane>
        <MDBTabsPane show={justifyActive === 'tab2'}>Create project, or click on existing one to create ticket inside chosen project</MDBTabsPane>
        <MDBTabsPane show={justifyActive === 'tab3'}>Create project, or click on existing one, and click Team in Header of the page</MDBTabsPane>
      </MDBTabsContent>
    </>
  );
};

export default UsefulLinksProjects;
