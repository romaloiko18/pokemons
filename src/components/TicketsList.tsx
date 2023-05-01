import React, { useEffect } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import { useTickets } from '../context/ticket';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from './Spinner';

const TicketsList = () => {
  const { tickets, isLoading, fetchTickets } = useTickets();

  const navigate = useNavigate();
  const { projectId } = useParams();

  const handleOpenTicket = (id: string) => {
    if (!id || !projectId) return;

    navigate(`/projects/${projectId}/${id}`, { state: '_blank' });
  };

  useEffect(() => {
    if (!projectId) return;

    fetchTickets(projectId);
  }, []);

  return (
    <MDBTable align="middle">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <MDBTableHead>
            <tr>
              <th scope="col">Name</th>

              <th scope="col">Status</th>

              <th scope="col">Assignee</th>
            </tr>
          </MDBTableHead>

          {!!tickets.length ? (
            <MDBTableBody>
              {tickets.map(({ status, assignee, name, description, _id }) => (
                <tr key={_id} className="project-table-row" onClick={() => handleOpenTicket(_id)}>
                  <td>
                    <p className="text-muted mb-0">{name}</p>
                  </td>

                  <td>{status}</td>

                  <td>{assignee?.email ?? 'unassigned'}</td>
                </tr>
              ))}
            </MDBTableBody>
          ) : (
            <h3 className="d-flex pt-4">No tickets kurwa</h3>
          )}
        </>
      )}
    </MDBTable>
  );
};

export default TicketsList;
