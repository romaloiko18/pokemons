import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { http } from '../services/api';
import { Ticket } from '../types/ticket';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { MDBBtn, MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import AddNewTicketModal from '../components/AddNewTicketModal';

function Tickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [isModalOpened, setIsModalOpened] = useState(false);

  const navigate = useNavigate();

  const handleGoToTicket = (id: string) => {
    navigate(`/projects/${id}`);
  };

  const { projectId } = useParams();

  const attachTicket = (ticket: Ticket) => setTickets((prevState) => [...prevState, ticket]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const { data } = await http.get<{ tickets: Ticket[]; success: boolean }>(`/ticket/${projectId}`);

        setTickets(data.tickets);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <Container>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <MDBBtn onClick={() => setIsModalOpened(true)}>Create new</MDBBtn>

          <MDBTable align="middle">
            <MDBTableHead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
                <th scope="col">Assignee</th>
              </tr>
            </MDBTableHead>

            <MDBTableBody>
              {tickets.map(({ status, assignee, name, description, _id }) => (
                <tr key={_id} className="project-table-row" onClick={() => handleGoToTicket(_id)}>
                  <td>
                    <p className="text-muted mb-0">{name}</p>
                  </td>
                  <td>{status}</td>
                  <td>{assignee?.email ?? 'unassigned'}</td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>

          <AddNewTicketModal isOpened={isModalOpened} setIsOpened={setIsModalOpened} attachTicket={attachTicket} />
        </div>
      )}
    </Container>
  );
}

export default Tickets;
