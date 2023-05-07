import React, { FC } from 'react';
import { Project } from '../types/project';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import '../styles/projects.css';
import { useNavigate } from 'react-router-dom';
import { useTickets } from '../context/ticket';
import AddNewProjectModal from './AddNewProjectModal';

type Props = {
  projects: Project[];
};

const ProjectList: FC<Props> = ({ projects }) => {
  const { fetchTickets } = useTickets();

  const navigate = useNavigate();

  const handleGoToProject = async (id: string) => {
    await fetchTickets(id);

    navigate(`/projects/${id}`);
  };

  return (
    <>
      <MDBTable align="middle">
        <MDBTableHead>
          <tr>
            <th scope="col">Name</th>

            <th scope="col">Key</th>

            <th scope="col"># of tickets</th>

            <th scope="col">Lead</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {projects.map(({ _id, name, tickets, key, lead }) => (
            <tr key={_id} className="project-table-row" onClick={() => handleGoToProject(_id)}>
              <td>
                <p className="text-muted mb-0">{name}</p>
              </td>

              <td>{key}</td>

              <td>{tickets?.length || 0}</td>

              <td>{lead.email || ''}</td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>

      <AddNewProjectModal />
    </>
  );
};

export default ProjectList;
