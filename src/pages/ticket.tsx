import React, { useEffect, useState } from 'react';
import UpdateTicket from '../components/UpdateTicket/UpdateTicket';
import { TicketContextProvider, useTickets } from '../context/ticket';
import { MDBTextArea } from 'mdb-react-ui-kit';
import { Button } from 'react-bootstrap';
import CommentsList from '../components/CommentsList/CommentsList';
import { useUser } from '../context/user';
import { useParams } from 'react-router-dom';

const Ticket = () => {
  const { user } = useUser();
  const { fetchTicket, currentTicket, addCommentToTicket } = useTickets();

  const [isCommenting, setIsCommenting] = useState(false);
  const [content, setContent] = useState('');

  const { projectId, ticketId } = useParams();
  const handleCommentTicket = async () => {
    if (!user || !content) return;

    setIsCommenting(true);

    try {
      await addCommentToTicket({ content, user: user._id }, projectId);

      setContent('');
    } finally {
      setIsCommenting(false);
    }
  };

  useEffect(() => {
    if (!projectId || !ticketId) return;

    fetchTicket(projectId, ticketId);
  }, []);

  return (
    <TicketContextProvider>
      <div className="d-flex justify-content-start g-10">
        <UpdateTicket />

        <div>
          <div>Comment</div>

          <MDBTextArea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            wrapperClass="mb-1 w-100"
            className="orm-control form-control-sm"
            id="formControlLg"
          />

          <div className="d-flex justify-content-end mb-2">
            <Button variant="primary" size="sm" onClick={handleCommentTicket} disabled={isCommenting}>
              Comment
            </Button>
          </div>

          <CommentsList comments={currentTicket?.comments ?? []} />
        </div>
      </div>
    </TicketContextProvider>
  );
};

export default Ticket;
