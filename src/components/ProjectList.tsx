import React, { FC } from 'react';
import { Project } from '../types/project';
import { MDBBadge, MDBBtn, MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import '../styles/projects.css';
import { useNavigate } from 'react-router-dom';

type Props = {
  projects: Project[];
};

const ProjectList: FC<Props> = ({ projects }) => {
  const navigate = useNavigate();

  const handleGoToProject = (id: string) => {
    navigate(`/projects/${id}`);
  };

  return (
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
        {projects.map(({ _id, name, tickets, key, contributors }) => (
          <tr key={_id} className="project-table-row" onClick={() => handleGoToProject(_id)}>
            <td>
              <p className="text-muted mb-0">{name}</p>
            </td>
            <td>{key}</td>
            <td>{tickets?.length || 0}</td>
            <td>{contributors.at(0)?.email || ''}</td>
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
  );
};

export default ProjectList;
